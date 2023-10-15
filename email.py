#You have to create a 'app_pass.py' file and in that store your app_password as password = '--_--'.
#But even before that, you have to set-up 2 factor authentication in Google account and make a app password for python.
from email.message import EmailMessage 
from app_pass import password
import ssl
import smtplib

email_sender = input("Enter the senders email id : ")
email_password = password
email_receiver = input("Enter the receivers email id : ")

subject = input("Enter the subject:")
body_content = input("Enter the content of the body of the email:")

em = EmailMessage()
em['From'] = email_sender
em['To'] = email_receiver
em['Subject'] = subject
em.set_content(body_content)

context = ssl.create_default_context()
with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
    smtp.login(email_sender,email_password)
    smtp.sendmail(email_sender,email_receiver,em.as_string())
