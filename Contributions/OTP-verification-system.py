import os
import math
import smtplib
import random


digits="0123456789"
OTP=""
for i in range(6):
    OTP+=digits[math.floor(random.random()*10)]
otp = OTP + " is your OTP"
msg= otp

#You need Google app password to be able to send emails using your Gmail account
#After you create your app password for your Gmail account you will get a key.Paste it below.

s = smtplib.SMTP('smtp.gmail.com', 587)
s.starttls()
s.login("Your Gmail Account", "You app password")
emailid = input("Enter your email: ")
s.sendmail('#########',emailid,msg)
a = input("Enter the recieved OTP : ")
if a == OTP:
    print("Verified")
else:
    print("Please Check your OTP again")
