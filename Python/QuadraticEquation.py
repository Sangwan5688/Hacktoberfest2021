import cmath

#featching varibles
a = int(input("Enter coefficients of x^2 : "))
b = int(input("Enter coefficients of x : "))
c = int(input("Enter constant : "))

# calculate the discriminant
d = (b**2) - (4*a*c)

# find two solutions
sol1 = (-b-cmath.sqrt(d))/(2*a)
sol2 = (-b+cmath.sqrt(d))/(2*a)

print('The solution are {0} and {1}'.format(sol1,sol2))
