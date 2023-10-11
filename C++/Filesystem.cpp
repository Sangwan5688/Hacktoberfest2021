#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>

class FileManager {
public:
    void createFile(const std::string& fileName, const std::string& content) {
        std::ofstream file(fileName);
        if (file.is_open()) {
            file << content;
            file.close();
            std::cout << "File '" << fileName << "' created successfully." << std::endl;
        } else {
            std::cout << "Error: Unable to create the file." << std::endl;
        }
    }

    void readFile(const std::string& fileName) {
        std::ifstream file(fileName);
        if (file.is_open()) {
            std::string line;
            std::cout << "Contents of file '" << fileName << "':" << std::endl;
            while (getline(file, line)) {
                std::cout << line << std::endl;
            }
            file.close();
        } else {
            std::cout << "Error: Unable to open the file for reading." << std::endl;
        }
    }

    void deleteFile(const std::string& fileName) {
        if (std::remove(fileName.c_str()) == 0) {
            std::cout << "File '" << fileName << "' deleted successfully." << std::endl;
        } else {
            std::cout << "Error: Unable to delete the file." << std::endl;
        }
    }
};

int main() {
    FileManager fileManager;

    while (true) {
        std::cout << "\nFile Management System" << std::endl;
        std::cout << "1. Create File" << std::endl;
        std::cout << "2. Read File" << std::endl;
        std::cout << "3. Delete File" << std::endl;
        std::cout << "4. Quit" << std::endl;
        std::cout << "Enter your choice: ";

        int choice;
        std::cin >> choice;
        std::cin.ignore(); // Consume the newline character

        switch (choice) {
            case 1: {
                std::string fileName, content;
                std::cout << "Enter file name: ";
                std::getline(std::cin, fileName);
                std::cout << "Enter file content (end with 'EOF' on a separate line):" << std::endl;
                std::string line;
                while (getline(std::cin, line) && line != "EOF") {
                    content += line + '\n';
                }
                fileManager.createFile(fileName, content);
                break;
            }
            case 2: {
                std::string fileName;
                std::cout << "Enter file name to read: ";
                std::getline(std::cin, fileName);
                fileManager.readFile(fileName);
                break;
            }
            case 3: {
                std::string fileName;
                std::cout << "Enter file name to delete: ";
                std::getline(std::cin, fileName);
                fileManager.deleteFile(fileName);
                break;
            }
            case 4:
                std::cout << "Exiting the File Management System. Goodbye!" << std::endl;
                return 0;
            default:
                std::cout << "Invalid choice. Please try again." << std::endl;
        }
    }

    return 0;
}
