#include<bits/stdc++.h>
using namespace std;
int main()
{
    int arr[3][3],brr[3][3],result[3][3];;
    cout<<"enter the elements of array 1 : ";
    for(int i=0;i<3;++i)
    {
        for(int j=0;j<3;++j)
        {
            cin>>arr[i][j];
        }
    }


    cout<<"enter the elements of array 2 : "; 
    for(int i=0;i<3;++i)
    {
        for(int j=0;j<3;++j)
        {
            cin>>brr[i][j];
        }
    }

    for(int i=0;i<3;++i)
    {
        for(int j=0;j<3;++j)
        {
            result[i][j]=0;
            for(int k=0;k<3;++k)
            {
                result[i][j]+=arr[i][j]*brr[i][j];
            }
        }
    }


    cout<<" : PRINTING THE PRODUCT ARRAY : ";

    for(int i=0;i<3;++i)
    {
        for(int j=0;j<3;++j)
        {
            cout<<result[i][j]<<" ";
        }
    }




}