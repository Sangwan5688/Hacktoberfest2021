#include <bits/stdc++.h>
using namespace std;


bool isAnagram(string str1, string str2)
{

    int str1_size=str1.size();
    int str2_size=str2.size();
    int flag=0;
    map<char,int>m;
    
    for(int i=0;i<str1_size;i++)
    {
        m[str1[i]]++;
    }
    for(int i=0;i<str2_size;i++)
    {
        m[str2[i]]--;
    }
    
    for(auto i:m)
    {
        // cout<<i.first;
        if(i.second!=0 || i.second<0)
        {
            // cout<<i.first;
            flag=1;
        }
    }
    
    if(flag==1)
    {
        return false;
    }
    else
        return true;
    
}




int main()
{
    
    string str1;
    string str2;
    cin>>str1>>str2;
    bool result;
    result=isAnagram(str1,str2);
    if(result)
    cout<<"Yes";
    else
    cout<<"No";
    
    return 0;
}
