/*

Search a 2D Matrix I


You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

Input: matrix = [[1,3,5,7],
               [10,11,16,20],
               [23,30,34,60]], 
               target = 3
Output: true



*/


#include<bits/stdc++.h>
using namespace std;

int binary(int arr[][3],int row,int col,int target)
{
    int s=0;
    int e=row*col-1;

    while(s<=e)
    {
        int mid=s+(e-s)/2;
        int element=arr[mid/col][mid%col]; //finding the mid element in the matrix
 
        if(element == target)
        {
            return 1;
        }

        if(element > target)
        {
            e=mid-1;
        }
        else{
            s=mid+1;
        }
    }
    return 0;
}

int main()
{
    int arr[3][3];
    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            cin>>arr[i][j];
        }
    }

    cout<<binary(arr,3,3,-1);
    return 0;
}