import pyttsx3
import speech_recognition as sr
import datetime
import wikipedia
import webbrowser
import os
import sys


engine = pyttsx3.init('sapi5')
voice = engine.getProperty('voices')
#print(voice[1].id)
engine.setProperty('voice',voice[1].id )

def speak(audio):
    engine.say(audio)
    engine.runAndWait()

def wishMe():
    hour = int(datetime.datetime.now().hour)
    if hour>=0 and hour<12:
        speak("Good Morning!")

    elif hour>=12 and hour<18:
        speak("Good Afternoon!")

    elif hour>=18 and hour<20:
        speak("Good Evening!")

    else:
        speak("Good Night!")
    
    speak("I am MJ . Please tell me how may i help you.")
def takeCommand():
    
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening....")
        r.pause_threshold = 1
        audio = r.listen(source)

    try:
        print("Recoginzing...")
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")  

    except Exception as e:
        #print(e)    

        print("Say that again please.....")
        return "None"
    return query
    
if __name__ == "__main__":
    wishMe()
    while True:
        query = takeCommand().lower()   
        if 'wikipedia' in query:
            speak('Searching Wikipedia....')
            query = query.replace("wikipedia", "")
            results = wikipedia.summary(query, sentences=2)
            speak("According to Wikipedia")
            print(results)
            speak(results)

        elif 'open youtube' in query:
            webbrowser.open("youtube.com") 

        elif 'open google' in query:
            webbrowser.open("google.com")

        #elif 'play music' in query:
            #os.system('NewRules.mp3')

        elif 'the time' in query:
            strTime = datetime.datetime.now().strftime("%H:%M:%S")
            speak(f"Sir, the time is {strTime}")

         #elif 'open air' in query:
           # air = "C:\\Program Files (x86)\\GameTop.com\\Air Assault\\game-shell.exe"
            #os.startfile(air)
                
        elif 'thank you' in query:
            speak("Thank you sir! Have a good day")
            sys.exit()    