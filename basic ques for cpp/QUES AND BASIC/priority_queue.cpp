// STL in c++  priority queue

#include <bits/stdc++.h>
using namespace std;
int main()
{
    priority_queue<int> maxi; //max heap


    priority_queue<int ,vector<int>,greater<int >> mini; //min heap

    maxi.push(2);
    maxi.push(3);
    maxi.push(7);
    maxi.push(9);
    maxi.push(0);

    int n=maxi.size();
    for(int i=0;i<n;i++)
    {
        cout<<maxi.top()<<" ";
        maxi.pop();
    }
    cout<<endl;

    mini.push(2);
    mini.push(-12);
    mini.push(0);
    mini.push(1);
    mini.push(-10);
    // cout<<"######################################################################"<<endl;
    // int k=mini.size();
    // mini.pop();

    // cout<<mini.top()<<endl;



    // cout<<"#######################################################################"<<endl;

    int m=mini.size();
    for(int i=0;i<n;i++)
    {
        cout<<mini.top()<<" ";
        mini.pop();

    }
    cout<<endl;

    cout<<"empty or not : "<<mini.empty()<<endl;


    
    return 0;
}