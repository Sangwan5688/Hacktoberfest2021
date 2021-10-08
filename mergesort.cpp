//merge sort//
#include <iostream>
using namespace std;
void merge(int a[], int n, int lb, int mid, int ub)
{
    int i = lb;
    int j = mid + 1;
    int k = lb;
    int temp[n];
    while (i <= mid && j <= ub)
    {
        if (a[i] <= a[j])
        {
            temp[k] = a[i];
            i++;
        }
        else
        {
            temp[k] = a[j];
            j++;
        }
        k++;
    }
    if (i > mid)
    {
        while (j <= ub)
        {

            temp[k] = a[j];
            j++;
            k++;
        }
    }
    else
    {
        while (i <= mid)
        {

            temp[k] = a[i];
            i++;
            k++;
        }
    }
    for (int k = lb; k <= ub; k++)
    {
        a[k] = temp[k];
    }
}
void mergesort(int a[], int n, int lb, int ub)
{
    if (lb < ub)
    {

        int mid = (lb + ub) / 2;
        mergesort(a, n, lb, mid);
        mergesort(a, n, mid + 1, ub);
        merge(a, n, lb, mid, ub);
    }
    else
        return;
}
int main()
{
    int n;
    cout << "ENTER THE SIZE OF AN ARRAY" << endl;
    cin >> n;
    int a[n];
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
    }
    cout << "DISPLAYING ORIGINAL ARRAY" << endl;
    for (int i = 0; i < n; i++)
    {
        cout << a[i] << " " << endl;
    }
    mergesort(a, n, 0, n - 1);
    cout << "DISPLAYING SORTED  ARRAY" << endl;
    for (int i = 0; i < n; i++)
    {
        cout << a[i] << " " << endl;
    }

    return 0;
}