#include <bits/stdc++.h>
using namespace std;
int maximum(int arr[],int n)
{
    //this function returns the max value present in an array
    int max=0,i;
    for(i=0;i<n;i++)
    {
        if(arr[i]>max)
            max=arr[i];
    }
    return max;
}
void frequency_sort(int ar[],int n)
{
    int i,count=0,max;
    max=maximum(ar,n);     //function to find max value in array.
    int freq[max+1]={0};        //creating an array of max value given in an array.
    for(i=0;i<n;i++)
    {
        freq[ar[i]]++;          //updating frequencies of the frequency array.
    }
    for(i=0;i<=max;i++)
    {
        if(freq[i]>0)       //checking if that index exist in array
        {
            while(freq[i]--)
            {
                ar[count]=i;        //if an element occured more than once all occurence of the
                count++;            //element needs to be stored in array.
            }
        }
    }
}
int main()
{
    //Driver Code
    int n,count=0,i,max=0;
    int ar[]={5,1,1,3,4,2};
    n=(sizeof(ar)/sizeof(ar[0]));
    cout<<"ARRAY BEFORE SORTING"<<endl;
    for(i=0;i<n;i++)
    {
        cout<<ar[i]<<' ';
    }
    cout<<endl;
    frequency_sort(ar,n);
    cout<<"ARRAY AFTER SORTING"<<endl;
    for(i=0;i<n;i++)
    {
        cout<<ar[i]<<' ';
    }
    return 0;
}
