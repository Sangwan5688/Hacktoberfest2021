import cv2 as cv
import numpy as np


def empty():
    pass



cv.namedWindow("Trackbars")

cv.resizeWindow("Trackbars",640,240)

cv.createTrackbar("hue min","Trackbars",0,179,empty)
cv.createTrackbar("hue max","Trackbars",179,179,empty)
cv.createTrackbar("sat min","Trackbars",0,255,empty)
cv.createTrackbar("sat max","Trackbars",131,255,empty)
cv.createTrackbar("val min","Trackbars",37,255,empty)
cv.createTrackbar("val max","Trackbars",254,255,empty)

while True:
    img=cv.imread("coca cola.jpeg")
    imghsv=cv.cvtColor(img,cv.COLOR_BGR2HSV)
    h_min=cv.getTrackbarPos("hue min","Trackbars")
    h_max=cv.getTrackbarPos("hue max","Trackbars")
    s_min=cv.getTrackbarPos("sat min","Trackbars")
    s_max=cv.getTrackbarPos("sat max","Trackbars")
    v_min=cv.getTrackbarPos("val min","Trackbars")
    v_max=cv.getTrackbarPos("val max","Trackbars")
     
    
    print(h_min,h_max,s_min,s_max,v_min,v_max)
    lower=np.array([h_min,s_min,v_min])
    upper=np.array([h_max,s_max,v_max])
    mask=cv.inRange(imghsv,lower,upper)
    imgresult=cv.bitwise_and(img,img,mask=mask) 
    
    cv.imshow('img',img)
    cv.imshow("hsv",imgresult)
    cv.imshow('mask',mask)
    cv.waitKey(1)