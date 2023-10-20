import random

def choose_word():
    word_list = ["python", "hangman", "programming", "developer", "challenge"]
    return random.choice(word_list)

def play_hangman():
    word_to_guess = choose_word()
    word_guessed = ["_"] * len(word_to_guess)
    max_attempts = 6
    attempts = 0

    print("Welcome to Hangman!")
    print("Try to guess the word one letter at a time.")
    print("You have", max_attempts, "lives.")

    while attempts < max_attempts:
        print(" ".join(word_guessed))
        guess = input("Guess a letter: ").lower()

        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single letter.")
            continue

        if guess in word_to_guess:
            for i in range(len(word_to_guess)):
                if word_to_guess[i] == guess:
                    word_guessed[i] = guess
        else:
            attempts += 1
            print("Incorrect guess. You have", max_attempts - attempts, "lives remaining.")

        if "".join(word_guessed) == word_to_guess:
            print("Congratulations! You've guessed the word:", word_to_guess)
            break

    if "".join(word_guessed) != word_to_guess:
        print("Sorry, you've run out of attempts. The word was:", word_to_guess)

if __name__ == "__main__":
    play_hangman()
