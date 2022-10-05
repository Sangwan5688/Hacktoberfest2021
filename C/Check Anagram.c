//This is a C-Proogramming code to check weather a given string is Anagram or not

#include<stdio.h>
#include<string.h>
int isAnagram(char string1[], char string2[]);
#define MAX 200
main()
{
char string1[MAX];
char string2[MAX];
printf("Enter the text written by Seeta:\n");
gets(string1);
printf("Enter the text written by Geeta:\n");
gets(string2);
if(isAnagram(string1,string2))
{
printf("Seeta and Geeta have used same characters same number of time\n");
}
else
{
printf("Seeta and Geeta have not used same characters same number of time\n");
}
}
int isAnagram(char string1[], char string2[])
{

int count1[26]={0};
int count2[26]={0};
int i =0;
int j=0;
char ch;

while(string1[i]!='\0')
{
ch =toupper(string1[i]);
if(ch>='A' && ch<='Z')
{
count1[ch-'A']++;
}
i++;
}

while(string2[j]!='\0')
{
ch =toupper(string2[j]);
if(ch>='A' && ch<='Z')
{
count2[ch-'A']++;
}
j++;
}
for(i=0;i<26;i++)
{
if(count1[i]!=count2[i])
return 0;
}
return 1;
}
