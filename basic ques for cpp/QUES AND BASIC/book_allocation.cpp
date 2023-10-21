//**********************************************AllOCATE MINIMUM NUMBER OF PAGES************************************************

#include <bits/stdc++.h>
using namespace std;


bool isPossible(int arr[], int size, int student, int mid)
{
    int studentCount = 1;
    int pageSum = 0;
    for (int i = 0; i < size; i++)
    {
        if (pageSum + arr[i] <= mid)
        {
            pageSum += arr[i];
        }
        else
        {
            studentCount++;
            if (studentCount > student || arr[i] > mid)
            {
                return false;
            }
            pageSum = arr[i];
        }
    }
    return true;
}

int allocateBooks(int arr[], int size, int student)
{
    //int start = min(arr,size);
    int low=INT_MAX;
    int sum = 0;
    for (int i = 0; i < size; i++)
    {
        sum += arr[i];
        low=min(low,arr[i]);
    }
    int end = sum;
    int start=low;
    int ans = -1;

    if(size<student) return -1;

    while (start <= end)
    {
        int mid = start + (end - start) / 2;
        if (isPossible(arr, size, student ,mid))
        {
            ans = mid;
            end = mid - 1;
        }
        else
        {
            start = mid + 1;
        }
    }
    return ans;
}

int main()
{
    int pages[] = {10, 20, 30, 40};
    int n = sizeof pages / sizeof pages[0];
    int m = 2;
    cout<<"Minimum number of pages : "
        <<allocateBooks(pages,n,m);

    return 0;
}