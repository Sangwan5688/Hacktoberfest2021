import cv2 as cv 
import numpy as np

framew=600
frameh=400
wimg=framew
himg=frameh
cap=cv.VideoCapture(0)
cap.set(3,framew)
cap.set(4,frameh)


def preprocessing(img):
    imgray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
    imgblure=cv.GaussianBlur(img,(7,7),1)
    imgcanny=cv.Canny(imgblure,200,200)
    kernel=np.ones((5,5))
    dilation=cv.dilate(imgcanny,kernel,iterations=2)
    imgther=cv.erode(dilation,kernel,iterations=1)

    return imgther


def getcontours(img):
    biggest=np.array([[0,0],[0,0],[0,0],[0,0]])
    maxarea=0
    contours,hierachy=cv.findContours(img,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_NONE)
    x,y,w,h=0,0,0,0
    print(contours)
    for cnt in contours:
        area=cv.contourArea(cnt)
        
        

        if area >500:
            cv.drawContours(imgcount,cnt,-1,(0,255,0),3)
            
            per1=cv.arcLength(cnt,True)
            
            approx=cv.approxPolyDP(cnt,0.02*per1,True)
            print(len(approx))
            if len(approx)==4 and area > maxarea:
                biggest=approx
                maxarea=area

            objcor=len(approx)
            x, y, w, h = cv.boundingRect(approx)
            
            if cv.waitKey(1)  ==  ord('q'):
               break
    #cv.drawContours(imgcount,biggest,-1,(0,255,0),20)
    return biggest

def reorder (mypoint):
    mypoint=np.reshape(mypoint,(4,2))
    mypointnew=np.zeros((4,1,2),np.int32)
    add=mypoint.sum(1)
    mypointnew[0]=mypoint[np.argmin(add)]
    mypointnew[3]=mypoint[np.argmax(add)]
    diff=np.diff(mypoint,axis=1)

    mypointnew[1]=mypoint[np.argmin(diff)]
    mypointnew[2]=mypoint[np.argmax(diff)]
    
    return mypointnew
    








    
def getwrap(img,biggest):
    biggest =reorder(biggest)

    pts1=np.float32(biggest)

    pts2=np.float32([[0,0],[wimg,0],[0,himg],[wimg,himg]])

    matrix=cv.getPerspectiveTransform(pts1,pts2)
    imgout=cv.warpPerspective(img,matrix,(wimg,himg))

    return imgout

    


while True:
    succ,img=cap.read()
    imgcount=img.copy()
    img=cv.resize(img,(wimg,himg))


    imgther=preprocessing(img)

    biggest=getcontours(imgther)
    
    imgwrap=getwrap(img,biggest)

    cv.imshow("video",imgwrap)
    
    if cv.waitKey(1)  ==  ord('q'):
        break
