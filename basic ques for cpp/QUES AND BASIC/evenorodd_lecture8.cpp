//number is even or odd
#include<bits/stdc++.h>
using namespace std;
bool iseven(int a)
{
    if(a&1)
    {
        return 0;
    }else{
        return 1;
    }
}
int main()
{
    int num;
    cin>>num;
    if(iseven(num))
    {
        cout<<"number is even"<<endl;
    }
    else{
        cout<<"number is odd"<<endl;
    }
    return 0;
}