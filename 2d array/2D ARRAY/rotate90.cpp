//Rotate the matrix by 90 // done by ---> amandeep singh parihar

#include<bits/stdc++.h>
using namespace std;

void rotate90(int arr[][3],int row,int col)
{
    int brr[row][col]={0};
    for(int i=0;i<row;i++)
    {
        for(int j=0;j<col;j++)
        {
            brr[i][j]=arr[j][i];
        }
    }
    int startingCol=0;
    int endingCol=col-1;
    int i=0;
    while(startingCol<=endingCol)
    {
        for(int i=0;i<row;i++)
        {
            swap(brr[i][startingCol],brr[i][endingCol]);
        }
        startingCol++,endingCol--;

    }
    cout<<"THE 90 DEGREE ROTATED ARRAY IS : "<<endl;

    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            cout<<brr[i][j]<<" ";
        }
        cout<<endl;
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
    cout<<"PRINTING THE ARRAY"<<endl;

    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;   
    }

    rotate90(arr,3,3);
}