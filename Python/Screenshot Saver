import pyautogui
import os
import time
from plyer import notification
import keyboard

# For getting desktop path
Desktoppath = os.path.join((os.environ['USERPROFILE']),'Desktop')
# print(Desktoppath) 

# For get Screenshot folder path
sspath = os.path.join(Desktoppath,'Screenshot')
# print(sspath)

# For make folder named Screenshot in desktop
def ssfolder():
    if os.path.isdir(sspath) == True:
        # print("ssfolder  exists")
        pass
    else:
        os.mkdir(sspath)
        # print("ssfolder created")


# for get datewise folder path
datefoldername = time.strftime("%d-%m-%Y")
datefolderpath =  os.path.join(sspath,datefoldername)
# print(datefolderpath)


# for make datewise folder in screenshot folder
def datefolder():
    if os.path.isdir(datefolderpath) == True:
        # print("datefolder exists")
        pass
    else:
        os.mkdir(datefolderpath)
        # print("datefolder created")


# for create screenshot in store in spacif location
def makescreenshot():
        
    # for each image name with time
    imagename = time.strftime(r"%H-%M-%S.png")
    # print(imagename)

    # for each image path
    imagepath = os.path.join(datefolderpath,imagename)
    # print(imagepath)

    pyautogui.screenshot(imagepath)


while True:  # making a loop
    try:  # used try so that if user pressed other than the given key error will not be shown
        if keyboard.is_pressed('ctrl+shift+q'):  # if key 'ctrl + shift +q' is pressed 
                break  # finishing the loop
        elif keyboard.is_pressed('ctrl+space'):
            ssfolder()
            datefolder()
            makescreenshot()

    except:
        break 




# ssfolder()
# datefolder()
# makescreenshot()
