import random

def choose_word():
    words = ["python", "java", "javascript", "ruby", "html", "css", "php", "swift", "csharp"]
    return random.choice(words)

def play_hangman():
    word = choose_word()
    guessed_letters = set()
    attempts = 6  # Number of attempts allowed

    print("Welcome to Hangman!")
    print("Try to guess the letters in the word.")
    print("You have", attempts, "attempts.")

    while attempts > 0:
        display_word = ''.join(letter if letter in guessed_letters else '_' for letter in word)
        print("Word:", display_word)

        if display_word == word:
            print("Congratulations! You've guessed the word:", word)
            break

        guess = input("Enter a letter: ").lower()

        if guess in guessed_letters:
            print("You already guessed that letter. Try again.")
        elif len(guess) != 1 or not guess.isalpha():
            print("Please enter a valid single letter.")
        else:
            guessed_letters.add(guess)
            if guess not in word:
                attempts -= 1
                print("Wrong guess! Attempts left:", attempts)

    else:
        print("Sorry, you've run out of attempts. The word was:", word)

if __name__ == "__main__":
    play_hangman()
