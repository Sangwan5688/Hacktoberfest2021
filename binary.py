def binary_search(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        guess = arr[mid]

        if guess == target:
            return mid
        elif guess < target:
            low = mid + 1
        else:
            high = mid - 1

    return None

# Example usage:
my_list = [1, 3, 5, 7, 9]
target_value = 5
result = binary_search(my_list, target_value)

if result is not None:
    print(f'Target {target_value} found at index {
