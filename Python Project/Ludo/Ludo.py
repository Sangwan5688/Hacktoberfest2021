import random

# Initialize the Ludo board
board = [" " for _ in range(52)]
players = ["Player 1", "Player 2", "Player 3", "Player 4"]
player_positions = [0, 0, 0, 0]
colors = ["R", "G", "Y", "B"]

def print_board():
    print(f"  {board[1]}  {board[2]}  {board[3]}  {board[4]}")
    print(f"{board[12]}             {board[5]}")
    print(f"{board[11]}             {board[6]}")
    print(f"{board[10]}             {board[7]}")
    print(f"  {board[9]}  {board[8]}  {board[17]}  {board[18]}")

def roll_dice():
    return random.randint(1, 6)

def move_piece(player, piece_index, steps):
    player_positions[player] += steps
    player_positions[player] %= 52
    board[player_positions[player]] = colors[player]

def main():
    while True:
        for player in range(4):
            print(f"{players[player]}'s turn")
            input("Press Enter to roll the dice...")

            steps = roll_dice()
            print(f"You rolled a {steps}")

            if " " not in board[player_positions[player]]:
                # Cannot move a piece out of the starting area until a 6 is rolled
                if steps != 6:
                    print("No pieces can move.")
                    continue

            if steps == 6:
                print("You get to roll again!")

            piece_choice = input("Enter the piece number to move (1-4): ")
            piece_index = int(piece_choice) - 1

            if piece_index < 0 or piece_index > 3:
                print("Invalid piece number. Try again.")
                continue

            move_piece(player, piece_index, steps)

            print_board()

if __name__ == "__main__":
    main()
