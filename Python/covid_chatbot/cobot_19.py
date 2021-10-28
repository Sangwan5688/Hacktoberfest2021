import aiml
import os
import requests,json
import bs4


kernel = aiml.Kernel()


kernel.bootstrap(learnFiles = "cobot_19.xml", commands = "LOAD BASIC CHAT")
   

# kernel now ready for use
url='https://www.mohfw.gov.in/'

while True:
    respond = input("USER > ")

    if respond.lower() == "bye" :
        print("Would you like to give us a feedback.")

        respond = input("> ")
        if respond.lower() == "yes" :
    
            respond = input("Feedback : ")

            print("Thanks, for your feedback sir !")

            break
        
        if respond.lower() == "no" :

            print("Look like you dont enjoy our service . We are improving! , Hope to see you back!")
            break

        else :

            print("Thanks for choosing us . We hope you will come back soon.")
            break
    elif respond.lower() == "number" :
        res=requests.get('https://www.mohfw.gov.in/').content
        soup=bs4.BeautifulSoup(res.text.strip(),"html.parser")
        ac= soup("div", attrs={'class':'mob-show'})
        if None in(ac):
            continue
        print(ac.text.strip())
        print()
        respond=input("USER >")
        




    print("COBOT > " + kernel.respond(respond))