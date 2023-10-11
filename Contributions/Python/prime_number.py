def is_prime(n):
        if n < 2:
            return False
        prime = True
        for x in range(2, n):
            if n % x == 0:
                print(n, "is Divisible by", x)
                prime = False
                return prime
        return prime

while True:
    inputNum = int(input("Please input number: "))
    if inputNum == 0:
        break
    prime = is_prime(inputNum)
    if prime is True:
        print(inputNum," is a prime number")
    else:
        print(inputNum," is not a prime number")
