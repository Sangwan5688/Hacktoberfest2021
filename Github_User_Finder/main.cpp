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
