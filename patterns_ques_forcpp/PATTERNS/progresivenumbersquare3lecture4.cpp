#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int i = 1;
    int count = 1;
    while (i <= n)
    {
        int j = 1;
        while (j <= n)
        {
            cout << count;
            count++;
            j++;
        }
        cout << endl;
        i++;
    }
    return 0;
}

/*
3
123
456
789

*/