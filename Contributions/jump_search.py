# program for implementing jump search in python
import math

def jumpSearch( arr , x , n ):
  step = math.sqrt(n)
  prev = 0
    while arr[int(min(step, n)-1)] < x:
        prev = step
        step += math.sqrt(n)
        if prev >= n:
            return -1
    while arr[int(prev)] < x:
        prev += 1
        if prev == min(step, n):
            return -1
    if arr[int(prev)] == x:
        return prev
    return -1

# driver code
print("Enter the list of elements, leaving space in between elements: ")
arr = [int(x) for x in input().split()]
print("Enter the number you want to search for: ")
x = int(input())
n = len(arr)
index = jumpSearch(arr, x, n)
print("Number ", x, "is at index", index)
