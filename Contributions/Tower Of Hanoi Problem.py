#!/usr/bin/env python
# coding: utf-8

# In[1]:


def TowerOfHanoi(n , source, destination, auxiliary): 
    if n==1: 
        print ("Move disk 1 from source",source,"to destination",destination) 
        return
    TowerOfHanoi(n-1, source, auxiliary, destination) 
    print ("Move disk",n,"from source",source,"to destination",destination) 
    TowerOfHanoi(n-1, auxiliary, destination, source) 


# In[2]:


n = int(input("Enter number of Disks:"))
TowerOfHanoi(n,'A','B','C') 

