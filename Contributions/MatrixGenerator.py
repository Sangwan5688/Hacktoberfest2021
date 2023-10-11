import random as r

cols = 10
numOfFilled = 20

matrix = [[]]

total = (cols//6)*10
sinkConnects = r.sample(range(3, cols -1), r.randint(cols//6, cols//2-1))
total = total - len(sinkConnects)

for i in range(cols - 1):
    indices = r.sample(range(1,cols - 2), r.randint(cols//(cols//2), cols//(cols-(cols//2))))
    total -= len(indices)
    for j in range(cols):
        print("place: " , i , "-->", j)
        if i == j:
            matrix[-1].append(0)
            continue
        if j in indices:
            matrix[-1].append(r.randint(1, 20))
            print(matrix[-1][-1])
        elif j == cols - 1:
            if i in sinkConnects:
                matrix[-1].append(r.randint(1, 20))
                print(matrix[-1][-1])
            else:
                matrix[-1].append(0)
                print(matrix[-1][-1])
        else:
            matrix[-1].append(0)
            print(matrix[-1][-1])
    matrix.append([])

for i in range(cols):
    matrix[-1].append(0)
for m in matrix:
    print(m)

# print(indices)
# print(matrix)

def adjust():
    global total
    global matrix
    for m in matrix:
        count = 0
        for n in range(len(m)):
            if(n != 0):
                count += 1
                if count == 2:
                    m[n] = 0
                    total += 1
                    if total == 0:
                        return


adjust()
for m in matrix:
    for n in range(len(m)):
        if(n == len(m)-1):
            print(m[n], end="")
        else:
            print(m[n], end=" ")
    print(",", end=" ")

print("\ntotal:", total)