// check palindrome


#include<bits/stdc++.h>
using namespace std;

bool isPalindrome(char arr[],int n)
{
    int s=0,e=n-1;
    while(s<=e)
    {
        if(arr[s]==arr[e])
        {
            s++;
            e--;
        }else{
            return false;
        }
    }
    return true;
}

int getLength(char arr[])
{
    int count=0;
    int i=0;
    while(arr[i]!='\0')
    {
        count++;
        i++;

    }
    return count;
}

int main()
{
    char s[99];
    cin>>s;

    if(isPalindrome(s,getLength(s)))
    {
        cout<<"yes";
    }else{
        cout<<"no";
    }

    return 0;
}