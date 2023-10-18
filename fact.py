def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n - 1)

if __name__ == "__main__":
    try:
        num = int(input("Enter a non-negative integer to calculate its factorial: "))
        if num < 0:
            print("Please enter a non-negative integer.")
        else:
            result = factorial(num)
            print(f"The factorial of {num} is: {result}")
    except ValueError:
        print("Invalid input. Please enter a non-negative integer.")
