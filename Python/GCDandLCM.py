def GCD(x, y):
    while (y):
        x, y = y, x % y
    return x
for i in range(int(input())):
    x, y = map(int, input().split())
    print(GCD(x,y), x*y//GCD(x,y))

"""for a in range(int(input())):
    x,y=map(int, input().split())
    X_list,Y_list=[],[]
    GCD=1
    for i in range(1,x,1):
        if(x%i==0):
            X_list.append(i)
    for i in range(1,y+1,1):
        if(y%i==0):
            Y_list.append(i)
    for i in X_list:
        if i in Y_list:
            GCD=i
    print(GCD,(x*y)//GCD)
"""