//QUICK SORT

#include<bits/stdc++.h>
using namespace std;

int partition(int arr[],int s,int e)                           //creating the partition function
{
    int pivot=arr[s];                                          //creating the pivot element as first element
    int c=0;                                                   //storing the count as 0
    for(int i=s+1;i<=e;++i)                                    //now applying the loop from start + 1 {(bcz pivot is arr[s])} to e for the array
    {
        if(arr[i]<=pivot)                                      //if any element in the array is greater then pivot=arr[s]
        {
            c++;                                               //then count++
        }
    }

    int pivotINDEX=s+c;                                        //here initilizing the pivotindex from start+count where the pivot have to go
    swap(arr[pivotINDEX],arr[s]);                              //now swapping the pivot to the correct place

    int i=s,j=e;                                               //now creat i=start and j=end
    while(i<pivotINDEX && j>pivotINDEX)                        //now i must be less then pivotindex and j must be greater then pivotindex
    {
        while(arr[i]<=pivot)                                   //if any element on the left is smaller or equal to pivot then simply it is good so i++
        {
            i++;
        }
        while(arr[j]>pivot)                                    //if the any element on the right is greater then pivot then it is good so j--
        {
            j--;
        }
        if(i<pivotINDEX && j>pivotINDEX)                       //now if any element not follow the upper two while condition it means they are at the wrong side of pivot
        {
            swap(arr[i++],arr[j--]);                           //swapping these elements
        }
    }
    return pivotINDEX;                                         //returning the pivotindex as it is placed correctly
}

void quicksort(int arr[],int s,int e)
{
    if(s>=e) return;                                            //if the s exceeds the e then return 

    int p=partition(arr,s,e);                                   //creating the p which partition the array basically partition gives the pivotindex to it

    quicksort(arr,s,p-1);                                       //applying the quick sort from start to partition - 1
    quicksort(arr,p+1,e);                                       //applying the quick sort from partition + 1 to e
}

int main()
{
    int arr[]={3,2,1,1,1,1,0,0,-1,-2,-2,5,3,4,2,8,10,9};
    int n=sizeof(arr)/sizeof(arr[0]);
    quicksort(arr,0,n-1);                                       //calling quicksort                               
    for(int i=0;i<n;i++)
    {
        cout<<arr[i]<<" ";
    }
    return 0;
}