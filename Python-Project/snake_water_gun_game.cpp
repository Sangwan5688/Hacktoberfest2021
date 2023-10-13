
import random
 
n = int(input('Enter number of rounds: '))
 
options = ['s', 'w', 'g']
 
rounds = 1
comp_win = 0
user_win = 0
while rounds <= n:
    print(f"Round :{rounds}\nSnake - 's'\nWater - 'w'\nGun - 'g'")
    try:
        player = input("Chose your option: ")
    except EOFError as e:
        print(e)
 
    if player != 's' and player != 'w' and player != 'g':
        print("Invalid input, try again\n")
        continue
 
    computer = random.choice(options)

    if computer == 's':
        if player == 'w':
            comp_win += 1
        elif player == 'g':
            user_win += 1
 
    elif computer == 'w':
        if player == 'g':
            comp_win += 1
        elif player == 's':
            user_win += 1
 
    elif computer == 'g':
        if player == 's':
            comp_win += 1
        elif player == 'w':
            user_win += 1
 
    if user_win > comp_win:
        print(f"You Won round {rounds}\n")
    elif comp_win > user_win:
        print(f"Computer Won round {rounds}\n")
    else:
        print("Draw!!!!\n")
 
    rounds += 1
 
if user_win > comp_win:
    print("Congratulations!!!!You Won")
elif comp_win > user_win:
    print("You lose!!!!")
else:
    print("Match Draw!!!!")
    
    
print("Thanks for playing this game,\n Have a nice day")
