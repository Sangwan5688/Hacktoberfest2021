#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Product;
class Item;

class Item{
private:
    string name;
    float price;
public:
    Item() : name(""), price(0.0) {};
    Item(string name,float price) : name(name), price(price) {};

    string getName(){ return name; }
    float getPrice(){ return price; }

    ~Item() {};
};

class Product{
private:
    string name;
    float price;
public:
    Product() : name(""), price(0.0) {};
    Product(Item item){
        name = item.getName();
        price = item.getPrice();
    }

    operator pair<string,float>(){
        return {name,price};
    }

    void showData(){ cout<<name<<" "<<price<<endl; }

    ~Product() {};
};

void solve(){
    Item watch("fastrack",150.325);
    Product watchList = watch;
    watchList.showData();

    pair<string,float> pr = watchList;
    cout<<pr.first<<" "<<pr.second<<endl;
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   