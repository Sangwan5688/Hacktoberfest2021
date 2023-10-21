#include<bits/stdc++.h>
using namespace std;

void col_sum(int arr[][3],int row,int col)
{
    cout<<"Printing col sum------> ";
    for(int i=0;i<row;i++)
    {
        int sum=0;
        for(int j=0;j<col;j++)
        {
            sum+=arr[j][i];
            
        }
        cout<<sum<<" ";
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

    //printing the array
    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }

    col_sum(arr,3,3);
    return 0;
}