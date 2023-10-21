import random

# List of words to choose from
word_list = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"]

def choose_random_word():
    return random.choice(word_list)

def display_word(word, guessed_letters):
    display = ""
    for letter in word:
        if letter in guessed_letters:
            display += letter
        else:
            display += "_"
    return display

def is_word_guessed(word, guessed_letters):
    for letter in word:
        if letter not in guessed_letters:
            return False
    return True

def main():
    print("Welcome to the Word Guessing Game!")
    word_to_guess = choose_random_word()
    guessed_letters = []
    attempts = 6

    while attempts > 0:
        print(f"\nWord to guess: {display_word(word_to_guess, guessed_letters)}")
        guess = input("Guess a letter: ").lower()

        if guess in guessed_letters:
            print("You already guessed that letter.")
        elif guess in word_to_guess:
            guessed_letters.append(guess)
            if is_word_guessed(word_to_guess, guessed_letters):
                print(f"Congratulations! You guessed the word: {word_to_guess}")
                break
        else:
            guessed_letters.append(guess)
            attempts -= 1
            print(f"Wrong guess! You have {attempts} attempts left.")

    if attempts == 0:
        print(f"\nSorry, you ran out of attempts. The word was: {word_to_guess}")

if __name__ == "__main__":
    main()
