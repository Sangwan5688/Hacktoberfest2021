import random

def choose_random_word():
    word_list = ["python", "programming", "computer", "hangman", "game", "openai"]
    return random.choice(word_list)

def play_hangman():
    secret_word = choose_random_word()
    guessed_word = ["_"] * len(secret_word)
    attempts = 6

    print("Welcome to Hangman Game!")
    print("Try to guess the secret word.")

    while attempts > 0:
        print(" ".join(guessed_word))
        guess = input("Guess a letter: ").lower()

        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single letter.")
            continue

        if guess in secret_word:
            for i in range(len(secret_word)):
                if secret_word[i] == guess:
                    guessed_word[i] = guess
        else:
            print(f"'{guess}' is not in the word. You have {attempts-1} attempts left.")

        if "".join(guessed_word) == secret_word:
            print(f"Congratulations! You've guessed the word: '{secret_word}'. You win!")
            break

        attempts -= 1

    if attempts == 0:
        print(f"Game over! The word was '{secret_word}'.")

if __name__ == "__main__":
    play_hangman()
