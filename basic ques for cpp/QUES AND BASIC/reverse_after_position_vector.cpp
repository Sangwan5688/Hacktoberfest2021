//********************************************REVERSE OF AN vector from after a given index********************************************
#include<bits/stdc++.h>
using namespace std;

int reverse(vector<int> &v,int m)   // vector<int>(vector<int> v)
{
    int s=m+1,e=v.size()-1;
    while(s<=e)
    {
        swap(v[s],v[e]);
        s++;
        e--;
    }
    //return v; //if the function vector value

}


void print(vector<int >v)
{
    for(int i=0;i<v.size();i++)
    {
        cout<<v[i]<<" ";
    }
    cout<<endl;
}

int main()
{
    vector<int> v;
    int m=1;
    int n,element;
    cout<<"enter the number of elements : ";
    cin>>n;

    for(int i=0;i<n;i++)
    {
        cin>>element;
        v.push_back(element);
    }

    // v.push_back(1);
    // v.push_back(2);
    // v.push_back(3);
    // v.push_back(4);
    // v.push_back(5);
    // v.push_back(6);


    // vector<int> ans=reverse(v);   //storing the ans in a vector

    // print(ans);

    reverse(v,m);
    print(v);

    return 0;
}