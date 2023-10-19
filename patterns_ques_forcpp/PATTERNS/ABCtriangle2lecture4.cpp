#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int i = 1;
    char count = 'A';
    while (i <= n)
    {
        int j = 1;
        while (j <= i)
        {
            cout << count;
            count++;
            j++;
        }
        cout << endl;
        i++;
    }
}

/*
4

A
BC
DEF
GHIJ

*/