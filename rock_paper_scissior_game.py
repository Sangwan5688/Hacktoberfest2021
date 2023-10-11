import random


# Defining the rules for the game 
#p = paper , s = stone , x = scissiors

rule1 = "p" > "s" 
rule2 = "s" > "x"
rule3 = "x" > "p"
i = 0

#using random no generator for single player mode
no_of_players = input("Press 'a' for single player mode and press 'd' for double player mode")
if no_of_players == "a" :
    print("This is single player mode")
    for i in range (0,5):
      i += 1  
      roll1 = random.randint(1,3)
      if roll1 == 1 :
          roll1 = "s"
      elif roll1 == 2:
          roll1 = "p"
      elif roll1 == 3:
          roll1 = "x"
      user3 = input("press 's' for stone, press 'p' for paper, press 'x' for scissior")

      if user3 == roll1 :
          print("Draw")
      elif user3 > roll1:
          print("You win!")
      elif user3 < roll1:
          print("You lose!")

      print("Thanks for playing")
  # else:
elif no_of_players == "d":
    for i in range (0,5):
      i += 1
      print("This is double player mode")
      user1 = input( "Player1 : press 's' for stone, press 'p' for paper, press 'x' for scissior -")
      user2 = input("Player2 : press 's' for stone, press 'p' for paper, press 'x' for scissior -")

      if user1 == user2 :
          print("Draw")
      elif user1 > user2:
          print("Player 1 wins this round")
      elif user2 > user1:
          print("Player 2 wins this round")
      print("Thanks for playing")


