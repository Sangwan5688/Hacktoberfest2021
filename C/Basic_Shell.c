#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <string.h>

#define MAX_LEN 100

int main() {
    char str[MAX_LEN]; // takes user input
    char *tok;         // used to separate and store each word from the given command
    char *args[MAX_LEN]; // stores each separated word as arguments
    system("clear");    // clears the terminal

    printf("WELCOME!!! to ShellVinayak\n\nMy name is Vinayak\n\nI've created this Linux Shell where basic Linux Commands can be executed\n\nDownload the source code from 'https://github.com/vivekutture/Linux-Shell.git'\n\n\033[1mTo return to the Original Shell enter \033[3m\033[4mexit\033[m \n\n");

    while (1) {
        memset(args, '\0', MAX_LEN); // sets the argument array with 'NULL' values simply 'Nullifies' the argument array
        printf("\033[1;32m ||| SHELL NAME ||| \033[1;34m~\033[1;32m\033[m$ "); // shell prompt

        fgets(str, MAX_LEN, stdin); // takes a whole line as input until "Enter" is pressed

        if (strcmp(str, "\n") == 0) // even if the command is not entered and "Enter" is pressed then the execution will continue with the next iteration
        {
            continue;
        }

        int len = strlen(str); // calculates and stores the length of the given command
        str[len - 1] = '\0';    // terminates the given command

        if (strcmp(str, "exit") == 0) // if the command is exit then the loop will break, execution will terminate and control goes back to the original shell
        {
            break;
        }

        tok = strtok(str, " "); // separates each word from the given command
        int i = 0;
        while (tok != NULL) // transfers each word from token to array until the token reaches NULL
        {
            args[i++] = tok;
            tok = strtok(NULL, " ");
        }

        pid_t pid = fork(); // child process creation
        if (pid == 0) {
            // child process
            if (execvp(args[0], args) != 0) {
                // checks if the given command with arguments executes successfully or not
                perror("\nCommand not Found "); // throws an error
                sleep(2);                        // delay for a specified amount of time
                system("clear");                 // clears the terminal
                exit(EXIT_FAILURE);              // terminates the unsuccessful execution of a program
            }
        } else if (pid < 0) // checks if any process created or not or any process exists or not
        {
            printf("\nProcess doesn't exist\nExiting...");
            break;
        } else {
            // parent process
            wait(0); // wait for the process to change state
        }
    }
    exit(0); // program termination
}
