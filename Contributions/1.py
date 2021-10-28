import math
def fact(x):
    return math.factorial(x)
#main
n=int(input("enter n"))
r=int(input("enter r"))
f=(fact(n)/fact(r)*fact(n-r))
print("result is",f)
