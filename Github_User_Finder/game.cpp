#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    std::srand(static_cast<unsigned>(std::time(nullptr))); // Seed the random number generator

    int secretNumber = std::rand() % 100 + 1; // Generates a random number between 1 and 100
    int guess;
    int attempts = 0;
    bool hasGuessed = false;

    std::cout << "Welcome to the Number Guessing Game!" << std::endl;

    while (!hasGuessed) {
        std::cout << "Enter your guess (1-100): ";
        std::cin >> guess;
        attempts++;

        if (guess < 1 || guess > 100) {
            std::cout << "Please enter a number between 1 and 100." << std::endl;
        } else if (guess < secretNumber) {
            std::cout << "Too low! Try again." << std::endl;
        } else if (guess > secretNumber) {
            std::cout << "Too high! Try again." << std::endl;
        } else {
            hasGuessed = true;
        }
    }

    std::cout << "Congratulations! You guessed the number " << secretNumber << " in " << attempts << " attempts." << std::endl;

    return 0;
}
