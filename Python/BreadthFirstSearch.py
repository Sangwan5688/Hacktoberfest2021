#!/usr/bin/env python
# coding: utf-8

# In[5]:


graph = {
    'A' : ['B', 'E', 'F'],
    'B' : ['A', 'F', 'G'],
    'C' : ['D', 'G'],
    'D' : ['C', 'H'],
    'E' : ['A', 'F'],
    'F' : ['A', 'B', 'E'],
    'G' : ['B', 'C', 'H'],
    'H' : ['G', 'D']
}


# In[2]:


visited = []  # List to keep track of visited nodes.
queue = []    #initialize a queue


# In[3]:


def bfs(visited,graph,node):
    visited.append(node)
    queue.append(node)
    
    while queue:
        s = queue.pop(0)
        print(s,end=" ")
        
        for neighbour in graph[s]:
            if neighbour not in visited:
                visited.append(neighbour)
                queue.append(neighbour)


# In[4]:


print("BFS Result : ")
bfs(visited,graph,'A')


# In[ ]:




