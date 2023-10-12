#include "bits/stdc++.h"
using namespace std;

struct book{
    int bookId;
    string title;
    float price;

    void input(){
        cin>>bookId;
        cin.ignore();
        getline(cin,title);
        cin>>price;
    }

    void print(){
        cout<<"Book Id : "<<bookId<<endl;
        cout<<"Book title : "<<title<<endl;
        cout<<"Book price : "<<price<<endl;
        return;
    }
};

void solve(){
    book b1;

    b1.input();
    b1.print();
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}