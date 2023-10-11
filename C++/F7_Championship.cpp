#include<bits/stdc++.h>
using namespace std;
int a[300000];
bool dect(int x,int y){
    return x>y;
}
int main() {

	// Write your code here
    int n;
    cin>>n;
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
    sort(a,a+n,dect);
    int s=0,b=0;
    for(int i=0;i<n;++i){
        s=s+(a[i]+n>=b);
        b=max(b,a[i]+i+1);
    }
    cout<<s<<"\n";
}