//BUBBLE SORT USING RECURSION

#include<bits/stdc++.h>
using namespace std;

void bubbleSort(int *arr,int endIndex)
{
    if(endIndex==0) return ;

    for(int i=0;i<endIndex;i++)
    {
        if(arr[i]>arr[i+1])
        {
            swap(arr[i],arr[i+1]);
        }
    }
    bubbleSort(arr,endIndex-1);
}

int main()
{
    int arr[]={5,3,2,1,0,-1};
    int n=sizeof(arr)/sizeof(arr[0]); //size of array

    bubbleSort(arr,n-1);

    for(int i=0;i<n;++i)
    {
        cout<<arr[i]<<" ";
    }
    
    return 0;
}