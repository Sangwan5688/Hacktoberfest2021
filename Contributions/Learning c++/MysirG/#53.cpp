#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

class Student{
private:
    int rollNo;
    string name;
    class Address{
    private:
        int houseNo,  pinCode;
        string street, city, state;
    public:
        Address() : houseNo(0), pinCode(0), street(""), city(""), state("") {};
        Address(int houseNo,int pinCode,string street,string city,string state){
            this->houseNo = houseNo, this->pinCode = pinCode;
            this->street = street, this->city = city, this->state = state;
        }
        Address(Address &a){
            this->houseNo = a.houseNo, this->pinCode = a.pinCode;
            this->street = a.street, this->city = a.city, this->state = a.state;           
        }

        void showAddress(){
            cout<<"House Number : "<<houseNo<<", Street : "<<street<<", City : "<<city<<", State : "<<state<<", Pin Code : "<<pinCode<<endl;
        }

        ~Address() {};
    };
    Address address;
public:
    Student() : rollNo(0), name("") {};
    Student(int rollNo,string name,int houseNo,int pinCode,string street,string city,string state){
        this->rollNo = rollNo, this->name = name;
        Address a(houseNo,pinCode,street,city,state);
        this->address = a;
    }

    void showData(){
        cout<<"Name : "<<name<<endl;
        cout<<"Roll Number : "<<rollNo<<endl;
        address.showAddress();
    }

    ~Student() {};
};

void solve(){
    Student s(39,"vishal kumar (vijay singh)",219,250001,"phase II saraswati vihar, Rohta Road","Meerut City","Uttar Pradesh");
    s.showData();

    // copy constructor of address 
    // Student::Address a(219,250001,"phase II saraswati vihar, Rohta Road","Meerut City","Uttar Pradesh");
    // only when it is public
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   