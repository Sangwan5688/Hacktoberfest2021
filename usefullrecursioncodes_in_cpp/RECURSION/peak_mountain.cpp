//peak in a moutain array by recursion

#include<bits/stdc++.h>
using namespace std;

int peak(int arr[],int size,int s,int e)
{
    if(s==e) return s;

    int mid=s+(e-s)/2;

    if(arr[mid]<arr[mid+1])
    {
        return peak(arr,size,mid+1,e);
    }else{
        return peak(arr,size,s,mid);
    }
}

int main()
{
    int arr[11]={1,23,34,35,36,36,37,40,41,1100,110};
    cout<<endl;
    cout<<peak(arr,5,0,10);
    return 0;
}