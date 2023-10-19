#include <iostream>
#include <ctime>
#include <cstdlib>

int main() {
    // Seed the random number generator
    std::srand(static_cast<unsigned>(std::time(nullptr)));

    while (true) {
        int computerChoice = std::rand() % 3;  // 0: Rock, 1: Paper, 2: Scissors
        int userChoice;

        std::cout << "Let's play Rock, Paper, Scissors!\n";
        std::cout << "Enter your choice (0 for Rock, 1 for Paper, 2 for Scissors, or 3 to quit): ";
        std::cin >> userChoice;

        if (userChoice == 3) {
            std::cout << "Thanks for playing. Goodbye!" << std::endl;
            break;
        }

        if (userChoice < 0 || userChoice > 2) {
            std::cout << "Invalid choice. Please enter 0, 1, 2, or 3 to quit." << std::endl;
            continue;
        }

        std::cout << "You chose ";
        switch (userChoice) {
            case 0:
                std::cout << "Rock";
                break;
            case 1:
                std::cout << "Paper";
                break;
            case 2:
                std::cout << "Scissors";
                break;
        }
        std::cout << std::endl;

        std::cout << "Computer chose ";
        switch (computerChoice) {
            case 0:
                std::cout << "Rock";
                break;
            case 1:
                std::cout << "Paper";
                break;
            case 2:
                std::cout << "Scissors";
                break;
        }
        std::cout << std::endl;

        if (userChoice == computerChoice) {
            std::cout << "It's a tie!" << std::endl;
        } else if ((userChoice == 0 && computerChoice == 2) ||
                   (userChoice == 1 && computerChoice == 0) ||
                   (userChoice == 2 && computerChoice == 1)) {
            std::cout << "You win!" << std::endl;
        } else {
            std::cout << "Computer wins!" << std::endl;
        }
    }

    return 0;
}
