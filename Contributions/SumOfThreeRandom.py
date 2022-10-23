import random
import timeit

arr = []
for i in range(500):
    arr.append(random.randint(-100, 100))

start = timeit.default_timer()

for i in range(len(arr)):
    for j in range(i, len(arr)):
        for k in range(j, len(arr)):
            if i != j and j != k:
                # validate if the addition of the values is equal to 0
                if arr[i]+arr[j]+arr[k] == 0:
                    print(arr[i], arr[j], arr[k])
                    pass

end = timeit.default_timer()

print(end - start)
