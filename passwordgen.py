import random

values = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&(-=)][' #A variable with all the possible characters in the password



k = True
while k:
	try:
		length = int(input('How many characters would you like your password to be? ')) #Asks how many letters/numbers/special characters should be in the password
		if length > 31: 
			print('\n' 'That seems like a really long password, you might forget it! Try entering a value less than that.\nPlease relaunch the program.')
			break
		if length < 0: #Passwords can't be 0 or less, it simply does not work or make sense
			print('\n' "... You can't have a password without any characters.\nPlease relaunch the program.")
			break
		amount = int(input('How many passwords would you like? ')) #Asks how many passwords should be generated inside the text file
		with open('passwords.txt', 'w+') as f: #Opens a new text file on the users computer named passwords.txt and stores the generated passwords in there
			f.write('Here are your passwords: ')
			for i in range(0, amount):
				password = ""
				for x in range(0, length):
					passwords = random.choice(values) #Randomly chooses things from the values variable
					password = password + passwords
				f.write('\n'+ password) #Writes the passwords in the text file
			
			print('Thank you for using the password generator! Have a nice day!\nThe generated passwords are stored in the file passwords.txt. \nIf you want to make more passwords, please relaunch the program.')
			break
	except ValueError as e: #This is so if the user enters letters inside the input the program won't crash
		print('\nPlease enter a number.')
		pass
		


	

