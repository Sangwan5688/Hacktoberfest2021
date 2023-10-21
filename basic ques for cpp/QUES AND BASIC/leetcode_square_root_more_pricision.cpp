// more pricision sqrt

#include <bits/stdc++.h>
using namespace std;

long long int binarySearch(int n)
{
    long long int s = 0, e = n, ans = -1;
    long long int mid = s + (e - s) / 2;
    while (s <= e)
    {

        if (mid * mid == n)
            return mid;

        if (mid * mid > n)
        {
            e = mid - 1;
        }
        else
        {
            ans = mid;
            s = mid + 1;
        }
        mid = s + (e - s) / 2;
    }
    return ans;
}

double morePre(int n, int pri, int integer_part)
{
    double factor = 1;
    double ans = integer_part;
    for (int i = 0; i < pri; i++)
    {
        factor = factor / 10;
        for (double j = ans; j * j < n; j = j + factor)
        {
            ans = j;
        }
    }
    return ans;

    // return binarySearch(n);
}

int main()
{
    int num;
    cout << "Enter the number # ";
    cin >> num;
    int integer_part = binarySearch(num);
    //cout<<tempsol;
    cout << "Square root of " << num << " # " << morePre(num, 3, integer_part);
    return 0;
}