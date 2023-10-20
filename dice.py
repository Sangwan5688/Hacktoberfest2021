import random

def roll_dice():
    return random.randint(1, 6)

def dice_game():
    print("Welcome to the Dice Rolling Game!")
    
    while True:
        player_guess = int(input("Guess the sum of two dice rolls (2 to 12): "))
        
        if player_guess < 2 or player_guess > 12:
            print("Invalid guess. Please enter a number between 2 and 12.")
            continue
        
        die1 = roll_dice()
        die2 = roll_dice()
        total_roll = die1 + die2
        
        print(f"The dice rolls are: {die1} and {die2}")
        print(f"The total sum of the dice rolls is: {total_roll}")
        
        if total_roll == player_guess:
            print("Congratulations! You guessed correctly.")
        else:
            print("Sorry, your guess was incorrect.")
        
        play_again = input("Do you want to play again? (yes/no): ").lower()
        if play_again != 'yes':
            break

if __name__ == "__main__":
    dice_game()
