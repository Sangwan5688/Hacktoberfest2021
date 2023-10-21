// STL in c++  stack
//last in first out

#include <bits/stdc++.h>
using namespace std;
int main()
{
    stack<string> s;

    s.push("aman");
    s.push("deep");
    s.push("singh");
    s.push("parihar");

    cout<<"Top element : "<<s.top()<<endl;
    
    s.pop();

    cout<<"Top element : "<<s.top()<<endl;




    

    return 0;
}