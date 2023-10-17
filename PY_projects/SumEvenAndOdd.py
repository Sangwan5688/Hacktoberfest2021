def sum_even_and_odd(arr):
    even_sum = 0
    odd_sum = 0

    for num in arr:
        if num % 2 == 0:
            even_sum += num
        else:
            odd_sum += num

    return even_sum, odd_sum

# Example usage:
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even, odd = sum_even_and_odd(arr)
print(f"Sum of even numbers: {even}, Sum of odd numbers: {odd}")
