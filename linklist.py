


#create node contain two fields data and next field
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkList :
    def __init__(self, data):
        pass

    #insertion operation at begning of linklist
    def insertAtBegin(self, data):
        new_node = Node(data) #create new node
        if self.head is None:  #if linklist is empty then create new node as head
            self.head = new_node
            return
        else:                       #otherwise create new node as head and  its nest as its previes head
            new_node.next = self.head
            self.head = new_node




    def inserAtEnd(self, data): 
        new_node = Node(data) #create new node
        if self.head is None:
            self.head = new_node
            return
    
        current_node = self.head    #assign current node as head for some time
        while(current_node.next):   #loop for traverse from linklist upto node.nest equal to null
            current_node = current_node.next 
    
        current_node.next = new_node         #then assign next as new node


        

    def updateNode(self, val, index):
        current_node = self.head
        position = 0
        if position == index:
            current_node.data = val
        else:
            while(current_node != None and position != index):
                position = position+1
                current_node = current_node.next
    
            if current_node != None:
                current_node.data = val
            else:

                print("Index not present")



    def remove_first_node(self):
        if(self.head == None):
            return
        
        self.head = self.head.next


    def remove_last_node(self):
    
        if self.head is None:
            return
    
        current_node = self.head
        while(current_node.next.next):
            current_node = current_node.next
    
        current_node.next = None



    def remove_at_index(self, index):
            if self.head == None:
                return
    
            current_node = self.head
            position = 0
            if position == index:
                self.remove_first_node()
            else:
                while(current_node != None and position+1 != index):
                    position = position+1
                    current_node = current_node.next
    
                if current_node != None:
                    current_node.next = current_node.next.next
                else:
                    print("Index not present")

    def remove_node(self, data):
        current_node = self.head
    
        while(current_node != None and current_node.next.data != data):
            current_node = current_node.next
    
        if current_node == None:
            return
        else:
            current_node.next = current_node.next.next

    def printLL(self):
        current_node = self.head
        while(current_node):
            print(current_node.data)
            current_node = current_node.next