#include<iostream>
using namespace std;

void shiftZeroes(int *a,int n)
{
    int count=0;
    int pos=0;
    int i;
for(i=0;i<n;i++){
        if(a[i]==0){
            count++;
        }
        else{
            a[pos++]=a[i];
        }
}
cout<<count<<"zeroes";
for(i=n-count;i<n;i++)
{
   a[i]=0;
}
for(i=0;i<n;i++)
    cout<<a[i]<<",";
}
int main(){
int a[]={1,0,2,0,0,3,0,0,0,4,0,5,0};
int n=sizeof(a)/sizeof(int);
shiftZeroes(a,n);
}
