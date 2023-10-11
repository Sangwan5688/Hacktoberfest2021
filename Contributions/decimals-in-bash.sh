#! /bin/bash

#Playing with decimals in Bash by 'bc':

number1=29.2
number2=13.75

#Addition:
addition=$(echo "$number11+$number2" | bc -l)

#Extraction:
extraction=$(echo "$number1-$number2" | bc -l)

#Multiplication:
multiplication=$(echo "$number1*$number2" | bc -l)

#Division:
division=$(echo "$number1/$number2" | bc -l)

echo "$number1+$number2 equals: $addition"
echo "$number1-$number2 equals: $extraction"
echo "$number1*$number2 equals: $multiplication"
echo "$number1/$number2 equals: $division"
