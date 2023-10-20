#include<bits/stdc++.h>
using namespace std;

void spiral(int arr[][3],int row,int col)
{
    int count=0;
    int total=row*col;

    int startingRow=0;
    int startingCol=0;
    int endingRow=row-1;
    int endingCol=col-1;

    while(count<total)
    {
        //print starting row
        for(int i=startingCol; count<total && i<=endingCol;i++)
        {
            cout<<arr[startingRow][i]<<" ";
            count++;
        }
        startingRow++;
    
        //print ending col

        for(int i=startingRow; count<total && i<=endingRow;i++){
            cout<<arr[i][endingCol]<<" ";
            count++;
        }
        endingCol--;

        //print ending row;
        for(int i=endingCol; count<total && i>=startingCol;i--)
        {
            cout<<arr[endingRow][i]<<" ";
            count++;
        }
        endingRow--;

        //print starting col;
        for(int i=endingRow; count<total && i>=startingRow;i--)
        {
            cout<<arr[i][startingCol]<<" ";
            count++;
        }
        startingCol++;
    }
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


    spiral(arr,3,3);


    return 0;
}