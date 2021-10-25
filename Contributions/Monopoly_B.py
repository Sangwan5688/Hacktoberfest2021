from ezgraphics import GraphicsWindow
import random
class MonopolyBoard:
   
    def __init__(self, lengthWidth):
        self.size = lengthWidth
        self.win = GraphicsWindow(self.size, self.size)
        self.canvas = self.win.canvas()
        self.canvas.setBackground(191, 219, 174)
       
    def draw(self):

        self.canvas.setOutline("black")
        #first horizontal line
        linebegin = (0, self.size/7)
        lineend = (self.size, self.size/7)
        self.canvas.drawLine(linebegin[0], linebegin[1], lineend[0], lineend[1])      
        #second horizontal line
        linebegin = (0, self.size*6/7)
        lineend = (self.size, self.size*6/7)
        self.canvas.drawLine(linebegin[0], linebegin[1], lineend[0], lineend[1])
        #first vertical line
        linebegin = (self.size/7, 0)
        lineend = (self.size/7, self.size)
        self.canvas.drawLine(linebegin[0], linebegin[1], lineend[0], lineend[1])
        #second vertical line
        linebegin = (self.size*6/7, 0)
        lineend = (self.size*6/7, self.size)
        self.canvas.drawLine(linebegin[0], linebegin[1], lineend[0], lineend[1])
       
        #SPACES
        coord = self.size*(9/63)
        coord1 = coord
        i = 0
        while i < 9:
            #LEFT COLUMN
            linebegin = (0, coord1)
            lineend = (self.size/7, coord1)
            self.canvas.drawLine(linebegin[0], linebegin[1], lineend[0], lineend[1])
            #TOP ROW
            linebegin = (coord1, 0)
            lineend = (coord1, self.size/7)
            self.canvas.drawLine(linebegin[0], linebegin[1], lineend[0], lineend[1])
            #RIGHT COLUMN
            linebegin = (self.size*6/7,coord1)
            lineend = (self.size, coord1)
            self.canvas.drawLine(linebegin[0], linebegin[1], lineend[0], lineend[1])
            #BOTTOM ROW
            linebegin = (coord1,self.size*6/7)
            lineend =  (coord1,self.size)
            self.canvas.drawLine(linebegin[0], linebegin[1], lineend[0], lineend[1])
           
            coord1 = coord1 + (self.size*(5/63))
            i += 1
        #LOGO
        self.canvas.setFill(199, 0, 0)
        self.canvas.drawRectangle(self.size/4,self.size*3/7,self.size/2,self.size/9)
       
        self.canvas.drawText(self.size/2, self.size*5/10, "Monopoly")
       
        #BROWN SPACES
        self.canvas.setFill(139, 69, 19)
        self.canvas.drawRectangle(self.size*3/28,self.size*49/63,self.size/28,self.size*5/63)
        self.canvas.drawRectangle(self.size*3/28,self.size*39/63,self.size/28,self.size*5/63)
        #SKYBLUE SPACES
        self.canvas.setFill(135, 206, 235)
        self.canvas.drawRectangle(self.size*3/28,self.size*9/63,self.size/28,self.size*5/63)
        self.canvas.drawRectangle(self.size*3/28,self.size*14/63,self.size/28,self.size*5/63)
        self.canvas.drawRectangle(self.size*3/28,self.size*24/63,self.size/28,self.size*5/63)
        #MAGENTA SPACES
        self.canvas.setFill(153, 50, 204)
        self.canvas.drawRectangle(self.size*9/63,self.size*3/28,self.size*5/63,self.size/28)
        self.canvas.drawRectangle(self.size*19/63,self.size*3/28,self.size*5/63,self.size/28)
        self.canvas.drawRectangle(self.size*24/63,self.size*3/28,self.size*5/63,self.size/28)
        #ORANGE SPACES
        self.canvas.setFill(255, 88, 0)
        self.canvas.drawRectangle(self.size*34/63,self.size*3/28,self.size*5/63,self.size/28)
        self.canvas.drawRectangle(self.size*44/63,self.size*3/28,self.size*5/63,self.size/28)
        self.canvas.drawRectangle(self.size*49/63,self.size*3/28,self.size*5/63,self.size/28)
        #RED SPACES
        self.canvas.setFill(255, 0, 0)
        self.canvas.drawRectangle(self.size*54/63,self.size*9/63,self.size/28,self.size*5/63)
        self.canvas.drawRectangle(self.size*54/63,self.size*14/63,self.size/28,self.size*5/63)
        self.canvas.drawRectangle(self.size*54/63,self.size*24/63,self.size/28,self.size*5/63)
        #YELLOW SPACES    
        self.canvas.setFill(255, 255, 0)
        self.canvas.drawRectangle(self.size*54/63,self.size*34/63,self.size/28,self.size*5/63)
        self.canvas.drawRectangle(self.size*54/63,self.size*39/63,self.size/28,self.size*5/63)
        self.canvas.drawRectangle(self.size*54/63,self.size*49/63,self.size/28,self.size*5/63)
        #GREEN SPACES
        self.canvas.setFill(0, 230, 30)
        self.canvas.drawRectangle(self.size*34/63,self.size*54/63,self.size*5/63,self.size/28)
        self.canvas.drawRectangle(self.size*44/63,self.size*54/63,self.size*5/63,self.size/28)
        self.canvas.drawRectangle(self.size*49/63,self.size*54/63,self.size*5/63,self.size/28)
        self.canvas.drawText(self.size*35/63,self.size*54/63, "Bond \n street")
        self.canvas.drawText(self.size*45/63,self.size*54/63, "Oxford \n street")
        self.canvas.drawText(self.size*50/63,self.size*54/63, "Regent \n Street")
        #BLUE SPACES
        self.canvas.setFill(0, 0, 250)
        self.canvas.shiftItem("text", 0,90)
        self.canvas.drawRectangle(self.size*9/63,self.size*54/63,self.size*5/63,self.size/28)
        self.canvas.drawRectangle(self.size*19/63,self.size*54/63,self.size*5/63,self.size/28)
        windd = self.canvas.drawText(self.size*9/60,self.size*54/63, "Mayfair")
        self.canvas.drawText(self.size*20/63,self.size*54/63,"Park \n Lane")
        
       
class Player():
   
    def dice(self):
        rolls = []
        for i in range(self):
            two_dice = random.randint(1, 6) + random.randint(1, 6)
            rolls.append(two_dice)
            return i
        print(rolls)
    #def PlayerMoney():
        #return 1
    #def PlayerProperty():
        #return 1

class Bank():
       
    def passGO():
        return 200
    def buyHouse():
        return 1
    def buyHotel():
        return 4
   
class ChanceCard():
   
    def pickChance():
        return 1

class CommunityChestCard():
   
    def pickCommunityChest():
        return 1
   
newBoard = MonopolyBoard(700)
newBoard.draw()
Player.dice(1)
