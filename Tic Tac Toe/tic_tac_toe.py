def print_board(board):
    for row in board:
        print(" | ".join(row))
        print("-" * 9)

def check_win(board):
    for row in board:
        if row[0] == row[1] == row[2] != ' ':
            return True
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] != ' ':
            return True
    if board[0][0] == board[1][1] == board[2][2] != ' ':
        return True
    if board[0][2] == board[1][1] == board[2][0] != ' ':
        return True
    return False

def play_game():
    board = [[' ' for _ in range(3)] for _ in range(3)]
    current_player = 'X'

    while True:
        print_board(board)

        try:
            row = int(input("Enter the row (0-2): "))
            col = int(input("Enter the column (0-2): "))

            if row < 0 or row > 2 or col < 0 or col > 2:
                print("Invalid move. Row and column values must be between 0 and 2.")
                continue

            if board[row][col] != ' ':
                print("Invalid move. That cell is already taken.")
                continue

            board[row][col] = current_player

            if check_win(board):
                print_board(board)
                print("Player", current_player, "wins!")
                break

            if all(all(cell != ' ' for cell in row) for row in board):
                print_board(board)
                print("It's a tie!")
                break

            current_player = 'O' if current_player == 'X' else 'X'

        except ValueError:
            print("Invalid input. Please enter numeric values for the row and column.")

play_game()