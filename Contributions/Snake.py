import turtle
import time
import random

delay=0.1

score=0
high_score=0

wn=turtle.Screen()
wn.title("Snake Game by Anurag Vij")
wn.bgcolor("green")
wn.setup(width=600,height=650)
wn.tracer(0)

head=turtle.Turtle()
head.speed(0)
head.shape("turtle")
head.color("black")
head.penup()
head.goto(0,0)
head.direction="stop"

t=turtle.Turtle()
t.color("black")
t.speed(100)
t.hideturtle()
t.penup()
t.setpos(-290,290)
t.pendown()
for _ in range(4):
    t.forward(580)
    t.right(90)


food=turtle.Turtle()
food.speed(0)
food.shape("circle")
food.color("red")
food.penup()
food.goto(random.randint(-280,280),random.randint(-280,280))

segments=[]

pen=turtle.Turtle()
pen.speed(0)
pen.shape("square")
pen.color("white")
pen.penup()
pen.hideturtle()
pen.goto(0,290)
pen.write("Score: 0 Hight Score: 0",align="center",font=("Courier",24,"normal"))

pen2=turtle.Turtle()
pen2.speed(0)
pen2.shape("square")
pen2.color("black")
pen2.penup()
pen2.hideturtle()
pen2.goto(0,0)

def go_up():
    if head.direction != "down":
        head.direction="up"

def go_down():
    if head.direction != "up":
        head.direction="down"

def go_left():
    if head.direction != "right":
        head.direction="left"

def go_right():
    if head.direction != "left":
        head.direction="right"

def move():
    if head.direction=="up":
        y=head.ycor()
        head.sety(y+20)

    if head.direction=="down":
        y=head.ycor()
        head.sety(y-20)

    if head.direction=="left":
        x=head.xcor()
        head.setx(x-20)

    if head.direction=="right":
        x=head.xcor()
        head.setx(x+20)

wn.listen()
wn.onkeypress(go_up,"Up")
wn.onkeypress(go_down,"Down")
wn.onkeypress(go_left,"Left")
wn.onkeypress(go_right,"Right")

while True:
    wn.update()

    if head.xcor()>290 or head.xcor()<-290 or head.ycor()>290 or head.ycor()<-290:
        time.sleep(1)
        head.goto(0,0)
        head.direction="stop"

        for segment in segments:
            segment.goto(1000,1000)

        segments.clear()

        score=0

        delay=0.1

        pen.clear()
        pen.write("Score: {} High Score: {}".format(score,high_score),align="center",font=("Courier",24,"normal"))
        pen2.write("GAMEOVER",align="center",font=("Courier",80,"bold","normal"))
        time.sleep(2)
        pen2.clear()

    if head.distance(food)<20:
        x=random.randint(-280,280)
        y=random.randint(-280,280)
        food.goto(x,y)

        new_segment=turtle.Turtle()
        new_segment.speed(0)
        new_segment.shape("circle")
        new_segment.color("black")
        new_segment.penup()
        segments.append(new_segment)

        delay-=0.001

        score +=10

        if score>high_score:
            high_score=score
            
        pen.clear()
        pen.write("Score: {} High Score: {}".format(score,high_score),align="center",font=("Courier",24,"normal"))

    for index in range(len(segments)-1,0,-1):
        x=segments[index-1].xcor()
        y=segments[index-1].ycor()
        segments[index].goto(x,y)

    if len(segments)>0:
        x=head.xcor()
        y=head.ycor()
        segments[0].goto(x,y)

    move()

    for segment in segments:
        if segment.distance(head)<20:
            time.sleep(1)
            head.goto(0,0)
            head.direction="stop"

            for segment in segments:
                segment.goto(1000,1000)

            segments.clear()
            score=0

            delay=0.1

            pen.clear()
            pen.write("Score: {} High Score: {}".format(score,high_score),align="center",font=("Courier",24,"normal"))
            pen2.write("GAMEOVER",align="center",font=("Courier",80,"bold","normal"))
            food.clear()
            time.sleep(2)
            pen2.clear()
    time.sleep(delay)
    


wn.mainloop()
