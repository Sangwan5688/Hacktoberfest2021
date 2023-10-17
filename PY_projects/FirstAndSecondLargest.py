def find_first_and_second_largest(arr):
    if len(arr) < 2:
        return "Array must have at least two elements."

    first_max = second_max = float('-inf')

    for num in arr:
        if num > first_max:
            second_max = first_max
            first_max = num
        elif first_max > num > second_max:
            second_max = num

    return first_max, second_max

# Example usage:
arr = [10, 20, 5, 30, 40]
first, second = find_first_and_second_largest(arr)
print(f"First largest: {first}, Second largest: {second}")
