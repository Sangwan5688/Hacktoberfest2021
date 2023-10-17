# diamond number pattern
n = 3

# upward pyramid
for i in range(n):
    for j in range(n - i - 1):
        print(' ', end='')
    for j in range(2 * i + 1):
        print(j+1, end='')
    print()

# downward pyramid
for i in range(n - 1):
    for j in range(i + 1):
        print(' ', end='')
    for j in range(2*(n - i - 1) - 1):
        print(j+1, end='')
    print()