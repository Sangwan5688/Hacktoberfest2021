#include "bits/stdc++.h"
using namespace std;

struct book{
    int bookId;
    string title;
    float price;
}b2;

book input(){
    book b1;
    cin>>b1.bookId;
    cin.ignore();
    getline(cin,b1.title);
    cin>>b1.price;
    return b1;
}

void print(book& b2){
    cout<<"Book Id : "<<b2.bookId<<endl;
    cout<<"Book title : "<<b2.title<<endl;
    cout<<"Book price : "<<b2.price<<endl;
    return;
}

void solve(){
    book b1 = input();

    print(b1);
    // cin.getline(b1.title,80) 80 is limit
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}