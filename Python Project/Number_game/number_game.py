import random

def guess_the_number():
    """
    A simple number guessing game.
    """

    # Get the range from the user
    min_range = int(input("Enter the minimum number in the range: "))
    max_range = int(input("Enter the maximum number in the range: "))

    # Generate a random number within the specified range
    secret_number = random.randint(min_range, max_range)
    attempts = 0

    print("\nWelcome to the Guess the Number game!")
    print(f"I'm thinking of a number between {min_range} and {max_range}.")

    while True:
        try:
            guess = int(input("Take a guess: "))
            attempts += 1

            if guess < secret_number:
                print("Too low! Try again.")
            elif guess > secret_number:
                print("Too high! Try again.")
            else:
                print(f"Congratulations! You've guessed the number {secret_number} in {attempts} attempts!")
                break

        except ValueError:
            print("Invalid input. Please enter a valid number.")

if __name__ == "__main__":
    guess_the_number()
