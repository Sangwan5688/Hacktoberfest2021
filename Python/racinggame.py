import random
import pygame
pygame.init()
import tsk

print("Player 1, use the UP ARROW to move your snail forward (it's red).")

print("Player 2, use the W KEY to move your snail forward (it's blue).")
w=pygame.display.set_mode([300,600])
w.fill((0,0,0))
snail_1_y=550
snail_1=pygame.Rect(50,snail_1_y,40,50)
pygame.draw.ellipse(w, (255,0,0), snail_1)
snail_2_y=550
snail_2=pygame.Rect(200, snail_2_y, 40, 50)
pygame.draw.ellipse(w, (0,0,255), snail_2)



animating=True
while animating:

    
    for event in pygame.event.get():
        if event.type==pygame.QUIT:
            animating=False
            
        if tsk.get_key_pressed(pygame.K_w):
            snail_1_y-=3
            snail_1=pygame.Rect(50,snail_1_y,40,50)

            pygame.draw.ellipse(w, (255,0,0), snail_1)
            
            
            
            
            
        if tsk.get_key_pressed(pygame.K_UP):
            snail_2_y-=3
            snail_2=pygame.Rect(200, snail_2_y, 40, 50)

            pygame.draw.ellipse(w, (0,0,255), snail_2)
            
    
    
    pygame.time.wait(10)      
    pygame.display.flip()
    
    if snail_1_y<=1:
        print("Snail 1 wins!")
        animating=False
        
    if snail_2_y<=1:
        print("Snail 2 wins!")
        animating=False

            
