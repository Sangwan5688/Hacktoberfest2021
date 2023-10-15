#include "bits/stdc++.h"
using namespace std;

struct book{
    int bookId;
    string title;
    float price;
};

void solve(){
    book b1;
    cin>>b1.bookId;
    cin.ignore();
    getline(cin,b1.title);
    cin>>b1.price;

    cout<<"Book Id : "<<b1.bookId<<endl;
    cout<<"Book title : "<<b1.title<<endl;
    cout<<"Book price : "<<b1.price<<endl;

    // cin.getline(b1.title,80) 80 is limit
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}