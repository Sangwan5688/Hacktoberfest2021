//****MERGE SORT*****

#include<bits/stdc++.h>
using namespace std;

void merge(int arr[],int s,int e)
{
    int mid=s+(e-s)/2;
    int size1=mid-s+1,size2=e-mid;   //building the size of the two arrays;
    int arr1[size1],arr2[size2];     //creating the two arrays with desirable sizes;

    int k=s;                         //creating third pointer of main array which starts from s=0,so that we can fill it properly
    for(int i=0;i<size1;i++){        //here we are copying the two divided array into the new arr1 with its pointer i
        arr1[i]=arr[k++];            
    }

    k=mid+1;                         //here the third pointer starts from mid+1 bcz of arr2 start from the same
    for(int i=0;i<size2;i++){        //here we are copying the two divided array into the new arr2 with its pointer j
        arr2[i]=arr[k++];
    }

    int i=0,j=0;                     //pointer i,j,k=s;
    k=s;                
    while(i<size1 && j<size2){       //fill the main array with the smallest element in the two array
        if(arr1[i]>arr2[j]){         //if the arr2 has small elemetn
            arr[k++]=arr2[j++];      //fill the main arr with small element which is in arr2
        }else{
            arr[k++]=arr1[i++];      //fill the main arr with small elememt which is in arr1
        }
    }

    while(i<size1){                  //here if the arr2 exhausted so we copying the rest element of arr1 in main array
        arr[k++]=arr1[i++];
    }

    while(j<size2){                  //here if the arr1 exhausted so we copying the rest element of arr2 in main array
        arr[k++]=arr2[j++];
    }
}


void mergeSORT(int arr[],int s,int e)
{
    if(s==e) return ;                //here if s>=e it means one element array is left

    int mid=s+(e-s)/2;                      

    mergeSORT(arr,s,mid);            //applying the mergesort in the first part of arr from start to mid
    mergeSORT(arr,mid+1,e);          //applying the mergesort in the second part of arr from mid+1 to end

    merge(arr,s,e);                  //now merging the two parts of array int the main array

}

int main()
{
    int arr[]={4,3,2,1,0,12,-2,12,0,-1,-1};
    int n=sizeof(arr)/sizeof(arr[0]);

    cout<<endl;
    mergeSORT(arr,0,n-1);
    cout<<endl;
    for(int i=0;i<n;i++)
    {
        cout<<arr[i]<<" ";
    }
    cout<<endl;
    return 0;
}