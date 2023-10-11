from turtle import Turtle

X_POS = [(0,0), (-20,0), (-40,0)]
MOVE_DISTANCE = 20

class Snake:
    def __init__ (self):
        self.snake = []
        self.create_snake()
        self.head = self.snake[0]

    def create_snake(self):
        for position in X_POS:
            self.add_segment(position)
    
    def add_segment(self, position):
        turtle = Turtle("square")
        turtle.color("white")
        turtle.penup()
        turtle.goto(position)
        self.snake.append(turtle)
    
    def extend_snake(self):
        self.add_segment(self.snake[-1].pos())
    
    def move(self):
        for i in range(len(self.snake)-1, 0, -1):
            new_pos = self.snake[i -1].pos()
            self.snake[i].goto(new_pos)
    
        self.head.fd(MOVE_DISTANCE)

    def up(self):
        if self.head.heading() != 270:
            self.head.seth(90)
    def down(self):
        if self.head.heading() != 90:
            self.head.seth(270)
    def left(self):
        if self.head.heading() != 0:
            self.head.seth(180)
    def right(self):
        if self.head.heading() != 180:
            self.head.seth(0)

    