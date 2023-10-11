n=int(input("Enter the number of items:\n"))
weight,value=[],[]
for i in range(n):
    print("Enter weight and value for item %d"%(i+1))
    weight.append(int(input()))
    value.append(int(input()))

ratio=[]
for i in range(n):
    ratio.append(value[i]//weight[i])

cap=int(input("Enter the maximum capacity:\n"))
w,v=0,0
while w<=cap:
    m=max(ratio)
    i=ratio.index(m)
    if w+weight[i]<=cap:
        print("Adding 100 percent of the item %d to the knapsack  "%(i+1))
        w+=weight[i]
        v+=value[i]
        cap-=weight[i]
    else:
        f1=cap/weight[i]
        f1=f1*100.0
        print("Adding",f1,"percent of the item %d to the knapsack   " %(i+1))
        v+=(f1/100.0*value[i])
        v=round(v,2)
        break
    ratio[i]=-1

print("The maximum value is: %.2f"%v)
