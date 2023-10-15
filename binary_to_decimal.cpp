#include<iostream>
#include<math.h>
using namespace std;
int main(){
    cout<<"Program to convert decimal to binary"<<endl;
    cout<<"Enter number to convert it into binary"<<endl;
    int n;
    cin>>n;
    int ans=0;
    int i=0;
    while(n!=0){
        int bit=n&1;
        ans=(bit*pow(10,i))+ans;
        n=n>>1;
        i++;
    }
    cout<<"Answer is " <<ans<<endl;
}




//This is a small c++ program which will convert any number into binary form...
