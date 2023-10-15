from delphifmx import *
import pandas as pd 
import numpy as np
import os 
import cv2 as cv 
import uuid


class frmMain(Form):
    def __init__(self, owner):
        self.display=np.zeros((500,500))
        self.Width = 500
        self.Height = 500
        self.start=0
        self.mos_X=0
        self.mos_Y=0
        self.X=0
        self.Y=0
        self.text_arr=[]
        self.Ev_X=1
        self.Ev_Y=1
        self.fol=None
        self.Caption = "Mouse Position: <X, Y>"

        self.onMouseMove = self.FormMouseMoveEvent
        self.OnMouseDown = self.MouseEvent


    def MouseEvent(self,Object, MouseButton, ShiftState,X,Y):
        if self.text_arr==[]:
            self.start=1 # start
           
        elif self.text_arr!=[]:
            self.start=0 #off
            #print(self.display)
            #img=cv.imread(self.display)
            #imagename=os.path.join(f"data\English\{uuid.uuid1()}.jpg")
            #print(imagename)
            
                
            #print(f"defalt {self.fol}")
            cv.imwrite(f"data\English\A\{uuid.uuid1()}.jpg",np.array(self.display,dtype='uint8'))

            
        self.Ev_X=X
        self.Ev_Y=Y
        self.mos_X=self.X
        self.mos_Y=self.Y

        #self.display=np.zeros((500,500))
        

    def FormMouseMoveEvent(self, sender, Shift, X, Y):
        self.Caption = "Mouse Position: <" + str(X) + ", " + str(Y) + ">"
        self.X=X
        self.Y=Y
        for i in range(1,8):
            for j in range(1,8):
                self.display[int(Y)+j*2][int(X)+i*2]=255
        
        
        if self.Ev_X==self.mos_X and self.Ev_Y==self.mos_Y:
            
            self.mos_X=0
            self.mos_Y=0
            self.text_arr=[]
            self.Ev_X=1
            self.Ev_Y=1
            self.display=np.zeros((500,500))
            
        else:
            if self.start==1:
                self.text_arr.append([self.X,self.Y])

        
        
    
    
    

def Create_Screen():

    Application.Initialize()
    Application.Title = "My Application"
    Application.MainForm = frmMain(Application)
    Application.MainForm.Show()
    Application.Run()
    Application.MainForm.Destroy()



    
     


Create_Screen()