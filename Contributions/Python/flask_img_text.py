from PIL import Image
import io
import pytesseract
import cv2
import json
from flask import Flask,request
from flask_ngrok import run_with_ngrok
import base64

pytesseract.pytesseract.tesseract_cmd = "C:\\Program Files\\Tesseract-OCR\\tesseract"
app = Flask(__name__)
run_with_ngrok(app)

@app.route('/',methods=["POST","GET"])
def hello():
    data=request.data
    data.decode()
    data=json.loads(data)
    str_image_data=data["img"]
    
    #print(type(image_data))
    #with open("image_bytes.txt","w") as f:
    #    f.write(image_data)
    
    byte_image_data=io.BytesIO(base64.b64decode(str_image_data))
     
    img = Image.open(byte_image_data)
    img.save("myImage.jpg",format="jpeg")
    #img.show()

    print("********************")
    #print(data)    
    print("********************")
    #image="hi"
    #print("hello")
    img = cv2.imread("myImage.jpg")
    scale_percent = 20 # percent of original size
    width = int(img.shape[1] * scale_percent / 100)
    height = int(img.shape[0] * scale_percent / 100)
    dim = (width, height)
    # resize image
    img = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
    text = pytesseract.image_to_string(img)
    #print(text)
    #cv2.imshow("img",img)
    #cv2.waitKey(0)
    resp={"response":text}
    return json.dumps(resp)

if __name__ == '__main__':
    app.run()
