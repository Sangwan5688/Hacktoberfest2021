/*A phrase is a palindrome if, after converting all uppercase letters into lowercase letters 
and removing all non-alphanumeric characters, it reads the same forward and backward. 
Alphanumeric characters include letters and numbers.*/

#include<bits/stdc++.h>
using namespace std;

bool validCHAR(char ch)
{
    if((ch>='a' && ch<='z') || (ch>='A' && ch<='Z') || (ch>='0' && ch<='9'))
    {
        return true;
    }

    return false;
}

char toLOWER(char ch)
{
    if((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9'))
    {
        return ch;
    }else{
        char temp=ch-'A'+'a';
        return temp;
    }
}

bool checkpalindrome(string str)
{
    int s=0,e=str.length()-1;
    while(s<=e)
    {
        if(str[s]==str[e])
        {
            s++;
            e--;
        }else{
            return false;
        }
    }
    return true;
}

bool ispalindrome(string str)
{
    string temp="";

    for(int i=0;i<str.length();i++)
    {
        if(validCHAR(str[i]))
        {
            temp.push_back(str[i]);
        }
    }

    for(int i=0;i<str.length();i++)
    {
        temp[i]=toLOWER(temp[i]);
    }


    return checkpalindrome(temp);




}



int main()
{
    char s[10000];
    cin>>s;


    if(ispalindrome(s))
    {
        cout<<"yes";
    }else{
        cout<<"no";
    }
    

    return 0;


}