#this is guess the number(user)

import random

def guess(x):
    random_number = random.randint(1,x)
    guess = 0
    while guess != random_number:
        guess = int(input(f"guess a number between 1 and {x}:\n"))
        if guess < random_number:
            print("try again. your guess is too low")
        elif guess > random_number:
            print("try again. your guess is too high")
    print(f"you guessed the number {random_number} correct!")

def computer_guess(x):
    low = 1
    high = x
    feedback = ""
    while feedback != "c":
        if low != high:
            guess = random.randint(low,high)
        else:
            guess = low
        feedback = input(f"is my guess {guess} 'H'(high), 'L'(low) or 'C'(correct):\n").lower()
        if feedback == "h":
            high = guess - 1
        elif feedback == 'l':
            low = guess + 1
        elif feedback == 'c':
            break
        else:
            print("please tell me whether my guess is high, low or correct")
            continue
    print("Yayy! I guessed it correct\n GGWP")
computer_guess(1000)
