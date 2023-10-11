def pySandglass(rows, ch):
    for i in range(0, rows):
        for j in range(0, i):
            print(end = ' ')
        for k in range(i, rows):
            print('%c' %ch, end = ' ')               
        print()

    for i in range(rows - 1, -1, -1):
        for j in range(0, i):
            print(end = ' ')
        for k in range(i, rows):
            print('%c' %ch, end = ' ')     
        print()
    
rows = int(input("Enter Sandglass Pattern Rows = "))

ch = input("Symbol to use in Sandglass Pattern = " )

print("====Sandglass Pattern====")
pySandglass(rows, ch)
