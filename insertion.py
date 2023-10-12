def insertion_sort(arr):
    # Traverse through all array elements starting from the second element
    for i in range(1, len(arr)):
        key = arr[i]

        # Move elements of arr[0..i-1] that are greater than key to one position ahead of their current position
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1

        # Place the key at its correct position in the sorted part
        arr[j + 1] = key

# Example usage:
my_list = [12, 11, 13, 5, 6]
print("Original List:", my_list)

insertion_sort(my_list)
print("Sorted List:", my_list)
