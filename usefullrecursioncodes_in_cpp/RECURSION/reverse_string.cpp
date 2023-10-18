#include<bits/stdc++.h>
using namespace std;

void reverse(string &name, int s,int e)
{
    if(s>e) return ;

    swap(name[s],name[e]);
    s++,e--;

    reverse(name,s,e);
}

int main()
{
    string name="yobecin";
    reverse(name,0,name.length()-1);
    cout<<name<<endl;
    return 0;
}