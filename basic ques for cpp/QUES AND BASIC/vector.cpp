//STL in c++  vector

#include<bits/stdc++.h>
using namespace std;
int main()
{
    vector<int> v;
    cout<<"capacity is : "<<v.capacity()<<endl;   //capacity shows how much the space is being assinged for elements
    v.push_back(1);
    cout<<"capacity is : "<<v.capacity()<<endl;

    v.push_back(2);
    cout<<"capacity is : "<<v.capacity()<<endl;

    v.push_back(3);
    cout<<"capacity is : "<<v.capacity()<<endl;


    cout<<"*******************printing the vector******************"<<endl;
    for(int i:v)
    {
        cout<<i<<" ";
    }
    cout<<endl;
    cout<<"*********************************************************"<<endl;


    cout<<"size is : "<<v.size()<<endl; //size shows how many element are there

    cout<<"element at 2nd Index is : "<<v.at(2)<<endl; //v.at(2) show which element is at index 2  

    cout<<"first element is : "<<v.front()<<endl; //front element
    
    cout<<"last element is : "<<v.back()<<endl; //back element


    cout<<"before pop"<<endl;
    for(int element:v)
    {
        cout<<element<<" ";
    }
    cout<<endl;

    v.pop_back(); //pop the last element

    cout<<"after pop"<<endl;

    for(int element:v)
    {
        cout<<element<<" ";
    }

    cout<<endl;

    cout<<"Before clear size : "<<v.size()<<endl;
    v.clear();//clears all element from vector
    cout<<"After clear size : "<<v.size()<<endl;

    vector<int>a(5,1); //a vector of size 5 and having all 1
    cout<<"print a"<<endl;
    for(int i:a)//print the elements in a vector
    {
        cout<<i<<" ";
    }
    cout<<endl;


    vector<int>copy(a);//this how to copy a vector in another her copy is just a name it can be any like "last ,aman etc"
    cout<<"print copy vector"<<endl;
    for(int i:copy)
    {
        cout<<i<<" ";
    }





    return 0;
}