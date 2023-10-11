#include<iostream>
using namespace std;

void towerOfHanoi(int n, char source,char dest,char helper){
    if(n==0){
        return;
    }
    towerOfHanoi(n-1,source,helper,dest);
    cout<<"Move from "<<source<<" to "<<dest<<endl;
    towerOfHanoi(n-1,source,dest,helper);
}

int main(){
    towerOfHanoi(3,'A','C','B');
    return 0;
}