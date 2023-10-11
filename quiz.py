#Program of a quiz.
print("Make sure to use capital letters before nouns.")
b=input("Who is the prime minister of India?: ")
m=0
a="Narendra Modi"
if b==a:
        print("Correct")
        m=m+1
else:
     print("Incorrect")
     m=m-1
 
n=input("President of India: ")            
c="Ramnath Kovind"
if n==c : 
  print("Correct")
  n=m+1
else : 
  print("Incorrect")
  n=m-1
print("Your mark out of 2 is ",n)
