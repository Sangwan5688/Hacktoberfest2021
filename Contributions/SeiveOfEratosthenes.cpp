//@sidhartha8011

#include<iostream>
using namespace std;
void prime(int n){
    int arr[1000]={0};
    for(int i=2;i<=n;i++){
        if(arr[i]==0){
            for(int j=i*i;j<n;j+=i){
                arr[j]=1;
            }
        }
    }
    for (int i = 2; i < n; i++)
    {
        if(arr[i]==0)
            cout<<i<<"  ";
    }
    
}
int main()
{   int n;
    cout<<"enter the number upto which you want to display the prime number";
    cin>>n;
    prime(n);
    return 0;
}
