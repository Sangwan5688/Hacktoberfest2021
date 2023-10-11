i=0
result=0
n = int(input("please give a number : "))
number1 = n
temp = n
while n!=0:
    n = (n//10)
    i=i+1;
while number1!=0:
    n=number1%10
    result=result+pow(n,i)
    number1=number1//10
if temp==result:
    print("number is armstrong")
else:
    print("number is not armstrong") 
