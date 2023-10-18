#include<bits/stdc++.h>
using namespace std;

void reachHome(int current,int desti)
{
    cout<<"current "<<current<<" destination "<<desti<<endl;
    if(current==desti)
    {
        cout<<"REACHED HOME";
        return ;
    }
    current++;

    reachHome(current,desti);
}

int main()
{
    int desti=9;
    int current=1;
    
    cout<<endl;
    reachHome(current,desti);
    return 0;
}