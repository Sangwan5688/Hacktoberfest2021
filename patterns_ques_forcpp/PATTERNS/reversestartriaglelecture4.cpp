#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int i = 1;
    while (i <= n)
    {
        int space = i - 1;
        while (space)
        {
            cout << " ";
            space--;
        }

        int star=n-i+1;
        while(star)
        {
            // cout<<i;
            cout<<"*";
            star--;
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