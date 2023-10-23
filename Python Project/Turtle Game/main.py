from turtle import Turtle,Screen
import random

is_race_on=False
screen=Screen()
bet_input=screen.textinput(title="Bet the race",prompt="Which color will win the race ?")
screen.screensize(500,400)

colors=["red","green","yellow","violet","blue","black"]
y_positions=[-70,-40,-10,20,50,80]
all_turtules=[]

for i in range(0,6):
    new_turtle=Turtle(shape="turtle")
    new_turtle.color(colors[i])
    new_turtle.up()
    new_turtle.goto(x=-230,y=y_positions[i])
    all_turtules.append(new_turtle)

if bet_input:
    is_race_on=True

while is_race_on:
    for turtle in all_turtules:
        if turtle.xcor() > 230:
            is_race_on=False
            winning_turtle_color = turtle.pencolor()
            if bet_input == winning_turtle_color:
                print(f"You won the {winning_turtle_color} won the race")
            else:
                print(f"You lost the {winning_turtle_color} won the race")
        turtle.forward(random.randint(0,9))


screen.exitonclick()