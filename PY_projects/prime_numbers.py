n=int(input("write a number >0:"))
ok=1
if(n==0 or n==1):
    ok=0
else:
    if(n%2==0):
        if(n!=2):
            ok=0
    else:
        d=2
        while(d<=n//2):
            if(n%d==0):
                ok=0
                break
            if(d==2):
                d=3
            else:
                d+=2
if(ok==1):
    print("prime")
else:
    print("!prime")