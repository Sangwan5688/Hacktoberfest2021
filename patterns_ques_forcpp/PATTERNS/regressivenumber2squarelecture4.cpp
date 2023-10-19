#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int i = 1;
    while (i <= n)
    {
        int j = 1;
        while (j <= n)
        {
            cout << (n-j+1);
            j++;
        }
        cout << endl;
        i++;
    }
    return 0;
}


/*
for n=4

4321
4321
4321
4321

*/