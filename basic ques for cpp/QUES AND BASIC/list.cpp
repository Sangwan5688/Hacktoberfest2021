// STL in c++  list

#include <bits/stdc++.h>
using namespace std;
int main()
{
    list<int> l;

    list<int>n(5,100);
    cout<<"Printing n"<<endl;
    for(int i:n)
    {
        cout<<i<<" ";
    }
    cout<<endl;

    list<int > c(n); //copies all element from n to c
    cout<<"Printing c"<<endl;
    for(int i:c)
    {
        cout<<i<<" ";
    }
    cout<<endl;

    l.push_front(1);
    l.push_back(2);
    cout<<"size of list : "<<l.size()<<endl;
    
    for(int i:l)
    {
        cout<<i<<" ";
    }
    cout<<endl;

    l.erase(l.begin());
    cout<<"after erase : "<<endl;
    for(int i:l)
    {
        cout<<i<<" ";
    }
    cout<<endl;

    cout<<"size of list : "<<l.size()<<endl;

    return 0;
}