//maximum and minimum elements in an array using for loop in user defined function



#include<bits/stdc++.h>
using namespace std;
int minarray(int arr[],int size)
{
    int min=INT_MAX;
    for(int i=0;i<size;i++)
    {
        if(arr[i]<min)
        {
            min=arr[i];
        }
    }
    return min;
}
int maxarray(int arr[],int size)
{
    int max=INT_MIN;
    for(int i=0;i<size;i++)
    {
        if(arr[i]>max)
        {
            max=arr[i];
        }
    }
    return max;
}
int main()
{
    int size;
    cin>>size;

    int arr[1000];
    for(int i=0 ; i<size ; i++)
    {
        cin>>arr[i];
    }

    cout<<maxarray(arr,size)<<endl;
    cout<<minarray(arr,size);
    return 0;
}