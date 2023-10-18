/* ******************************FIRST AND LAST POSITION OF AN ELEMENT IN SORTED ARRAY********************************************
Q) you have been given a sorted array/list arr consisting of 'N' elements.You are also given an integer 'K' now your task is to 
find the first and last occurence of 'K' in arr; 
*/


#include <bits/stdc++.h>
using namespace std;

int firstOcc(int arr[], int s, int e, int size, int key)
{
    // base case
    if (s > e)
        return -1;

    int mid = s + (e - s) / 2;

    if (arr[mid] == key)
    {
        if (mid == 0 || arr[mid - 1] != key)
        {
            return mid;
        }
        else
        {
            return firstOcc(arr, s, mid - 1, size, key);
        }
    }
    else if (arr[mid] < key)
    {
        return firstOcc(arr, mid + 1, e, size, key);
    }
    else
    {
        return firstOcc(arr, s, mid - 1, size, key);
    }
}

int lastOcc(int arr[], int s, int e, int size, int key)
{
    if (s > e)
        return -1;

    int mid = s + (e - s) / 2;

    if (arr[mid] == key)
    {
        if (mid == size - 1 || arr[mid + 1] != key)
        {
            return mid;
        }
        else
        {
            return lastOcc(arr, mid + 1, e, size, key);
        }
    }
    else if (arr[mid] < key)
    {
        return lastOcc(arr, mid + 1, e, size, key);
    }
    else
    {
        return lastOcc(arr, s, mid - 1, size, key);
    }
}

int main()
{
    int arr[7] = {1, 2, 2, 3, 3, 4, 4};
    cout << firstOcc(arr, 0, 6, 7, 4) << " " << lastOcc(arr, 0, 6, 7, 4);
    return 0;
}