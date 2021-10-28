def fib(n):
    f=0
    s=1
    l=[]
    l.append(f)
    l.append(s)
    for i in range(3,n+1):
        t=f+s
        l.append(t)
        f=s
        s=t
        print(l)
n=int(input("enter limit"))
fib(n)
