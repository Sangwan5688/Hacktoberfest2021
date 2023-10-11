 -1 +1,232 @@
#!/bin/bash
#### Colors Output

RESET="\033[0m"			# Normal Colour
RED="\033[0;31m" 		# Error / Issues
GREEN="\033[0;32m"		# Successful       
BOLD="\033[01;01m"    		# Highlight
WHITE="\033[1;37m"		# BOLD
YELLOW="\033[1;33m"		# Warning



tput setaf 5;
tput blink;
tput bold;

echo -e  ".                                                 ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗                                                  .";
echo -e  ".                                                 ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝                                                  .";
echo -e  ".                                                 ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║                                                     .";
echo -e  ".                                                 ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║                                                     .";
echo -e  ".                                                 ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║                                                      "; 
echo -e  ".                                                 ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   From : MANAL SWAMI SIR  ${RESET}  "; 







echo -e ${WHITE}".                                                ##############################################################                                               ."
echo -e ".                                                                                                                                                             ."
echo -e ".                                                    Information Gathering & Website Reconnaissance                                                           ."
echo -e ".                                                                                                                                                             ."
echo -e ".                                                 #           ******Tool Developed by******                    #                                              ."
echo -e ".                                                 #                Ritu raj choudhary                          #                                              ."
echo -e ".                                                 #                     Linkdin:                               #                                              ."
echo -e ".                                                 #  https://www.linkedin.com/in/ritu-raj-choudhary-44202620b/ #                                              ."
echo -e ".                                                 #                                                            #                                              ."
echo -e ".                                                                                                                                                             ."
echo -e ".                                                ##############################################################                                               ."


echo -e ${WHITE}"                      "

date '+Date: %d/%m/%y | Time: %H:%M:%S'
date_begin=$(date +"%s") 

tput setaf 1;
tput smso;
tput blink;
tput bold;
echo -e "                                                     ****   Make sure you have update all the packege   ****                                                     ${RESET}  "

tput setaf 8;
tput bold;
echo "1: General info of domain or ip "
tput setaf 2;
echo "2: Active Reconnaissance  "
tput setaf 3;
echo "3: Passive Reconnaissance  "
tput setaf 4;
echo "4: DNS Lookup  "
tput setaf 5;
echo "5: Basic Port Scaning  "
tput setaf 6;
echo "6: Any File Details "
tput setaf 7;
echo "7: Network Scanning "
tput setaf 8;
echo "8: Robots.txt Enumeration "
tput setaf 9;
echo "9:Perform a search for possible subdomains"
tput setaf 11;
echo "10:Perform a search for possible email address"
tput setaf 12;
echo "11: Help "
tput setaf 13;
echo "12: Update all the packege "
read Section
if [[ $Section -eq 1 ]]
then

tput setaf 2;
tput bold;
tput smso;
echo -e  "For General information of the Domain or ip ${RESET}"
tput setaf 4;
tput bold;  
echo -e  "Enter the domain or ip ${RESET}"
read ip
whois $ip

elif [[ $Section -eq 2 ]]
then
tput bold;
tput setaf 2;
tput smso;
echo -e  "ACTIVE RECON ${RESET}"
tput bold;
tput setaf 4;
echo -e  "Enter the domain  ${RESET}"
read ip
whatweb -v   $ip 


elif [[ $Section -eq 3 ]]
then
tput bold;
tput setaf 2;
tput smso;  
echo -e "Passive Recon. ${RESET} "
tput bold;
tput setaf 4;
echo -e "Enter the domain or ip "
read TARGET_IP
        echo [INFO] Useful links related to $TARGET_IP:
        echo "[*] https://www.virustotal.com/pt/ip-address/$TARGET_IP/information/" 
        echo "[*] https://www.hybrid-analysis.com/search?host=$TARGET_IP" 
        echo "[*] https://www.shodan.io/host/$TARGET_IP" 
        echo "[*] https://www.senderbase.org/lookup/?search_string=$TARGET_IP" 
        echo "[*] https://www.alienvault.com/open-threat-exchange/ip/$TARGET_IP" 
        echo "[*] http://pastebin.com/search?q=$TARGET_IP" 
        echo "[*] http://urlquery.net/search.php?q=$TARGET_IP" 
        echo "[*] http://www.alexa.com/siteinfo/$TARGET_HOST" 
        echo "[*] http://www.google.com/safebrowsing/diagnostic?site=$TARGET_HOST" 
        echo "[*] https://censys.io/ipv4/$TARGET_IP" 

elif [[ $Section -eq 4 ]]
then
tput bold;
tput setaf 4;
tput smso;
echo -e "Enter the domainp ${RESET} "
read ip
dig $ip

elif [[ $Section -eq 5 ]]
then
tput bold;
tput setaf 4;
tput smso;
echo -e "Enter Domain or ip ${RESET} "
read ip
nmap $ip

elif [[ $Section -eq 6 ]]
then
tput bold;
tput setaf 4;
tput smso;
echo -e "Enter the path of the files ${RESET}"
read path
exiftool $path

elif [[ $Section -eq 7 ]]
then
tput bold;
tput setaf 4;
tput smso;
echo -e "Enter Domain or ip  ${RESET} "
read ip
nmap -sC -sV -pN  $ip


elif [[ $Section -eq 8 ]]
then
tput bold;
tput setaf 4;
tput smso;
echo -en "Enter the website address (DNS only): ${RESET}"
read site;
wget --user-agent="Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)" -O - $site/robots.txt --quiet;


elif [[ $Section -eq 9 ]]
then
tput bold;
tput setaf 4;
tput smso;
echo -e  ${RED}"Enter the domain or ip ${RESET} "
read ip
dmitry -s $ip


elif [[ $Section -eq 10 ]]
then
tput bold;
tput setaf 4;
tput smso;
echo -e  ${RED}"Enter the domain or ip ${RESET} "
read ip
dmitry -e $ip


elif [[ $Section -eq 11 ]]
then

echo "WHOIS:     General info of domain or ip"
echo "WHATWEB:   Active Reconnaissance"
echo "DOMAINS:   Passive Reconnaissance "
echo "NS LOOKUP: DNS Lookup"
echo "NMAP:      Basic Port Scaning"
echo "EXIFTOOL:  Any File Details"
echo "NAMP:      Network Scanning"
echo "DOMAIN:    Robots.txt Enumeration  "


elif [[ $Section -eq 12 ]]
then 
tput bold;
tput setaf 2;
tput smso;
echo -e "Make sure you are root ${RESET} "
tput bold;
tput setaf 4;
tput smso;
echo -e "Installing now... ${RESET}"

sudo apt install whois
sudo apt install exiftool
sudo apt install dmitry
sudo apt install whatweb

else
tput setaf 1;
tput blink;
tput bold;

  echo "Wrong Input."
  echo "!! BYE BYE !!"
fi
