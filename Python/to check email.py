
# Email Collector
import re
str ='''
2
'''
# email1
# email2
# email3

str = """

 Email:enquiry@alliance.edu.in   Helpline: +91 80 3093 8100 / 8200 / 4619 9100
 Media  Library  News  Webmail  Careers
 Alliance University
 Conferences
 Admissions Open
 Select Language
UPDATES:
ABOUT US 
WHY AU 
COLLEGES 
FACULTY
INTERNATIONAL PROGRAMS
PROGRAMS
RESEARCH
ADMISSIONS 
PLACEMENTS
CONTACT US
Contact UsHome Contact Us
 Contact Us Back
 Vice-Chancellor
Dr. Pavana Dibbur
 : vc@alliance.edu.in
 : +91 80 3093 8100/4619 9100

 Pro Vice-Chancellor (Academics, Research & Strategy)
Dr. Anubha Singh
 : anubha@alliance.edu.in
 : +91 80 3093 8102

 Registrar
Mr. Madhu Sudan Mishra
 : registrar@alliance.edu.in
 : +91 80 3093 8100/4619 9100

 Registrar (Examination & Evaluation)
Dr. Sajan Mathew
 : registrar.exams@alliance.edu.in
 : +91 80 3093 8141

 Director (Placements)
Mr. Mathew Thankachan
 : placement@alliance.edu.in | mathew.t@alliance.edu.in
 : +91 80 3093 8124 | 98444 72674

 Director (International Affairs)
Mr. Rajen Chatterjee
 : rajen.chatterjee@alliance.edu.in
 : +91 80 3093 8075

 Director (Admissions)
Mr. Abhay Chebbi
 : abhay.chebbi@alliance.edu.in
 : +91 96636 46464

 Human Resources Department
 : hrd@alliance.edu.in
 : +91 80 3093 8210 / 8204

 Student Verification 
Office of Registrar (Examination & Evaluation)
 : edu.verify@alliance.edu.in
 : +91 80 3093 8100 / 8200 | +91 80 4619 9100

 Contacts Info
 ALLIANCE UNIVERSITY
 Central Campus
Chikkahagade Cross, Chandapura - Anekal Main Road, Anekal
Bengaluru – 562 106, Karnataka,   India. [ Get Route Map ]
+91 80 3093 8100/8200/4619 9100 | Fax: +91 80 4619 9099
E-mail : enquiry@alliance.edu.in

 Office of Admissions
UG: +91 9620009825 | 91084 43123 | 91084 42143 | 98806 19618
PG: +91 98860 02500 | 99002 29974 | 90083 16363

 City Campus 1
19th Cross, 7th Main, BTM 2nd Stage, N.S. Palya
Bengaluru – 560 076, Karnataka,   India. [ Get Route Map ]
Tel.: +91 80 26786020 / 21 , 26789749

 City Campus 2
2nd Cross, 36th Main, Dollars Scheme, BTM 1st Stage
Bengaluru – 560 068, Karnataka,   India. [ Get Route Map ]
Tel.: +91 80 26681444 / 4372 | Fax: +91 80 26782048

 CONTACT INFO
 Contact Us
 Enquiry
 Feedback
 Get Route from Address
Quick Course Finder


Find Courses
 SCHOOLS | COLLEGES
 Alliance School of Business
 Alliance College of Engineering and Design
 Alliance School of Law
 Alliance Ascent College
 Planned Academic Units
International Partners

Antwerp Management School
Antwerp Management School
Belgium
Royal Roads University
Royal Roads University
Canada
Beijing Institute of Technology
Beijing Institute of Technology
China
Nanjing University of Aeronautics and Astronautics
Nanjing University of Aeronautics and Astronautics
China
The Sino-British College, USST,
The Sino-British College, USST,
China
INSEEC
INSEEC
France
IPAC School of Management
IPAC School of Management
France
ISEP
ISEP
France
Paris School of Business
Paris School of Business
France
Telecom School of Management
Telecom School of Management
France
Telecom SudParis
Telecom SudParis
France
Toulouse Business School
Toulouse Business School
France
Berlin School of Economics and Law
Berlin School of Economics and Law
Germany
European Business School
European Business School
Germany
University of Applied Sciences
University of Applied Sciences
Germany
Duisenberg School of Finance
Duisenberg School of Finance
The Netherlands
Maastricht School of Management
Maastricht School of Management
The Netherlands
Russian Presidential Academy of National Economy and Public Admi. (RANEPA)
Russian Presidential Academy of National Economy and Public Admi. (RANEPA)
Russia
Togliatti Academy of Management
Togliatti Academy of Management
Russia
Edinburgh Napier University
Edinburgh Napier University
UK
Federation of Schools (FEDE)
Federation of Schools (FEDE)
Switzerland
Swansea Metropolitan University
Swansea Metropolitan University
UK
University of Bedfordshire
University of Bedfordshire
UK
University of Chester
University of Chester
UK
University of Dundee
University of Dundee
UK
Fairleigh Dickinson University
Fairleigh Dickinson University
USA
Georgia State University
Georgia State University
USA
Kennesaw State University
Kennesaw State University
US
Oakland University
Oakland University
USA
San Jose State University
San Jose State University
USA
The University of Memphis
The University of Memphis
USA
Webber International University
Webber International University
USA
 International Programs
 Testimonials
 My two years at Alliance University have groomed me to be a confident individual ready to enter the corporate world and has deepened this confidence by helping me get a job in my dream organization. Alliance with its state of the art facilities, competitive curriculum, varied cultural mix and strong faculty base has motivated and guided m...  Read More

 Kiran Varghese Jacob Kiran Varghese Jacob
Google Google
 Top University in India for MBA LAW Engineering & Arts and the Humanities
Alliance University is a private University established in Karnataka State by Act No.34 of year 2010 and is recognized by the University Grants Commission (UGC), New Delhi... 

About Us
THE UNIVERSITY
GOVERNANCE
CORPORATE SOCIAL RESPONSIBILITY
AACSB
IACBE
NIRF
Useful Links
PROGRAMS & COURSES
INTERNATIONAL PROGRAMS
RESULTS
FEEDBACK
DOWNLOADS
PHOTO GALLERY
Useful Links
STUDENT VERIFICATION
ALLIANCE ADVENTURE CLUB
ANTI-RAGGING POLICY
ROUTE MAP
CONTACT US
2018 © All Rights Reserved.  | Privacy Policy | Terms & Conditions | Disclaimer | Sitemap




"""


# email = re.findall(r"[0-9a-zA-Z._+%]+@[0-9a-zA-Z._+%]+[.][a-zA-Z.0-9]+", str)
email = re.findall(r"[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]+",str)

print(email)

