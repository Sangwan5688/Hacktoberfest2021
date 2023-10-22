import random

class Pacman:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.direction = None

    def move(self):
        if self.direction == "up":
            self.y -= 1
        elif self.direction == "down":
            self.y += 1
        elif self.direction == "left":
            self.x -= 1
        elif self.direction == "right":
            self.x += 1

    def eat(self, dot):
        dot.eaten = True

class Dot:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.eaten = False

class Ghost:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.direction = None

    def move(self):
        # Choose a random direction
        self.direction = random.choice(["up", "down", "left", "right"])

        # If the direction is blocked, choose a new one
        while not self.can_move(self.direction):
            self.direction = random.choice(["up", "down", "left", "right"])

        # Move in the chosen direction
        if self.direction == "up":
            self.y -= 1
        elif self.direction == "down":
            self.y += 1
        elif self.direction == "left":
            self.x -= 1
        elif self.direction == "right":
            self.x += 1

    def can_move(self, direction):
        # Check if the ghost is at the edge of the maze
        if direction == "up" and self.y == 0:
            return False
        elif direction == "down" and self.y == len(maze) - 1:
            return False
        elif direction == "left" and self.x == 0:
            return False
        elif direction == "right" and self.x == len(maze[0]) - 1:
            return False

        # Check if the ghost is blocked by a wall
        if maze[self.y][self.x][direction] == "wall":
            return False

        return True

# Create the maze
maze = [
    ["wall", "wall", "wall", "wall", "wall"],
    ["wall", "dot", "dot", "dot", "wall"],
    ["wall", "dot", "dot", "dot", "wall"],
    ["wall", "dot", "dot", "dot", "wall"],
    ["wall", "wall", "wall", "wall", "wall"],
]

# Create Pac-Man
pacman = Pacman(1, 1)

# Create the ghosts
ghosts = [
    Ghost(3, 3),
    Ghost(4, 3),
]

# Start the game loop
while True:

    # Move Pac-Man
    pacman.move()

    # Eat any dots that Pac-Man is on
    if maze[pacman.y][pacman.x][pacman.direction] == "dot":
        pacman.eat(dots[pacman.y][pacman.x])

    # Move the ghosts
    for ghost in ghosts:
        ghost.move()

    # Check if Pac-Man has collided with a ghost
    for ghost in ghosts:
        if pacman.x == ghost.x and pacman.y == ghost.y:
            # Pac-Man dies
            break

    # Check if Pac-Man has eaten all of the dots
    if all(dot.eaten for dot in dots):
        # Pac-Man wins the game
        break

# Game over
