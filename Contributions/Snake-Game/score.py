from turtle import Turtle, position
with open(file="data.txt") as data:
    highscore = data.read()

class Score(Turtle):
    def __init__(self):
        super().__init__()
        self.score = 0
        self.highscore = int(highscore)
        self.ht()
        self.penup()
        self.color("white")
        self.goto(0,280)
        self.write(f"Score: {self.score} | High Score: {self.highscore}", move=True, align="center", font=("Arial", 12, "bold"))
    
    def points(self):
        self.clear()
        self.goto(0,280)
        self.write(f"Score: {self.score} | High Score: {self.highscore}", move=True, align="center", font=("Arial", 12, "bold"))
    
    def add_points(self):
        self.score += 1
        self.points()
    
    def set_highscore(self):
        if self.score > self.highscore:
            self.highscore = self.score
            with open(file="data.txt", mode="w") as data:
                data.write(str(self.highscore))
        self.points()
        self.score = 0

    def game_over(self):
        self.goto(0, 0)
        self.write("Game Over", move=True, align="center", font=("Arial", 12, "bold"))