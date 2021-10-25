def binarysearch(arr, element):
    start = 0
    end = len(arr) - 1
    while start <= end:
        mid = (start + end) // 2
        if arr[mid] == element:
            return mid
        elif arr[mid] < element:
            start = mid + 1
        else:
            end = mid - 1
    return -1


faltu =int(input())
if faltu == 0:
    list = [0]
else:
    list = [int(x) for x in input().split()]
no_of_loop = int(input())
for i in range(no_of_loop):
    search_element = int(input())
    print(binarysearch(list, search_element))