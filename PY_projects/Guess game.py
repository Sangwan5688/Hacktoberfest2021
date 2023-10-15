import random

def guessing_game():
    target = random.randint(1, 100)
    attempts = 0

    while True:
        guess = int(input("Guess the number (1-100): "))
        attempts += 1

        if guess < target:
            print("Too low. Try again.")
        elif guess > target:
            print("Too high. Try again.")
        else:
            print(f"Congratulations! You guessed the number {target} in {attempts} attempts.")
            break

# Example usage:
guessing_game()
