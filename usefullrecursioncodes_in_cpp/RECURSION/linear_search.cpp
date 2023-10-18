#include<bits/stdc++.h>
using namespace std;

bool find(int arr[],int size,int key)
{
    //base condition
    if(size==0)
    {
        return 0;
    }
    if(arr[0]==key)
    {
        return 1;
    }else{
        return find(arr+1,size-1,key);
    }
}

int main()
{
    int key;
    cin>>key;
    int arr[5]={3,5,1,2,6};

    if(find(arr,5,key))
    {
        cout<<"FOUND";
    }else{
        cout<<"NOT FOUND";
    }
    return 0;
}