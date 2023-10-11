def is_palindrome(number):
    num_str = str(number)
    return num_str == num_str[::-1]

def is_armstrong(number):
    num_str = str(number)
    num_digits = len(num_str)
    armstrong_sum = sum(int(digit) ** num_digits for digit in num_str)
    return number == armstrong_sum

def factorial(number):
    if number == 0:
        return 1
    return number * factorial(number - 1)

def generate_fibonacci(n):
    fib_series = []
    a, b = 0, 1
    while len(fib_series) < n:
        fib_series.append(a)
        a, b = b, a + b
    return fib_series

def is_prime(number):
    if number <= 1:
        return False
    if number <= 3:
        return True
    if number % 2 == 0 or number % 3 == 0:
        return False
    i = 5
    while i * i <= number:
        if number % i == 0 or number % (i + 2) == 0:
            return False
        i += 6
    return True

while True:
    print("Menu:")
    print("1. Check Palindrome Number")
    print("2. Check Armstrong Number")
    print("3. Generate Factorial")
    print("4. Generate Fibonacci Series")
    print("5. Check Prime Number")
    print("6. Exit")
    
    choice = input("Enter your choice: ")
    
    if choice == '1':
        number = int(input("Enter a number: "))
        if is_palindrome(number):
            print(f"{number} is a palindrome number.")
        else:
            print(f"{number} is not a palindrome number.")
    
    elif choice == '2':
        number = int(input("Enter a number: "))
        if is_armstrong(number):
            print(f"{number} is an Armstrong number.")
        else:
            print(f"{number} is not an Armstrong number.")
    
    elif choice == '3':
        number = int(input("Enter a number: "))
        if number < 0:
            print("Factorial is defined only for non-negative integers.")
        else:
            result = factorial(number)
            print(f"The factorial of {number} is {result}.")
    
    elif choice == '4':
        n = int(input("Enter the number of terms in the Fibonacci series: "))
        if n <= 0:
            print("Number of terms should be a positive integer.")
        else:
            fib_series = generate_fibonacci(n)
            print("Fibonacci Series:")
            print(fib_series)
    
    elif choice == '5':
        number = int(input("Enter a number: "))
        if is_prime(number):
            print(f"{number} is a prime number.")
        else:
            print(f"{number} is not a prime number.")
    
    elif choice == '6':
        print("Exiting the program. Goodbye!")
        break
    
    else:
        print("Invalid choice. Please try again.")
