#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int i = 1;
    while (i <= n)
    {
        int j=1;
        int val=n-i+1;
        while(val)
        {
            
            cout<<"*";
            val--;
        }
        cout<<endl;
        i++;
        // int j = n;
        // while (j >= i)
        // {
        //     cout << "*";
        //     j--;
        // }
        // cout << endl;
        // i++;
    }
}
/*
4
****
***
**
*
*/