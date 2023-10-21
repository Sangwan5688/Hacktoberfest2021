#include<bits/stdc++.h>
using namespace std;

void waveForm(int arr[][3],int row,int col)
{
    for(int j=0;j<col;j++)
    {
        if(j&1)
        {
            for(int i=row-1;i>=0;i--)
            {
                cout<<arr[i][j]<<" ";

            }
        }else{
            for(int i=0;i<row;i++)
            {
                cout<<arr[i][j]<<" ";
            }
        }

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
    

    //printing array;
    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            cout<<arr[i][j]<<" ";
        }
        cout<<endl;
    }

    waveForm(arr,3,3);


    return 0;
}