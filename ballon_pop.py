from turtle import *

#Diameter-initial diameter when screen is on for the first time
#Pop_diameter: Diameter when the ballon is popped

diameter = 20
pop_diameter = 100
color_list = ["red", "black", "blue", "yellow", "green"] #Circularly rotated
cur_color_index = 0


#Function to create the balloon
def draw_ballon_func():
    color(color_list[cur_color_index])
    dot(diameter)


#Function to change the color of the balloon
def change_color():
    global cur_color_index
    global diameter
    cur_color_index += 1 #On right arrow key clicking, color changes
    cur_color_index = cur_color_index % 5
    color(color_list[cur_color_index])
    dot(diameter)


#Function to inflate the balloon
def inflate_balloon():
    write("")
    global diameter
    diameter += 10
    draw_ballon_func()

    if diameter > pop_diameter:
        clear()
        diameter = 20
        write("POP!")


def deflate_balloon():
    global diameter
    diameter -= 10
    draw_ballon_func()


draw_ballon_func()
onkey(inflate_balloon, 'Up')
onkey(deflate_balloon, 'Down')
onkey(change_color, 'Right')
listen()
mainloop()
