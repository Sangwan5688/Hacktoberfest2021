def interpolation_search(arr, x):
    low, high = 0, len(arr) - 1

    while low <= high and x >= arr[low] and x <= arr[high]:
        if low == high:
            if arr[low] == x:
                return low
            return -1

        # Estimate the position of x in the array
        pos = low + ((x - arr[low]) * (high - low)) // (arr[high] - arr[low])

        if arr[pos] == x:
            return pos
        elif arr[pos] < x:
            low = pos + 1
        else:
            high = pos - 1

    return -1

# Example usage:
arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
x = 12
result = interpolation_search(arr, x)
if result != -1:
    print(f"Element {x} found at index {result}")
else:
    print(f"Element {x} not found in the array.")
