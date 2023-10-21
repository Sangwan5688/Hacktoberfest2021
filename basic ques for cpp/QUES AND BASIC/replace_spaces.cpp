//replace all space with @40 

#include<bits/stdc++.h>
using namespace std;

string replace(string s)
{
    string temp="";
    for(int i=0;i<s.length();i++){
        if(s[i] == ' ')
        {
            temp.push_back('@');
            temp.push_back('4');
            temp.push_back('0');
        }else{
            temp.push_back(s[i]);
        }
    }
    return temp;
}

int main()
{
    string s="aman deep singh parihar";


    cout<<replace(s);
    return 0;
}