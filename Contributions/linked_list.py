class Node:
  def __init__(self, data = None, next=None): 
    self.data = data
    self.next = next

class LinkedList:
  def __init__(self):  
    self.head = None
  
  def insert(self, data):
    newNode = Node(data)
    if(self.head):
      current = self.head
      while(current.next):
        current = current.next
      current.next = newNode
    else:
      self.head = newNode
  
  def print(self):
    current = self.head
    while(current):
      print(current.data)
      current = current.next

LL = LinkedList()
LL.insert(2)
LL.insert(5)
LL.insert(1)
LL.print()