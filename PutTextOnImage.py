import cv2

img = cv2.imread("../image/squirrel.jpg")

rectangledImg = cv2.rectangle(img,(120,100),(370,380),(0,0,255), 2)
writeText = cv2.putText(rectangledImg,"This is Squirrel", (118,95), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,0,0), 2)
cv2.imwrite("putText.jpg",writeText)
cv2.imshow("TextedImg",writeText)
