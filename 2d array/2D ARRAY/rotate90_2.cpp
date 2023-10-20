//Rotate the matrix by 90 // done by ---> 2 approach more good 100% beats


#include<bits/stdc++.h>
using namespace std;

void rotate90(int arr[][3],int row,int col)
{
    for(int i=0;i<row;i++)
    {
        for(int j=i;j<col;j++)
        {
            swap(arr[i][j],arr[j][i]);
        }
        int startingCol=0;
        int endingCol=col-1;
        while(startingCol<=endingCol)
        {
            swap(arr[i][startingCol],arr[i][endingCol]);
            startingCol++,endingCol--;
        }
    }
    cout<<"THE 90 DEGREE ROTATED ARRAY IS : "<<endl;

    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            cout<<arr[i][j]<<" ";
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