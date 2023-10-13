def find_gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

num1 = int(input("Enter the first positive integer: "))
num2 = int(input("Enter the second positive integer: "))

gcd = find_gcd(num1, num2)

print(f"The Greatest Common Divisor (GCD) of {num1} and {num2} is: {gcd}")
