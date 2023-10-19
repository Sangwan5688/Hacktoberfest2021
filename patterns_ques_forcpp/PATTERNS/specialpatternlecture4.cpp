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
        int val = n - i + 1;
        while (val)
        {
            cout << j << " ";
            val--;
            j++;
        }

        int star = i - 1;
        while (star)
        {
            cout << "*"
                 << " ";
            star--;
        }

        int star2 = i - 1;
        while (star2)
        {
            cout << "*"
                 << " ";
            star2--;
        }

        int k = n;
        int val2 = n - i + 1;
        while (val2)
        {
            cout << k << " ";
            k--;
            val2--;
        }

        cout << endl;
        i++;
    }
}

/*
5

1 2 3 4 5 5 4 3 2 1
1 2 3 4 * * 5 4 3 2
1 2 3 * * * * 5 4 3
1 2 * * * * * * 5 4
1 * * * * * * * * 5

*/