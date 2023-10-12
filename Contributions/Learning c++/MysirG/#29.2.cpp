#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Array{
private:
    vector<int> v;
public:
    Array() : v(5) {};

    void insert(int key,int value){
        if(key < 5) v[key] = value;
    }

    void showValue(){ for(auto i : v) cout<<i << endl; cout<<endl; }

    ~Array() {};
};

class Stack:public Array{
private: 
    int top;
public:
    Stack() : top(0) {};

    void push(int x){
        insert(top,x);
        top++;
    }

    void showData(){ showValue(); }

    ~Stack() {};
};

void solve(){ 
    Stack st;

    // st.insert(0,5);
    // st.insert(4,45);
    // st.showValue(); // 5 0 0 0 45

    st.push(5);
    st.push(6);
    st.showData(); // 5 6 0 0 0
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   