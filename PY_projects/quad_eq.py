# Python Program to find roots of a Quadratic Equation
# Solve the quadratic equation ax**2 + bx + c = 0


import math  # import complex math module


def findRoots(a, b, c):
    """
    If a is 0 then equation is not quadratic but linear,
    So if user enters value of a as zero then its invalid.
    """
    if a == 0:
        print("Invalid")
        return -1
    discriminant = (b * b) - (4 * a * c)      # calculating value of discriminant
    """
    Now below we check for various condition, i.e
    Is discriminant greater than, equals to or less than 0.
    Each condition has its own different roots.
    """
    if(discriminant > 0):
        root_1 = (-b + math.sqrt(discriminant) / (2 * a))
        root_2 = (-b - math.sqrt(discriminant) / (2 * a))
        print("Two Distinct Real Roots Exists: ")
        print("root1 = %.2f and root2 = %.2f" % (root_1, root_2))
    elif(discriminant == 0):
        root_1 = root_2 = -b / (2 * a)
        print("Two Equal and Real Roots Exists: ")
        print("root1 = %.2f and root2 = %.2f" % (root_1, root_2))
    elif(discriminant < 0):
        root_1 = root_2 = -b / (2 * a)
        imaginary = math.sqrt(-discriminant) / (2 * a)
        print("Two Distinct Complex Roots Exists: ")
        print("r1=%.2f+%.2f and r2=%.2f-%.2f" % (root_1, imaginary, root_2, imaginary))

# Main Program
if __name__ == "__main__":
  a = float(input("Please Enter a Value of a Quadratic Equation : "))
  b = float(input("Please Enter b Value of a Quadratic Equation : "))
  c = float(input("Please Enter c Value of a Quadratic Equation : "))
  
  print(findRoots(a, b, c))
