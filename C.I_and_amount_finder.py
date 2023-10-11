#Program to find the amount and compund interest of an amount after 'n' years.
p=int(input("Enter the principal amount: "))
r=int(input("Enter the rate of interest compounded annually: "))
n=int(input("Enter the number of years: "))
a=p* (1+r/100)**n
print("The amount after ",n," years is :",a)
ci=a-p
print("The compound interest is: ",ci)
