#include<bits/stdc++.h>
using namespace std;
 
int main(){
 
int t;
cin>>t;
while(t--){
    int n,k;
    cin>>n>>k;
    if(n==k || k==1){
        for(int i=1;i<=n;i++) cout<<i<<" ";
        cout<<endl;
    }
    else{
        int a=1,b=n;
        for(int i=1;i<=n;i++){
            if(i%2!=0){ cout<<b<<" ";  b--;}
            else { cout<<a<<" "; a++;  }
        }
        cout<<endl;
    }
 
 
}
 
    
}
