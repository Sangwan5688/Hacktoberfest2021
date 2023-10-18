#include<bits/stdc++.h>
using namespace std;

int binarySearch(int arr[],int s,int e,int k)
{
    //base case no element found
    if(s>e) return -1;

    int mid=s+(e-s)/2;
    //base case 2 element found
    if(arr[mid]==k) return mid;

    if(arr[mid]<k)
    {
        return binarySearch(arr,mid+1,e,k);
    }else{
        return binarySearch(arr,s,mid-1,k);
    }
}

int main()
{
    int arr[6]={2,4,6,18,22,32};
    int k;
    cin>>k;
    cout<<binarySearch(arr,0,6,k);

    return 0;
}