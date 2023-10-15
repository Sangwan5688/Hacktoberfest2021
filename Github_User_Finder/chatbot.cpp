#include <iostream>
#include <string>
#include <map>

std::map<std::string, std::string> responses = {
    {"hello", "Hello! How can I help you?"},
    {"how are you", "I'm just a computer program, but thanks for asking!"},
    {"what's your name", "I'm a chatbot. I don't have a name."},
    {"bye", "Goodbye! Have a great day."},
};

int main() {
    std::string userInput;
    std::string response;

    std::cout << "Chatbot: Hello! What can I do for you today?" << std::endl;

    while (true) {
        std::cout << "You: ";
        std::getline(std::cin, userInput);

        // Convert the user input to lowercase for case-insensitive matching
        for (char &c : userInput) {
            c = std::tolower(c);
        }

        if (userInput == "exit" || userInput == "quit") {
            std::cout << "Chatbot: Goodbye!" << std::endl;
            break;
        }

        // Check if there's a predefined response
        auto it = responses.find(userInput);
        if (it != responses.end()) {
            response = it->second;
        } else {
            response = "Chatbot: I'm not sure how to respond to that.";
        }

        std::cout << response << std::endl;
    }

    return 0;
}
