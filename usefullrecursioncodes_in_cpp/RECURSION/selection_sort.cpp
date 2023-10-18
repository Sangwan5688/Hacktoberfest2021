//SELECTION SORT

#include<bits/stdc++.h>
using namespace std;

void selectionSORT(int arr[],int beginIndex,int size)
{
    if(beginIndex>=size-1) return;

    int minIndex=beginIndex;
    for(int i=beginIndex;i<size;++i)
    {
        if(arr[i]<arr[minIndex])
        {
            minIndex=i;
        }
    }
    swap(arr[beginIndex],arr[minIndex]);

    selectionSORT(arr,beginIndex+1,size);


}

int main()
{
    int arr[]={4,2,1,10,-1,2,32,3};
    int n=sizeof(arr)/sizeof(arr[0]);

    selectionSORT(arr,0,n);

    cout<<endl;

    for(int i=0;i<n;i++)
    {
        cout<<arr[i]<<" ";
    }
    return 0;
}