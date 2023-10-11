# Hacktoberfest 2021
# Problem: House Prices
# 
# You are given an array that represents house prices.
# Calculate and output the percentage of houses that are within one standard deviation from the mean.
# To calculate the percentage, divide the number of houses that satisfy the condition by the total number of houses, and multiply the result by 100.

import numpy as np

data = np.array([150000, 125000, 320000, 540000, 200000, 120000, 160000, 230000, 280000, 290000, 300000, 500000, 420000, 100000, 150000, 280000])

m = np.mean(data)
d = np.std(data)
y1 = m-d
y2 = m+d
s = len(data [(data > y1) & (data < y2)])
r = (s/len(data))*100
print(r)