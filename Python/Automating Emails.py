import smtplib 
from email.message import EmailMessage
email = EmailMessage() ## Creating a object for EmailMessage
email['from'] = 'xyz name'   ## Person who is sending
email['to'] = 'xyz id'       ## Whom we are sending
email['subject'] = 'xyz subject'  ## Subject of email
email.set_content("Xyz content of email") ## content of email
with smtlib.SMTP(host='smtp.gmail.com',port=587)as smtp:     
## sending request to server 
    
    smtp.ehlo()          ## server object
smtp.starttls()      ## used to send data between server and client
smtop.login("email_id","Password") ## login id and password of gmail
smtp.send_message(email)   ## Sending email
print("email send")    ## Printing success message

