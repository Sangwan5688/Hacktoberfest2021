from turtle import Turtle
BORDER = 270

class Boundry(Turtle):
    def __init__(self):
        super().__init__()
        self.ht()
        self.penup()
        self.color("green")
        self.goto(BORDER, BORDER)
        self.draw_boundry()

    def draw_boundry(self):
        self.pendown()
        self.goto(-BORDER, BORDER)
        self.goto(-BORDER, -BORDER)
        self.goto(BORDER, -BORDER)
        self.goto(BORDER, BORDER)