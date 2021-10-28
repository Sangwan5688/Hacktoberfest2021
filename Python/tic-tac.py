import time
print("Welcome to the game")

arr = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]


def display_board():
    print(arr[1] + ' | ' + arr[2] + ' | ' + arr[3])
    print(arr[4] + ' | ' + arr[5] + ' | ' + arr[6])
    print(arr[7] + ' | ' + arr[8] + ' | ' + arr[9])


def initial_board():
    print("The following numbers represent each square:")
    print("1 | 2 | 3 ")
    print("4 | 5 | 6 ")
    print("7 | 8 | 9 ")


def turns():

    p1 = input("Player 1 choose X or O: \n")
    if(p1 == 'X' or p1 == 'x'):

        print("P1 goes first")
        return
    elif(p1 == 'O' or p1 == 'o'):

        print("P2 goes first")
        return
    else:
        print("Try again")
        turns()


def user_inputs():
    for i in range(0, 9):
        t = int(input("Enter your choice \n"))
        if(i % 2 == 0):
            arr[t] = 'X'
            display_board()
            winner('X')

        else:
            arr[t] = 'O'
            display_board()
            winner('O')


def winner(win):
    if(arr[1] == arr[2] == arr[3] != " " or arr[1] == arr[5] == arr[9] != " " or arr[1] == arr[4] == arr[7] != " " or arr[5] == arr[2] == arr[8] != " " or arr[3] == arr[5] == arr[7] != " " or arr[4] == arr[5] == arr[6] != " " or arr[7] == arr[8] == arr[9] != " " or arr[3] == arr[6] == arr[9] != " "):
        print(win + " is the Winner")
        a = input("Press 1 to play again")
        if(a == 1):
            turns()
            time.sleep(1)
            initial_board()
            user_inputs()
        else:
            print("Thanks for playing")


turns()
time.sleep(1)
initial_board()
user_inputs()
