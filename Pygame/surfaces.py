import pygame
from sys import exit

pygame.init()

screen = pygame.display.set_mode((800,400))

pygame.display.set_caption("First game"); 
clock = pygame.time.Clock()

sky_surface = pygame.image.load('graphics/Sky.png')
ground_surface = pygame.image.load('graphics/ground.png')

test_font = pygame.font.Font('font/Pixeltype.ttf',50)
text_surface = test_font.render('START',True, 'Black') #The 3 parameters are text, anti-aliasing, color
# test_surface.fill('Red')
while True:

    for event in pygame.event.get():
        if event.type == pygame.QUIT: #checks for close button to be pressed
            pygame.quit()
            exit()
    
    screen.blit(sky_surface,(0,0))
    screen.blit(ground_surface,(0,250))
    screen.blit(text_surface,(400,200))

    pygame.display.update()
    clock.tick(60)