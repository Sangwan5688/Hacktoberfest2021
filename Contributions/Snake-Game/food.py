from turtle import Turtle
import random

class Food(Turtle):
    def __init__(self):
        super().__init__()
        self.shape("circle")
        self.penup()
        self.shapesize(0.5,0.5)
        self.color("red")
        self.speed("fastest")
        self.relocate()
    
    def relocate(self):
        self.goto(random.randint(-273, 273),random.randint(-273, 273))