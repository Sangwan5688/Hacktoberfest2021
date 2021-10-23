import os
import time
import pyautogui
from datetime import date

today = date.today()

birthyear = 1999 #full year
birthmonth = 7 #single digit of month
birthday = 9 #sigle digit of day

os.system('taskkill /IM discord.exe') # kill discord if running
time.sleep(5);
os.system('C:/Users/Anton/AppData/Local/Discord/Update.exe --processStart Discord.exe') #open discord
time.sleep(5)
pyautogui.moveTo(162,1079)
time.sleep(2)
pyautogui.leftClick()
time.sleep(0.5)
pyautogui.leftClick()
pyautogui.hotkey('ctrl','shift','f') #full screen

pyautogui.click(x=-1825,y=1051)
time.sleep(0.3)
pyautogui.click(x=-1761,y=996)

month = today.strftime('%m')
month = int(month)

day = today.strftime('%d')
day = int(day)

year = today.strftime('%y')
year = ("20"+year)
year = int(year)

difyear = (year-birthyear)*365

if (month == 1 or month == 3 or month == 5 or month == 7 or month == 9 or month == 11):
    diffmonth = (abs(month-birthmonth)*31)
else:
    diffmonth = (abs(month-birthmonth)*30)

difdays = (abs(birthday-day))
days = (diffmonth + difyear + difdays)-2


time.sleep(2)
pyautogui.write('Day ' + str(days) + ' of being in the simulation')
time.sleep(2)
pyautogui.click(x=-1098, y=542)
time.sleep(1)
pyautogui.click(x=-1102, y=749)
time.sleep(1)
pyautogui.click(x=-810, y=721)
time.sleep(1)
pyautogui.hotkey('ctrl','shift','f') #full screen


