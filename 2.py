def sum(x):
    s=0
    for i in x:
        s=s+i
    return s
def prod(x):
    p=1
    for i in x:
        p=p*i
    return p
n=int(input("enter limit"))
l=[]
for i in range(n):
    e=int(input("enter elements"))
    l.append(e)
print(sum(l))
print(prod(l))
