#include "bits/stdc++.h"
using namespace std;

struct book{
private:
    int bookId;
    string title;
    float price;
public:
    void input(){
        cin>>bookId;
        cin.ignore();
        getline(cin,title);
        cin>>price;
        if(price < 0) price = -price; // stoping wrong value
        if(bookId < 0) bookId = -bookId; // stoping wrong value
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
    // cout<<b1.bookId<<endl;   preventing external data maunplation
    // cin.getline(b1.title,80) 80 is limit
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}