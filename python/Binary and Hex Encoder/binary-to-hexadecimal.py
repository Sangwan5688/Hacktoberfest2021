line = str(input())
lis=[line[i:i+4] for i in range(0, len(line), 4)]


res=0

for li in lis:
    res*=10
    for i in range(4):
        res+=int(li[i])*(2**(3-i))
    
    
print(res)   
        