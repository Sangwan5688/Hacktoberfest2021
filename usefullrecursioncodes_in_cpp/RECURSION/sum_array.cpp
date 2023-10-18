#include<bits/stdc++.h>
using namespace std;

int findsum(int arr[],int size)
{
    if(size==0)
    {
        return 0;
    }
    if(size==1)
    {
        return arr[0];
    }
    int sum=arr[0]+findsum(arr+1,size-1);
    return sum;

}

int main()
{
    int arr[5]={3,2,5,1,6}; 
    cout<<findsum(arr,5);
    return 0;
}