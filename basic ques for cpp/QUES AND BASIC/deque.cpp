// STL in c++  deque

#include <bits/stdc++.h>
using namespace std;
int main()
{
    deque<int> d;

    d.push_back(2); // to insert the element from back side
    d.push_back(1);
    d.push_front(3); // to insert the element from front side

    for (int i : d) // to print the deque
    {
        cout << i << " ";
    }
    cout << endl;

    //    d.pop_back(); //deleting the element from backside
    //    cout<<endl;
    //    cout<<"poping from back"<<endl;
    //    for(int i:d)
    //    {
    //     cout<<i<<" ";
    //    }
    //    cout<<endl;

    //    d.pop_front();//deleting the element from the front side
    //    cout<<endl;
    //    cout<<"poping from front side"<<endl;
    //    for(int i:d)
    //    {
    //     cout<<i<<" ";
    //    }
    //    cout<<endl;

    cout << "print first index element : " << d.at(0) << endl; // shows element at index 0
    cout << "fornt element is : " << d.front() << endl;        // shows front element
    cout << "last element is : " << d.back() << endl;          // shows last element

    cout << "is empty or not : " << d.empty() << endl; // if empty return 0 ,is not empty then return 1

    cout << "before erase : " << d.size() << endl;
    for (int i : d)
    {
        cout << i << " ";
    }
    cout << endl;

    d.erase(d.begin(), d.begin()+1); //this delete 1 element from front

    cout << "after erase : " << d.size() << endl;
    for (int i : d)
    {
        cout << i << " ";
    }
    cout << endl;

    return 0;
}