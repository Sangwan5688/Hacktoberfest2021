#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int i = 1;
    int value = 'A';
    while (i <= n)
    {
        int j = 1;

        while (j <= n)
        {
            char ch = value;
            cout << ch;
            value++;
            j++;
        }
        cout << endl;
        i++;
    }
}

/*
3

ABC
DEF
GHI

*/