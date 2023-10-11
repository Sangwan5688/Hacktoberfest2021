import string
import random
from typing import List 

if __name__ == "__main__":
   
    s1 = string.ascii_lowercase
    s2 = string.ascii_uppercase
    s3 = string.digits
    s4 = string.punctuation
   
    plen = int(input("Enter password length\n"))
   
    s = []
    s.extend(list(s1))
    s.extend(list(s2))
    s.extend(list(s3))
    s.extend(list(s4))
   
    random.shuffle(s)
   
    print("Your password is: ")
    print("".join(s[0:plen]))

