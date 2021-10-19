# Hacktoberfest 2021

import random
number=random.randrange(0,100)
checkGuess="wrong"
print("Welcome to a Number Guessing Game")

while checkGuess=="wrong":
	response=int(input("I am thinking of a number between 0 and 100.  Can you guess what it is?  Type a number between 0 and 100 to try to guess it." ))0
	try:
		val=int(response)
	except ValueError:
		print("Opps, something went wrong. Please try again. Type a number between 0 and 100.")
		continue
	val=int (response)
	if val<number:
		print("No, your number is too low. Please try again.")
	elif val>number:
		print("No, your number is too high. Please try again.")
	else:
		print("Amazing! You correctly guessed the number!  Congratulations.")
		checkGuess="correct"

print("Thank you for playing this simple Number Guessing game.")