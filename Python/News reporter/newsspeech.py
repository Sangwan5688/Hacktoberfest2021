from gtts import gTTS
import requests
import json
import os

mytext="Good Morning, "

with open('config.json' , 'r') as c:
    paras=json.load(c)["para"]

url = paras['url']+"country="+paras['country']+"&apiKey="+paras['apikey']
s = requests.get(url).text
news = json.loads(s)
newss = news['articles']
for article in newss:
    # print (article['title'])
    mytext+=article['title']+". \nMoving to our next headline. "

output=gTTS(text=mytext,lang="en",slow=False)
output.save("output.mp3")
os.system("start output.mp3")
