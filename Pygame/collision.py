import pygame
from sys import exit

pygame.init()

screen = pygame.display.set_mode((800,400))

pygame.display.set_caption("First game"); 
clock = pygame.time.Clock()

sky_surface = pygame.image.load('graphics/Sky.png').convert_alpha()
ground_surface = pygame.image.load('graphics/ground.png').convert_alpha()

test_font = pygame.font.Font('font/Pixeltype.ttf',50)
text_surface = test_font.render('START',True, 'Black') #The 3 parameters are text, anti-aliasing, color
# test_surface.fill('Red')

snail_surface = pygame.image.load('graphics/snail/snail1.png').convert_alpha()
snail_rect = snail_surface.get_rect(midbottom=(600,250))

player_surf = pygame.image.load('graphics/Player/player_walk_1.png').convert_alpha()
player_rect = player_surf.get_rect(midbottom=(80,250))

while True:

    for event in pygame.event.get():
        if event.type == pygame.QUIT: #checks for close button to be pressed
            pygame.quit()
            exit()
        
        if event.type == pygame.MOUSEMOTION:
            print(event.pos)
    
    screen.blit(sky_surface,(0,0))
    screen.blit(ground_surface,(0,250))
    screen.blit(text_surface,(400,200))
    screen.blit(snail_surface,snail_rect)
    screen.blit(player_surf,player_rect)

    snail_rect.x -= 2;

    if snail_rect.right <= 0:
        snail_rect.left = 800
    else:
        pass
        # print(0)


    # if(player_rect.colliderect(snail_rect)):
    #     print("coll")


    mousepos = pygame.mouse.get_pos()
    if player_rect.collidepoint((mousepos)):
        # print ('Collission')
        print(pygame.mouse.get_pressed())

    pygame.display.update()
    clock.tick(60)