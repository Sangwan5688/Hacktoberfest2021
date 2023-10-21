// STL in c++  queue
//first in first out
#include <bits/stdc++.h>
using namespace std;
int main()
{
    queue<string> q;

    q.push("aman");
    q.push("deep");
    q.push("singh");
    q.push("parihar");
    cout<<"size before pop : "<<endl;
    cout<<"size of the queue is : "<<q.size()<<endl;


    cout<<"first element is : "<<q.front()<<endl;

    q.pop(); //here pop first element

    cout<<"first element is : "<<q.front()<<endl;

    cout<<"size after pop : "<<endl;

    cout<<"size of the queue is : "<<q.size()<<endl;








    return 0;
}