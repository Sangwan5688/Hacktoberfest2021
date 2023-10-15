def count_occurrences(arr, element):
    count = 0
    for item in arr:
        if item == element:
            count += 1
    return count

# Example usage:
arr = [1, 2, 3, 2, 4, 2, 5]
element = 2
occurrences = count_occurrences(arr, element)
print(f"{element} occurs {occurrences} times in the array.")
