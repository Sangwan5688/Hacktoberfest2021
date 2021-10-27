               Python Program to Reverse String
.python Program to Reverse String using For Loop
This program allows the user to enter a string. Next, this Python reverse string code reverses the string using For Loop.

# Python Program to Reverse String
string = input("Please enter your own String : ")

string2 = ''

for i in string:
    string2 = i + string2
    
print("\nThe Original String = ", string)
print("The Reversed String = ", string2)
Please enter your own String : Python

The Original String =  Python
The Reversed String =  nohtyP
From the above Python reverse a string program screenshot you can observe that, string is Python.

For Loop First Iteration: for i in string
=> for P in Python
string2 = P + string=> P + ”

Second Iteration: for y in Python
string2 = y + P => yP

Do the same for the remaining iterations. Please refer String article to understand the Python Strings

Reverse String using While Loop
This Python string reverse program using while loop is the same as above. However, we just replaced the For Loop with While Loop. Here, len is a string function used to find string length.

# Python Program to Reverse String
string = input("Please enter your own String : ")

string2 = ''
i = len(string) - 1

while(i >= 0):
    string2 = string2 + string[i]
    i = i - 1
    
print("\nThe Original String = ", string)
print("The Reversed String = ", string2))
print("The Given String in Lowercase =  ", string1)
Please enter your own String : Tutorial Gateway

The Original String =  Tutorial Gateway
The Reversed String =  yawetaG lairotuT
String Reverse using Function
It is another way of reversing a string using functions.


# Python Program to Reverse String

def StringReverse(str1):
    str2 = str1[::-1]
    return str2

string = input("Please enter your own String : ")

string2 = StringReverse(string)
print("\nThe Original String = ", string)
print("The Reversed String = ", string2)
Please enter your own String : Hello World!

The Original String =  Hello World!
The Reversed String =  !dlroW olleH
Reverse a String using Recursion
In this reverse string code, we are doing string reverse by calling the function recursively.

# Python Program to Reverse String

def StringReverse(str1):
    if(len(str1) == 0):
        return str1
    else:
        return StringReverse(str1[1:]) + str1[0]

string = input("Please enter your own String : ")

string2 = StringReverse(string)
print("\nThe Original String = ", string)
print("The Reversed String = ", string2)
