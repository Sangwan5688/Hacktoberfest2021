#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>

int isPhoto(char *filename) {
    const char *extensions[] = {".jpg", ".jpeg", ".png"};
    int numExtensions = sizeof(extensions) / sizeof(extensions[0]);

    for (int i = 0; i < numExtensions; i++) {
        if (strstr(filename, extensions[i]) != NULL) {
            return 1;
        }
    }

    return 0;
}

void findPhotos(const char *path) {
    struct dirent *entry;
    DIR *dir = opendir(path);

    if (dir == NULL) {
        perror("Error opening directory");
        exit(EXIT_FAILURE);
    }

    while ((entry = readdir(dir))) {
        char fullpath[1024];
        snprintf(fullpath, sizeof(fullpath), "%s/%s", path, entry->d_name);

        struct stat statbuf;
        if (stat(fullpath, &statbuf) == -1) {
            perror("Error getting file information");
            continue;
        }

        if (S_ISDIR(statbuf.st_mode)) {
            if (strcmp(entry->d_name, ".") != 0 && strcmp(entry->d_name, "..") != 0) {

                findPhotos(fullpath);
            }
        } else {
            if (isPhoto(entry->d_name)) {
                printf("Found photo: %s\n", fullpath);
            }
        }
    }

    closedir(dir);
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <directory_path>\n", argv[0]);
        return EXIT_FAILURE;
    }

    const char *directory_path = argv[1];
    findPhotos(directory_path);

    return EXIT_SUCCESS;
}
