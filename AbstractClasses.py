import abc
class parent:      
    def geeks(self):
        pass
class child(parent):
    def geeks(self):
        print("child class")
print( issubclass(child, parent))
print( isinstance(child(), parent))
