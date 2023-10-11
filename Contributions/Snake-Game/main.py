from turtle import Screen
import time
from snake import Snake
from food import Food
from score import Score
from boundry import Boundry

BOUNDRY = 279

screen = Screen()
screen.setup(600, 600)
screen.bgcolor("black")
screen.title("Snake Game")

screen.tracer(0)

boundry = Boundry()
snake = Snake()
food = Food()
score = Score()

game_is_on = True

screen.listen()
screen.onkey(snake.up, "Up")
screen.onkey(snake.down, "Down")
screen.onkey(snake.left, "Left")
screen.onkey(snake.right, "Right")

while game_is_on:
    screen.update()
    time.sleep(0.1)
    
    snake.move()

    # detecting collision with food
    if snake.head.distance(food) < 15:
        food.relocate()
        snake.extend_snake()
        score.add_points()

    # detecting collision with the wall
    if snake.head.xcor() > BOUNDRY or snake.head.ycor() > BOUNDRY or snake.head.xcor() < -BOUNDRY or snake.head.ycor() < -BOUNDRY:
        # print("Collison")
        game_is_on = False
        score.set_highscore()
        # print(snake.head.ycor())
        score.game_over()
    
    # detecting collision with the tail
    for segment in snake.snake[1:]:
        if snake.head.distance(segment) < 10:
            game_is_on = False
            score.set_highscore()
            # print(snake.head.ycor()) ###
            score.game_over()


screen.exitonclick()