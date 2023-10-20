#include<bits/stdc++.h>
using namespace std;

void row_wise_sum(int arr[][3],int row,int col)
{
    cout<<"Printing row wise sum---> ";
    for(int i=0;i<row;i++)
    {
        int sum=0;
        for(int j=0;j<col;j++)
        {
            sum+=arr[i][j];

        }
        cout<<sum<<" ";
    }
}

int main()
{
    //taking row wise input
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

    row_wise_sum(arr,3,3);

    return 0;



}