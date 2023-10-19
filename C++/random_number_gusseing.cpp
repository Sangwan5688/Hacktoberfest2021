#include <iostream>
#include <ctime>
#include <cstdlib>

int main() {
    // Seed the random number generator
    std::srand(static_cast<unsigned>(std::time(nullptr)));

    int lowerLimit = 1;
    int upperLimit = 100;
    int secretNumber = std::rand() % (upperLimit - lowerLimit + 1) + lowerLimit;
    int numberOfTries = 0;
    int userGuess;

    std::cout << "Welcome to the Random Number Guessing Game!" << std::endl;
    std::cout << "I'm thinking of a number between " << lowerLimit << " and " << upperLimit << ". Try to guess it." << std::endl;

    while (true) {
        std::cout << "Enter your guess: ";
        std::cin >> userGuess;
        numberOfTries++;

        if (userGuess < lowerLimit || userGuess > upperLimit) {
            std::cout << "Please enter a number between " << lowerLimit << " and " << upperLimit << "." << std::endl;
            continue;
        }

        if (userGuess < secretNumber) {
            std::cout << "Too low! Try again." << std::endl;
        } else if (userGuess > secretNumber) {
            std::cout << "Too high! Try again." << std::endl;
        } else {
            std::cout << "Congratulations! You guessed the secret number (" << secretNumber << ") in " << numberOfTries << " tries." << std::endl;
            break;
        }
    }

    return 0;
}
