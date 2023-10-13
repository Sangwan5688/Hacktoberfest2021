import cv2 as cv 

facecascade=cv.CascadeClassifier("archive\haarcascade_frontalface_default.xml")
img=cv.imread("PNGPIX-COM-Yash-PNG-Transparent-Image-1-500x500.png")
imgray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)

face=facecascade.detectMultiScale(imgray,1.4,4)

for (x,y,w,h) in face:
    cv.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)



cv.imshow("YASH",img)

cv.waitKey(0)