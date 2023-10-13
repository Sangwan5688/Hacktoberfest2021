def power(base, exponent):
    if exponent == 0:
        return 1.0
    elif exponent < 0:
        base = 1.0 / base
        exponent = -exponent

    result = 1.0
    for i in range(exponent):
        result *= base
    return result

base = 2.0
exponent = 3

result = power(base, exponent)

print(f"{base} raised to the power of {exponent} is {result}")
