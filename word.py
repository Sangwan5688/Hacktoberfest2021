import random

def choose_word():
    words = ["python", "java", "javascript", "ruby", "html", "css", "php", "swift", "csharp"]
    return random.choice(words)

def play_word_guessing_game():
    word_to_guess = choose_word().lower()
    guessed_letters = set()
    max_attempts = 6

    print("Welcome to the Word Guessing Game!")
    print("Try to guess the word.")
    print("The word has", len(word_to_guess), "letters.")
    print("You have", max_attempts, "attempts.")

    attempts = 0
    while attempts < max_attempts:
        display_word = ''.join(letter if letter in guessed_letters else '_' for letter in word_to_guess)
        print("Word:", display_word)

        if display_word == word_to_guess:
            print("Congratulations! You've guessed the word:", word_to_guess)
            return

        guess = input("Enter your guess (a letter or the whole word): ").lower()

        if guess == word_to_guess:
            print("Congratulations! You've guessed the word:", word_to_guess)
            return
        elif len(guess) == 1 and guess.isalpha():
            if guess in guessed_letters:
                print("You already guessed that letter. Try again.")
            else:
                guessed_letters.add(guess)
                attempts += 1
                print("Wrong guess! Attempts left:", max_attempts - attempts)
        else:
            print("Invalid input. Please enter a valid letter or the entire word.")

    print("Sorry, you've run out of attempts. The word was:", word_to_guess)

if __name__ == "__main__":
    play_word_guessing_game()
