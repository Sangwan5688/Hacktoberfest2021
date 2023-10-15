def generate_fibonacci_sequence(n):
    if n <= 0:
        return []

    fibonacci_sequence = [0, 1]
    while len(fibonacci_sequence) < n:
        next_number = fibonacci_sequence[-1] + fibonacci_sequence[-2]
        fibonacci_sequence.append(next_number)

    return fibonacci_sequence

# Example usage:
n = 10
fibonacci_sequence = generate_fibonacci_sequence(n)
print(f"Fibonacci Sequence of {n} terms: {fibonacci_sequence}")
