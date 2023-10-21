#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cout << "enter the number : ";
    cin >> n;
    bool isprime = 1;
    int i = 2;
    while (i < n)
    {
        if (n % i == 0)
        {
            isprime = 0;
            break;
        }
        i++;
    }
    if (isprime == 0)
    {
        cout << "not prime" << endl;
    }
    else
    {
        cout << "prime" << endl;
    }
}