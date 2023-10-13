from typing import Any


class stack:
    def __init__(self, *args: Any, **kwds: Any) -> Any:
        pass
    # Stack implementation in python


    # Creating a stack
    def create_stack(self):
        stack = []
        return stack


    # Creating an empty stack
    def check_empty(self,stack):
        return len(stack) == 0


    # Adding items into the stack
    def push(self,stack, item):
        stack.append(item)
        print("pushed item: " + item)


    # Removing an element from the stack
    def pop(self,stack):
        if (self.check_empty(stack)):
            return "stack is empty"

        return stack.pop()


    