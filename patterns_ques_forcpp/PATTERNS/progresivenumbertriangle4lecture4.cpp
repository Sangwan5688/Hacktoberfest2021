#include <bits/stdc++.h> // this is mine and more good
using namespace std;
int main()
{
    int n;
    cin >> n;
    int i = 1;

    while (i <= n)
    {
        int j = 1;
        while (j <= i)
        {
            cout<<i+j-1;
            j++;


        }
        cout << endl;
        i++;
    }
}
/*
4


1
23
345
4567

*/


/*
second approach


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
        int val = i;
        while (j <= i)
        {
            cout << val;
            val++;
            j++;
        }
        cout << endl;
        i++;
    }
}



*/

/*

third approach


#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin >> n;
    int i = 1;
    while (i <= n)
    {
        int j = i;
        while (j < 2 * i)
        {
            cout << j;
            j++;
        }

        cout << endl;
        i++;
    }
}

*/


