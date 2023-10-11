
#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'countSwaps' function below.
#
# The function accepts INTEGER_ARRAY a as parameter.
#

def countSwaps(a):
    counter = 0
    for i in range(len(a)):
        for j in range(len(a)):
            if a[j] < a[i]:
                temp = a[j]
                a[j] = a[i]
                a[i] = temp
                counter += 1
    print( f"Array is sorted in {counter}\n" + f"first Element: {a[0]}\n" + f"Last Element {a[-1]}")


if __name__ == '__main__':
    n = int(input().strip())

    a = list(map(int, input().rstrip().split()))

    countSwaps(a)