#include "bits/stdc++.h"
using namespace std;

#define int    long long int 
 
/* Abstract Function - forcing children to have particular properties */

class Person{
private:
    int age;
public:
    Person() {};

    virtual void communication() = 0; // do nothing function | pure virtual func
    void setAge(int x){ age = x; }
    void readAge(){ cout<<"Age is : "<<age<<endl; }

    ~Person() {};
};

class Student:public Person{
public:
    Student() {};

    void communication(){ // overidding
        cout<<"Student talk"<<endl;
    }

    ~Student() {};
};

class Faculty:public Person{
private:
    string subject;
public:
    Faculty() {};

    void communication() = 0;
    void setSubject(string x){ subject = x; }
    void readSubject(){ cout<<"Subject is : "<<subject<<endl; }

    ~Faculty() {};
};

class Faculty1:public Faculty{
public:
    Faculty1() {};

    void communication(){
        cout<<"Faculty speak"<<endl;
    }
    void subjectValue(string s){ setSubject(s); }
    void subjectRead(){ readSubject(); }

    ~Faculty1() {};
};

void solve(){ 
    Student *obj,o1;
    obj = &o1;
    obj->communication();
    obj->setAge(4);
    obj->readAge();

    // Faculty *ptr,o2;  we have to make descendant class to access it
    // ptr = &o2;
    // ptr->setSubject("Maths");
    // ptr->readSubject();

    Faculty1 *ptr,o2;
    ptr = &o2;
    ptr->communication();
    ptr->subjectValue("Maths");
    ptr->subjectRead();
    obj->setAge(24);
    obj->readAge();
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   