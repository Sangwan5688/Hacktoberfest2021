#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>
#include <ctime>

std::vector<std::string> words = {"programming", "hangman", "computer", "keyboard", "algorithm"};
const int maxTries = 6;

std::string getRandomWord() {
    std::srand(static_cast<unsigned int>(std::time(nullptr)));
    return words[std::rand() % words.size()];
}

bool contains(const std::string& word, char letter) {
    return word.find(letter) != std::string::npos;
}

void displayWord(const std::string& word, const std::string& guessed) {
    for (char letter : word) {
        if (contains(guessed, letter)) {
            std::cout << letter << " ";
        } else {
            std::cout << "_ ";
        }
    }
    std::cout << std::endl;
}

int main() {
    std::string wordToGuess = getRandomWord();
    std::string guessedLetters = "";
    int remainingTries = maxTries;

    std::cout << "Welcome to Hangman!" << std::endl;

    while (remainingTries > 0) {
        std::cout << "\nWord to guess: ";
        displayWord(wordToGuess, guessedLetters);
        std::cout << "Guessed letters: " << guessedLetters << std::endl;
        std::cout << "Tries remaining: " << remainingTries << std::endl;

        std::cout << "Guess a letter: ";
        char guess;
        std::cin >> guess;

        if (contains(guessedLetters, guess)) {
            std::cout << "You already guessed that letter!" << std::endl;
        } else if (contains(wordToGuess, guess)) {
            guessedLetters += guess;
            if (guessedLetters == wordToGuess) {
                std::cout << "\nCongratulations! You guessed the word: " << wordToGuess << std::endl;
                break;
            }
        } else {
            guessedLetters += guess;
            remainingTries--;
        }
    }

    if (remainingTries == 0) {
        std::cout << "\nYou're out of tries! The word was: " << wordToGuess << std::endl;
    }

    return 0;
}
