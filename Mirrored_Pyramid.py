rows = 6

for row in range(1, rows):

    num = 1

    for j in range(rows, 0, -1):

        if j > row:

            print(” “, end=’ ‘)

        else:

            print(num, end=’ ‘)

            num += 1

    print(“”)
