a = []
c = []
n1 = int(input("Enter number of elements : "))
for i in range(0,n1):
  b = int(input("Enter element : "))
  a.append(b)
n2 = int(input("Enter number of elements : "))
for i in range(0,n2):
  d = int(input("Enter element : "))
  c.append(d)
new = a+c
new.sort()
print("New list is : ", new)