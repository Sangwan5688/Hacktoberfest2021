#!bin/bash

if [ "$1" == "" ]
then 
	echo "Usage: $0 IP"
	exit
fi 

res=$(curl http://ip-api.com/json/$1 -s)
#echo $res


status=$(echo $res | jq '.status' -r)
#echo $status

if [ "$status" == "success" ]
then 
	#echo "vaild ip"

	country=$(echo $res | jq '.country' -r)
	countrycode=$(echo $res | jq '.countryCode' -r)
	region=$(echo $res | jq '.region' -r)
	regionname=$(echo $res | jq '.regionName' -r)
	city=$(echo $res | jq '.city' -r)
	zip=$(echo $res | jq '.zip' -r)
	latitude=$(echo $res | jq '.lat' -r)
	longitude=$(echo $res | jq '.lon' -r)
	timezone=$(echo $res | jq '.timezone' -r)
	isp=$(echo $res | jq '.isp' -r)
	org=$(echo $res | jq '.org' -r)
	as=$(echo $res | jq '.as' -r)

	echo "Query:::$1"
	echo "Country:::$country ($countrycode)"
	echo "Region:::$regionname ($region)"
	echo "City:::$city"
	echo "Zip:::$zip"
	echo "Timezone:::$timezone"
	echo "Isp:::$isp"
	echo "Org:::$org"
	echo "As:::$as"
	echo "Google Map:::https://maps.google.com/?q=$latitude,$longitude"
	

else
	echo "invaild ip or check internet connnetion"
fi
