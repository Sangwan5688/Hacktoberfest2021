import random

def play_game():
    choices = ['rock', 'paper', 'scissors']

    while True:
        user_choice = input("Enter your choice (rock, paper, scissors) or 'q' to quit: ").lower()

        if user_choice == 'q':
            print("Thanks for playing!")
            break
        elif user_choice not in choices:
            print("Invalid choice. Please choose from 'rock', 'paper', 'scissors'.")
            continue

        computer_choice = random.choice(choices)
        print(f"Computer's choice: {computer_choice}")

        if user_choice == computer_choice:
            print("It's a tie!")
        elif (user_choice == 'rock' and computer_choice == 'scissors') or \
             (user_choice == 'scissors' and computer_choice == 'paper') or \
             (user_choice == 'paper' and computer_choice == 'rock'):
            print("You win!")
        else:
            print("You lose!")

if __name__ == "__main__":
    play_game()
