def decimal_to_binary(decimal):
    if decimal == 0:
        return "0"

    binary = ""
    while decimal > 0:
        binary = str(decimal % 2) + binary
        decimal //= 2

    return binary

def main():
    decimal_input = int(input("Enter a decimal number: "))

    binary_result = decimal_to_binary(decimal_input)
    print(f"Decimal {decimal_input} is equivalent to Binary {binary_result}")

if __name__ == "__main__":
    main()
