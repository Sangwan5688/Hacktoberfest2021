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
            char ch = 'A' + i + j - 2;
            cout << ch;
            j++;
        }
        cout << endl;
        i++;
    }
}

/*
3
ABC
BCD
CDE
*/


/*
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int i = 1;

    while (i <= n)
    {
        char ch = 'A' + i - 1;
        int j = 1;
        while (j <= n)
        {

            cout << ch;
            ch++;
            j++;
        }
        cout << endl;
        i++;
    }
}

*/