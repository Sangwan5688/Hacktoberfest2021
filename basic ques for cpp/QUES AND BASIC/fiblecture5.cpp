#include <bits/stdc++.h>
using namespace std;
int main()
{
    int a = 0, b = 1;
    int n;
    cin >> n;
    cout << a << " " << b << " ";
    int i = 1;
    while (i <= n - 2)
    {
        int nextnum = a + b;
        cout << nextnum << " ";

        a = b;
        b = nextnum;
        i++;
    }
}