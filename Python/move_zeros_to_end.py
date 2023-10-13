def move_zeros_to_end(arr):
    non_zero_index = 0  # Index to keep track of non-zero elements

    # Traverse the list and move non-zero elements to the front
    for i in range(len(arr)):
        if arr[i] != 0:
            arr[non_zero_index] = arr[i]
            non_zero_index += 1

    # Fill the remaining elements with zeros
    while non_zero_index < len(arr):
        arr[non_zero_index] = 0
        non_zero_index += 1

    return arr

# Example usage
arr = [0, 2, 0, 4, 0, 6, 0, 8, 10, 0]
arr = move_zeros_to_end(arr)
print(arr)
