# python program to find how many digit in given integer numbers e.g. 123->3 , 737327->6 digit first we take log of base 10 then add 1.

from math import log,floor
print(floor(log(int(input()),10)+1))
