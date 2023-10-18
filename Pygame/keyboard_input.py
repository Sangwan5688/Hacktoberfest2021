import pygame
from sys import exit

def display_score():
    current_time = int(pygame.time.get_ticks() / 1000) - start_time
    score_surf = test_font.render(f'Score: {current_time}',False,'Black')
    score_rect = score_surf.get_rect(center=(400,50))
    screen.blit(score_surf,score_rect)
    # print(current_time)

pygame.init()

screen = pygame.display.set_mode((800,400))

pygame.display.set_caption("First game"); 
clock = pygame.time.Clock()

sky_surface = pygame.image.load('graphics/Sky.png').convert_alpha()
ground_surface = pygame.image.load('graphics/ground.png').convert_alpha()

test_font = pygame.font.Font('font/Pixeltype.ttf',50)   

game_active = False
start_time = 0;

# score_surface = test_font.render('Start Game',True, (64,64,64)) #The 3 parameters are text, anti-aliasing, color
# score_rect = score_surface.get_rect(center=(400,200))
# test_surface.fill('Red')

snail_surface = pygame.image.load('graphics/snail/snail1.png').convert_alpha()
snail_rect = snail_surface.get_rect(midbottom=(600,250))

player_surf = pygame.image.load('graphics/Player/player_walk_1.png').convert_alpha()
player_rect = player_surf.get_rect(midbottom=(80,250))
player_gravity = 0

while True:

    for event in pygame.event.get():
        if event.type == pygame.QUIT: #checks for close button to be pressed
            pygame.quit()
            exit()
        
        if game_active:    
            if event.type == pygame.MOUSEBUTTONDOWN:
                if player_rect.collidepoint(event.pos):
                    player_gravity = -20
            
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and player_rect.bottom >= 250:
                    print('jump')
                    player_gravity = -20
        else:
            if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                game_active = True
                snail_rect.x = 800
                start_time = int(pygame.time.get_ticks()/1000)
            
    if game_active:


        screen.blit(sky_surface,(0,0))
        screen.blit(ground_surface,(0,250))
        # pygame.draw.rect(screen,'#c0e8ec',score_rect,width=6)
        # pygame.draw.rect(screen,'#c0e8ec',score_rect)
        # pygame.draw.line(screen,'Blue',(0,0),pygame.mouse.get_pos()) #it is a cool line that follows the mouse
        # pygame.draw.ellipse(screen,'Brown',pygame.Rect(50,200,100,100))
        # screen.blit(score_surface,score_rect)
        
        
        #This is the player being rendered
        screen.blit(player_surf,player_rect)
        player_gravity += 1
        player_rect.y += player_gravity
        


        #fall prevention logic
        if player_rect.bottom >= 250: player_rect.bottom = 250
        



        screen.blit(snail_surface,snail_rect)
        snail_rect.x -= 2
        if snail_rect.right <= 0:
            snail_rect.left = 800
        else:
            pass
            # print(0)

        # if(player_rect.colliderect(snail_rect)):
        #     print("coll")

        # mousepos = pygame.mouse.get_pos()
        # if player_rect.collidepoint((mousepos)):
            # print ('Collission')
            # print(pygame.mouse.get_pressed())
            # pass

        # keys = pygame.key.get_pressed()
        # if keys[pygame.K_SPACE]:
        #     print ("jump")

        #collission logic

        display_score()

        if snail_rect.colliderect(player_rect):
            game_active = False
    
    else:
        screen.fill((94,129,162))

    pygame.display.update()
    clock.tick(60)