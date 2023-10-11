# Github: https://github.com/vishwasluhana

name = 'vishwas'
chances = 3
stars = ['*' for _ in name]  # I kept it as a list so that we can replace * with char
print("\t\tWelcome to name guessing game")

# while there are chances and user hasn't guessed the whole name
while chances > 0 and '*' in stars:
    user = input("\nEnter Character: ").lower()

    # If correct
    if user in name:
        index = name.find(user)  # find the first occurence of that char in name
        name = name.replace(user, '.', 1)  # now replace that char with some special character like '.'
        stars[index] = user  # replace the value in the stars list so that we can show it to the user
        print("Correct\nName: " + ''.join(stars))
    else:
        chances -=1 
        print("Incorrect, {} chances left.".format(chances))
