# A list of names for each alphabet letter
names = {
    'A': 'Alice',
    'B': 'Bob',
    'C': 'Charlie',
    'D': 'David',
    'E': 'Eve',
    'F': 'Frank',
    'G': 'Grace',
    'H': 'Henry',
    'I': 'Isabel',
    'J': 'John',
    'K': 'Katherine',
    'L': 'Leo',
    'M': 'Megan',
    'N': 'Nathan',
    'O': 'Olivia',
    'P': 'Peter',
    'Q': 'Quinn',
    'R': 'Rachel',
    'S': 'Samuel',
    'T': 'Taylor',
    'U': 'Ursula',
    'V': 'Victor',
    'W': 'Wendy',
    'X': 'Xander',
    'Y': 'Yasmine',
    'Z': 'Zachary'
}

# Get a letter from the user
letter = input("Enter a letter (A-Z): ")

# Ensure the letter is uppercase
letter = letter.upper()

# Check if the letter is in the dictionary
if letter in names:
    print(f"Name for {letter}: {names[letter]}")
else:
    print("Invalid letter or name not found.")
