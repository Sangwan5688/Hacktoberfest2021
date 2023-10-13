import cv2 as cv 

framew=600
frameh=400

cap=cv.VideoCapture(0)
cap.set(3,framew)
cap.set(4,frameh)
facecascade=cv.CascadeClassifier("archive\haarcascade_frontalface_default.xml")
#img=cv.imread("PNGPIX-COM-Yash-PNG-Transparent-Image-1-500x500.png")


while True:
    succ,img=cap.read()
    imgray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)

    face=facecascade.detectMultiScale(imgray,1.1,4)

    for (x,y,w,h) in face:
        cv.rectangle(imgray,(x,y),(x+w,y+h),(255,0,0),2)



    cv.imshow("video",imgray)
    if cv.waitKey(1)  ==  ord('q'):
        break
