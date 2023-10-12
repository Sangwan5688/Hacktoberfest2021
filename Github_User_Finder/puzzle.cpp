#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    // Seed the random number generator with the current time
    std::srand(static_cast<unsigned>(std::time(nullptr)));

    int secretNumber = std::rand() % 100 + 1; // Generates a random number between 1 and 100
    int guess;
    int attempts = 0;

    std::cout << "Welcome to the Guess the Number game!" << std::endl;

    while (true) {
        std::cout << "Enter your guess: ";
        std::cin >> guess;
        attempts++;

        if (guess < secretNumber) {
            std::cout << "Too low! Try again." << std::endl;
        } else if (guess > secretNumber) {
            std::cout << "Too high! Try again." << std::endl;
        } else {
            std::cout << "Congratulations! You guessed the number in " << attempts << " attempts." << std::endl;
            break;
        }
    }

    return 0;
}
