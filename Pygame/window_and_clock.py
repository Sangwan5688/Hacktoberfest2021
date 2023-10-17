import pygame
from sys import exit

pygame.init()

win = pygame.display.set_mode((800,400))

pygame.display.set_caption("First game"); 
clock = pygame.time.Clock()

while True:

    for event in pygame.event.get():
        if event.type == pygame.QUIT: #checks for close button to be pressed
            pygame.quit()
            exit()
    pygame.display.update()
    clock.tick(60)