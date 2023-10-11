#include<iostream>
using namespace std;

int main(){
    int n;
    cout<<"Enter a number:";
    cin>>n;
    int number=1;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=i;j++){
            cout<<number<<" ";
            number++;
        }
        cout<<endl;
    }
    return 0;
}