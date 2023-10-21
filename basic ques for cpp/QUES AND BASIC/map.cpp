// STL c++ MAP

#include<bits/stdc++.h>
using namespace std;
int main()
{
    map<int,string> m; // this is sorted map

    m[1]="aman"; // 1 is mapped with aman
    m[7]="deep"; // 7 is mapped with deep
    m[3]="parihar";  // 3 is mapped with parihar

    cout<<" : BEFORE ERASE : "<<endl;
    for(auto i:m){
        cout<<i.first<<" "<<i.second<<endl; //way to print whole map
    }
    //cout<<endl;

    cout<<"finding 7 : "<<m.count(7)<<endl; // returns 1 if true
    cout<<"finding -7 : "<<m.count(-7)<<endl; // returns 0 if fasle

    
    m.erase(7); // this removes 7 which is mapped with deep
    cout<<" : AFTER ERASE : "<<endl;
    for(auto i:m){
        cout<<i.first<<" "<<i.second<<endl; //way to print whole map
    }





    return 0;
}