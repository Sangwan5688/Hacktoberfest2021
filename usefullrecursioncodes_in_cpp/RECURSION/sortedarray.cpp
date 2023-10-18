#include <bits/stdc++.h>
using namespace std;

bool issorted(int arr[], int size)
{
    if (size == 0 || size == 1)
    {
        return true;
    }

    if (arr[0] > arr[1])
    {
        return false;
    }
    else
    {
        return issorted(arr + 1, size - 1);
    }
}

int main()
{
    int arr[5];
    for (int i = 0; i < 5; i++)
    {
        cin >> arr[i];
    }

    if (issorted(arr, 5))
    {
        cout << "yes";
    }
    else
    {
        cout << "no";
    }

    return 0;
}