for i in range(int(input())):
    fact=1
    a=int(input())
    for j in range(1,a+1,1):
        fact=fact*j
    print(fact)