// STL in c++ set --> only unique elements

#include <bits/stdc++.h>
using namespace std;
int main()
{
    set<int> s;

    s.insert(5);
    s.insert(4);
    s.insert(4);
    s.insert(5);
    s.insert(3);
    s.insert(5);
    s.insert(9);

    for(int i:s)
    {
        cout<<i<<" ";
    }
    cout<<endl;

    


    

    
    return 0;
}