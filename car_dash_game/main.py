import pygame
import random
import sys
import tkinter as tk
from tkinter import messagebox

# Initialize Pygame
pygame.init()

# Game settings
SCREEN_WIDTH, SCREEN_HEIGHT = 350, 600
FPS = 60

# Colors
GRAY = (192, 192, 192)
RED = (255, 0, 0)

# Load car and truck images
car_image = pygame.image.load("car.png")  # Update "car.png" with your car image file name
car_image = pygame.transform.scale(car_image, (50, 70))

truck_image = pygame.image.load("truck.png")  # Update "truck.png" with your truck image file name
truck_image = pygame.transform.scale(truck_image, (70, 90))

# Create the game window
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Car Dash")

# Game variables
clock = pygame.time.Clock()
running = True

# Player variables (car position)
player_x = SCREEN_WIDTH // 2 - car_image.get_width() // 2
player_y = SCREEN_HEIGHT - car_image.get_height()
player_speed = 5

# Obstacle variables
obstacle_width = 50
obstacle_height = 50
obstacle_x = random.randint(0, SCREEN_WIDTH - obstacle_width)
obstacle_y = -obstacle_height
obstacle_speed = 5

# Scoring variables
score = 0

# Main game loop
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Handle player movements
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player_x -= player_speed
    if keys[pygame.K_RIGHT]:
        player_x += player_speed

    # Prevent the car from moving outside the window
    if player_x < 0:
        player_x = 0
    elif player_x > SCREEN_WIDTH - car_image.get_width():
        player_x = SCREEN_WIDTH - car_image.get_width()

    # Move obstacle
    obstacle_y += obstacle_speed

    # Increment score regardless of direction
    score += abs(player_speed)

    # Check for collision
    if obstacle_y > SCREEN_HEIGHT:
        obstacle_x = random.randint(0, SCREEN_WIDTH - obstacle_width)
        obstacle_y = -obstacle_height

    # Check for collision with truck
    car_rect = pygame.Rect(player_x, player_y, car_image.get_width(), car_image.get_height())
    truck_rect = pygame.Rect(obstacle_x, obstacle_y, obstacle_width, obstacle_height)
    if car_rect.colliderect(truck_rect):
        # Handle collision here (e.g., end the game, decrease player health, etc.)
        print("Game Over")
        pygame.quit()
        choice = messagebox.askyesno("Game Over", f"Your Score: {score}\nDo you want to continue?")
        if choice:
            pygame.init()
            screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
            pygame.display.set_caption("Car Dash")
            clock = pygame.time.Clock()
            running = True
            player_x = SCREEN_WIDTH // 2 - car_image.get_width() // 2
            player_y = SCREEN_HEIGHT - car_image.get_height()
            obstacle_x = random.randint(0, SCREEN_WIDTH - obstacle_width)
            obstacle_y = -obstacle_height
            score = 0
            continue
        else:
            sys.exit()

    # Draw everything on the screen
    screen.fill(GRAY)

    screen.blit(car_image, (player_x, player_y))
    if obstacle_y < SCREEN_HEIGHT:
        screen.blit(truck_image, (obstacle_x, obstacle_y))

    # Display the score on the screen
    font = pygame.font.SysFont(None, 40)
    score_text = font.render("Score: " + str(score), True, RED)
    screen.blit(score_text, (10, 10))

    pygame.display.update()

    # Control the frame rate
    clock.tick(FPS)

# Quit Pygame
pygame.quit()
