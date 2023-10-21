#include<bits/stdc++.h>
using namespace std;

int pivot(int *arr,int size,int s,int e)
{
    if(s==e) return s;

    int mid=s+(e-s)/2;

    if(arr[mid]>=arr[0])
    {
        return pivot(arr,size,mid+1,e);
    }else{
        return pivot(arr,size,s,mid);
    }

}

int main()
{
    int arr[7]={6,7,10,1,2,3,4}; //here the pivot element '1' so the index is 3
    cout<<pivot(arr,7,0,7);
    return 0;
}