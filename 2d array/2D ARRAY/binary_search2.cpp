/*
Search a 2D Matrix II

Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.


Input: matrix = [[1,4,7,11,15]
                [2,5,8,12,19],
                [3,6,9,16,22],
                [10,13,14,17,24],
                [18,21,23,26,30]], 
                target = 5
Output: true

*/


#include<bits/stdc++.h>
using namespace std;

bool bin(int arr[][3],int row,int col,int target)
{
    int rowIndex=0;
    int colIndex=col-1;

    while(rowIndex<row && colIndex>=0)
    {
        int element = arr[rowIndex][colIndex];

        if(element == target)
        {
            return 1;
        }

        if(element < target)
        {
            rowIndex++;
        }else{
            colIndex--;
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

    if(bin(arr,3,3,3))
    {
        cout<<"YES";
    }else{
        cout<<"NO";
    }

    return 0;
}

