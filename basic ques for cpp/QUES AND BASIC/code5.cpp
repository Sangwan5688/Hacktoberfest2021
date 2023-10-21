#include<bits/stdc++.h>
using namespace std;

void sort_array(int arr[],int n)
{
    for(int i=0;i<n-1;i++)
    {
        int minIndex=i;
        for(int j=i+1;j<n;j++)
        {
            if(arr[j]<arr[minIndex])
            {
                minIndex=j;
            }
        }
        int temp=arr[i];
        arr[i]=arr[minIndex];
        arr[minIndex]=temp;
    }

}

int main()
{
    int arr[]={0,23,2,1,-1};
    sort_array(arr,5);
    for(int i=0;i<5;++i)
    {
        cout<<arr[i]<<" ";
    }
}