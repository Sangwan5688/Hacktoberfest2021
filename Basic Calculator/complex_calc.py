import cmath

def add_complex(a, b):
    return a + b

def subtract_complex(a, b):
    return a - b

def multiply_complex(a, b):
    return a * b

def divide_complex(a, b):
    if b == 0:
        return "Division by zero is not allowed."
    else:
        return a / b

def modulus_complex(a):
    return abs(a)

# Main program
while True:
    print("\nComplex Number Calculator")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. Modulus")
    print("6. Quit")
    
    choice = int(input("Enter your choice: "))
    
    if choice == 6:
        print("Exiting the complex calculator.")
        break

    real_part_a = float(input("Enter the real part of complex number A: "))
    imag_part_a = float(input("Enter the imaginary part of complex number A: "))
    complex_a = complex(real_part_a, imag_part_a)
    
    if choice != 5:
        real_part_b = float(input("Enter the real part of complex number B: "))
        imag_part_b = float(input("Enter the imaginary part of complex number B: "))
        complex_b = complex(real_part_b, imag_part_b)

    if choice == 1:
        result = add_complex(complex_a, complex_b)
    elif choice == 2:
        result = subtract_complex(complex_a, complex_b)
    elif choice == 3:
        result = multiply_complex(complex_a, complex_b)
    elif choice == 4:
        result = divide_complex(complex_a, complex_b)
    elif choice == 5:
        result = modulus_complex(complex_a)
    else:
        print("Invalid choice. Please enter a valid option.")
        continue

    print("Result: ", result)
