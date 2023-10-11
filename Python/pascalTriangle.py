# Amazon interiew Question
def pascal_triangle(M):
    a =[[] for i in range(M)]
    
    for i in range(M):
        for j in range(i+1):
            if(j<i):
                if(j==0):
                    a[i].append(1)
                else:
                    a[i].append(a[i-1][j] + a[i-1][j-1])

            elif(j==i):
                a[i].append(1)

    return a

M=5
print(pascal_triangle(M))
