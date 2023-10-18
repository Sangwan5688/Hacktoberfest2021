#include<bits/stdc++.h>
using namespace std;

long long merge(int arr[],int s,int e){
    int mid=s+(e-s)/2;
    long long inv=0;
    int n1=mid-s+1;
    int n2=e-mid;
    int a[n1],b[n2];
    for(int i=0;i<n1;i++){
        a[i]=arr[s+i];
    } 

    for(int i=0;i<n2;i++){
        b[i]=arr[mid+1+i];
    }

    int i=0,j=0,k=s;
    while(i<n1 && j<n2){
        if(a[i]<=b[j]){
            arr[k++]=a[i++];
            
        }else{
            arr[k]=b[j];
            inv+=(n1-i);
            k++,j++;
        }
    }

    while(i<n1){
        arr[k++]=a[i++];
    }
    while(j<n2){
        arr[k++]=b[j++];
    }

    return inv;
}

long long mergeSORT(int arr[],int s,int e){
    long long inv=0;
    if(s<e){
        int mid=s+(e-s)/2;
        inv+=mergeSORT(arr,s,mid);
        inv+=mergeSORT(arr,mid+1,e);
        inv+=merge(arr,s,e);
    }
    return inv;
}

int32_t main()
{
    int arr[]={3,2,1};
    int n=sizeof(arr)/sizeof(arr[0]);
    cout<<mergeSORT(arr,0,n-1);
    return 0;
}