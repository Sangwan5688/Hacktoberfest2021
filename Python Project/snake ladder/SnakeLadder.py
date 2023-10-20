import random

# Initialize the game board
board = [0] * 101
snakes_and_ladders = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
}
for start, end in snakes_and_ladders.items():
    board[start] = end

# Function to roll the dice
def roll_dice():
    return random.randint(1, 6)

# Function to check for a snake or ladder and update position
def move_player(player, roll):
    player += roll
    if player in snakes_and_ladders:
        new_position = snakes_and_ladders[player]
        if new_position > player:
            print(f"Player {player} climbed a ladder to {new_position}!")
        else:
            print(f"Player {player} got bitten by a snake and dropped to {new_position}.")
        player = new_position
    return player

# Main game loop
player1, player2 = 0, 0
current_player = 1

while True:
    if current_player == 1:
        input(f"Player 1's turn (press Enter to roll the dice)")
        roll = roll_dice()
        print(f"Player 1 rolled a {roll}")
        player1 = move_player(player1, roll)
        print(f"Player 1 is now at position {player1}")
        if player1 >= 100:
            print("Player 1 wins!")
            break
    else:
        input(f"Player 2's turn (press Enter to roll the dice)")
        roll = roll_dice()
        print(f"Player 2 rolled a {roll}")
        player2 = move_player(player2, roll)
        print(f"Player 2 is now at position {player2}")
        if player2 >= 100:
            print("Player 2 wins!")
            break

    current_player = 3 - current_player  # Switch players (1 -> 2 or 2 -> 1)
