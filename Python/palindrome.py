def is_palindrome(number):
    # Convert the number to a string for easy comparison
    num_str = str(number)
    
    # Reverse the string
    reversed_str = num_str[::-1]
    
    # Check if the original string and reversed string are the same
    return num_str == reversed_str

# Input from the user
num = int(input("Enter a number: "))

if is_palindrome(num):
    print(f"{num} is a palindrome number.")
else:
    print(f"{num} is not a palindrome number.")
