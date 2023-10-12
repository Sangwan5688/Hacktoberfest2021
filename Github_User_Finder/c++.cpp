#include <iostream>
#include <fstream>

int main() {
    std::ofstream outputFile("myFile.txt"); // Create or open a file named "myFile.txt"

    if (outputFile.is_open()) {
        // Write content to the file
        outputFile << "Hello, this is some text written to the file.\n";
        outputFile << "You can add more content by calling outputFile << some_data;\n";
        
        // Close the file
        outputFile.close();
        std::cout << "File created and written successfully." << std::endl;
    } else {
        std::cerr << "Error: Unable to create or open the file." << std::endl;
    }

    return 0;
}
