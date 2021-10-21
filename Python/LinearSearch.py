'''
Linear Search
Example Input:
5
1 3 2 4 5
2

Output:
2
'''
#Code
n=int(input())
A=list(map(int,input().split()))
key=int(input())
f=0
for i in range(len(A)-1,-1,-1):
    if(A[i] == key):
        print(i)
        f+=1
        break
if(f==0):
    print("Key is not present")