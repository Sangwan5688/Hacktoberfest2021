#user input of the numbers to be added
num_list= list(map(str,input().split()))
summ=0 #initializing the sum with 0
for i in range(0,len(num_list)):
    #adding each number after converting from string to integer
    summ+=int(num_list[i]) 
#printing the output
print("Sum of the numbers=",summ) 