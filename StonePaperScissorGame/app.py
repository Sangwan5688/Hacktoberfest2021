import random

def get_user_choice():
    user_choice = input("Enter your choice (stone, paper, or scissors): ").lower()
    while user_choice not in ["stone", "paper", "scissors"]:
        user_choice = input("Invalid choice. Please enter stone, paper, or scissors: ").lower()
    return user_choice

def get_computer_choice():
    computer_choice = random.choice(["stone", "paper", "scissors"])
    return computer_choice

def determine_winner(user_choice, computer_choice):
    if user_choice == computer_choice:
        return "It's a tie!"
    elif (
        (user_choice == "stone" and computer_choice == "scissors") or
        (user_choice == "scissors" and computer_choice == "paper") or
        (user_choice == "paper" and computer_choice == "stone")
    ):
        return "You win!"
    else:
        return "Computer wins!"

def play_game():
    user_choice = get_user_choice()
    computer_choice = get_computer_choice()
    print(f"You chose: {user_choice}")
    print(f"Computer chose: {computer_choice}")
    result = determine_winner(user_choice, computer_choice)
    print(result)

if __name__ == "__main__":
    print("Welcome to Stone, Paper, Scissors!")
    while True:
        play_game()
        play_again = input("Play again? (yes/no): ").lower()
        if play_again != "yes":
            break
