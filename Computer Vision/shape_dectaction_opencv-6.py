import cv2 as cv
import numpy as np

def getcontours(img):
    contours,hierachy=cv.findContours(img,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_NONE)
    for cnt in contours:
        area=cv.contourArea(cnt)
        if area >100:
            print(area)
            cv.drawContours(imgcontuor,cnt,-1,(255,0,0),3)
            per1=cv.arcLength(cnt,True)
            print(per1)
            approx=cv.approxPolyDP(cnt,0.04*per1,True)
            
            print(len(approx))
            objcorn=len(approx)
            x, y, w, h = cv.boundingRect(approx)
            
            
            if objcorn==4:objtype="rectangle"
            elif objcorn==4:
                aspect=w/float(h)
                if aspect >0.95 and aspect<1.05:objtype="square"
                else:objtype="rectangle"

            

            else:objtype='none'   
            cv.rectangle(imgcontuor,(x,y),(x+w,y+h),(0,255,1),2)
            cv.putText(imgcontuor,objtype,(x+(w//2)-10,y+(h//2)-10),cv.FONT_HERSHEY_COMPLEX,0.5,(0,0,0),2)

                


img=cv.imread("geometric-shape-names-types-definitions.png")
#img=cv.resize(img,(400,600))
imgcontuor=img.copy()
imgray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
imgblur=cv.GaussianBlur(imgray,(7,7),1)
imgcanny=cv.Canny(img,50,50)
getcontours(imgcanny)

#cv.imshow('imgcanny',imgcanny)
cv.imshow('img',imgcontuor)
#cv.imshow('imgray',imgray)
cv.waitKey(0)