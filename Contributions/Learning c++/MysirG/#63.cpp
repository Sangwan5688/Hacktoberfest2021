#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

/* Function overload area */
float area(float radius){ return 3.1421*radius*radius; }
float area(float length,float breadth){ return length*breadth; }

/* define time class */
class Time{
private:
    int hour,minute,second;
public:
    Time() : hour(0), minute(0), second(0) {};
    Time(int h,int m,int s) : hour(h), minute(m), second(s) {};

    void showTime(){ cout<<hour<<"hr : "<<minute<<"mn : "<<second<<"sc"<<endl; }
    void normalize();

    /* overload + operator in time */
    Time operator+(Time &t){
        Time temp;
        temp.hour = hour + t.hour;
        temp.minute = minute + t.minute;
        temp.second = second + t.second;
        temp.normalize();
        return temp;
    }

    ~Time() {};
};

void Time::normalize(){
    minute = (minute + second)/60;
    second = second%60;
    hour = (hour + minute)/60;
    minute = minute%60;
}

/* Implement Array ADT */
class ArrayADT{
    int capacity,lastIndex;
    int *ptr;
public:
    ArrayADT() : capacity(0), lastIndex(0) { ptr = nullptr; };
    ArrayADT(ArrayADT& arr){
        this->capacity = arr.capacity;
        this->lastIndex = arr.lastIndex;

        ptr = new int[arr.capacity];
        for (int i = 0; i < arr.lastIndex; ++i){
            ptr[i] = arr.ptr[i]; // 🔥
        }
    }

    void createArray(int capacity);
    int getItem(int index);
    void setItem(int index,int value);
    void editItem(int index,int value);
    int countItems();
    void removeItem(int index);
    int searchItem(int value);
    void sortArray();

    friend ostream& operator<<(ostream&,ArrayADT);

    ~ArrayADT() {
        delete[] ptr;
    };
};

void ArrayADT::createArray(int capacity){
    this->capacity = capacity;
    this->lastIndex = -1;
    this->ptr = new int[capacity];
}

int ArrayADT::getItem(int index){
    if(lastIndex == -1){
        cout<<"List is Empty"<<endl;
        return -1;
    }
    if(index > lastIndex or index < 0){
        cout<<"Either Invalid Index or underflow"<<endl;
        return -1;
    }
    // return *(this->ptr + index);
    return (ptr[index]); // 🔥
}

void ArrayADT::setItem(int index,int value){
    int i = 0;
    if(lastIndex == capacity - 1){
        cout<<"Overflow"<<endl;
    }else if(index > capacity - 1 or index < 0 or index > lastIndex + 1){
        cout<<"Either Invalid Index or underflow"<<endl;
    }else if(index <= lastIndex){
        lastIndex++;
        i = lastIndex;
        while(i != index){
            ptr[i] = ptr[i-1];
            i--;
        }
        ptr[index] = value;
    }else if(index == lastIndex + 1){
        lastIndex++;
        ptr[index] = value;
    }
}

void ArrayADT::editItem(int index,int value){
    if(index < 0 or index > lastIndex){
        cout<<"Either Invalid Index or underflow"<<endl;
    }else ptr[index] = value;
}

int ArrayADT::countItems(){ return lastIndex + 1; }

void ArrayADT::removeItem(int index){
    int i = 0;
    if(index < 0 or index > lastIndex){
        cout<<"Either Invalid Index or underflow"<<endl;
    }else if(index < lastIndex){
        i = index;
        while(i != lastIndex){
            ptr[i] = ptr[i+1];
            i++;
        }
        lastIndex--;
    }else if(index == lastIndex){
        lastIndex--;
    }
}

int ArrayADT::searchItem(int value){
    if(lastIndex == -1){
        cout<<"List is Empty"<<endl;
        return -1;
    }
    for (int i = 0; i < lastIndex; ++i){
        if(ptr[i] == value) return i;
    }
    return -1;
}

void ArrayADT::sortArray(){
    sort(ptr,ptr+lastIndex+1);
}

ostream& operator<<(ostream& dout,ArrayADT arr){
    if(arr.lastIndex == -1) cout<<"List is Empty"<<endl;
    for (int i = 0; i < arr.countItems(); ++i){
        cout<<arr.getItem(i)<<" ";
    }cout<<endl;
    return dout;
}

/* Implement Linked ADT */
class LinkedListADT{
private:
    struct node{
        int item;
        node *next;
    };    
    node* start;
    node* Search(int data){
        node *t;
        if(start == nullptr) return nullptr;
        t = start;
        while(t != nullptr){
            if(t->item == data) return t;
            t = t->next;
        }
        return nullptr;
    }
public:
    LinkedListADT() { start = nullptr; };

    int countItems();
    void insertAtStart(int data);
    void insertAtLast(int data);
    void insertAfter(int currData,int data);
    int searchItem(int data);
    int deleteItemFromStart();
    int deleteItemFromLast();
    int deleteCurrentItem(int currData);
    void sortList();
    void editItem(int currData,int newData);
    void viewList();
    int getFirstItem();
    int getLastItem();

    ~LinkedListADT() {
        while(start != nullptr){
            deleteItemFromStart();
        }
    };
};

void LinkedListADT::insertAtStart(int data){
    node *n = new node;
    n->item = data;
    n->next = start;
    start = n;
}

void LinkedListADT::insertAtLast(int data){
    node *t,*n = new node;
    n->item = data;
    n->next = nullptr;
    if(start == nullptr) start = n;
    else{
        t = start;
        while(t->next != nullptr) t = t->next;
        t->next = n;
    }
}

void LinkedListADT::insertAfter(int currData,int data){
    node *t = Search(currData);
    if(t == nullptr)
        cout<<"No such value exist"<<endl;
    else{
        node *n = new node;
        n->item = data;
        n->next = t->next;
        t->next = n;
    }
}

int LinkedListADT::deleteItemFromStart(){
    if(start == nullptr){
        cout<<"Underflow"<<endl;
        return 0;
    }
    node *r = start;
    start = start->next;
    delete(r);
    return 1;
}

int LinkedListADT::deleteItemFromLast(){
    if(start == nullptr){
        cout<<"Underflow"<<endl;
        return 0;
    }
    if(start->next == nullptr){
        delete start;
        start = nullptr;
        return 1;
    }
    node *t1,*t2;
    t1 = t2 = start;
    do{
        t2 = t1;
        t1 = t1->next;
    }while(t1->next != nullptr);
    t2->next = nullptr;
    delete t1;
    return 1;
}

int LinkedListADT::deleteCurrentItem(int currData){
    node *t = Search(currData);
    if(t == nullptr){
        cout<<"Item not found"<<endl;
        return 0;
    }
    if(t->next == nullptr){
        deleteItemFromLast();
        return 1;
    }
    node *r;
    while(t->next != nullptr){
        t->item = t->next->item;
        t = t->next;
    }
    deleteItemFromLast();
    return 1;
}

void LinkedListADT::editItem(int currData,int newData){
    node *t = Search(currData);
    if(t == nullptr)
        cout<<"Item not found"<<endl;
    else t->item = newData;
}

int LinkedListADT::countItems(){
    int count = 0;
    node *t = start;
    while(t != nullptr){
        count++;
        t = t->next;
    }
    return count;
}

int LinkedListADT::getFirstItem(){
    if(start == nullptr){
        cout<<"List is Empty"<<endl;
        return -1;
    }
    return (start->item);
}

int LinkedListADT::getLastItem(){
    node *t;
    if(start == nullptr){
        cout<<"List is Empty"<<endl;
        return -1;
    }
    t = start;
    while(t->next != nullptr) t = t->next;
    return (t->item);
}

void LinkedListADT::viewList(){
    node *t = start;
    if(start == nullptr)
        cout<<"List is Empty"<<endl;
    else{
        while(t != nullptr){
            cout<<t->item<<" ";
            t = t->next;
        }
    }
}

int LinkedListADT::searchItem(int data){
    node *t = start;
    while(t != nullptr){
        if(t->item == data) return 1;
        t = t->next;
    }
    return 0;
}

void LinkedListADT::sortList(){
    node *t;
    int r,i,x,n;
    n = countItems();
    for (int r = 0; r <= n-1; ++r){
        t = start;
        for (int i = 0; i <= n-1-r; ++i){
            if(t->item > t->next->item){
                x = t->item;
                t->item = t->next->item;
                t->next->item = x;
            }
            t = t->next;
        }
    }
}


/* Delete a record from a file - book class*/

/* Overloading of subscript operator */
class Array{
private:
    int arr[10];
public:
    Array() {};

    void insertData(int index,int value){
        arr[index] = value;
    }

    int operator[](int index){
        return arr[index];
    }

    ~Array() {};
};

/* Overloading of parenthesis operator () */
class Matrix{
private:
    int arr[3][3];
public:
    Matrix() {
        memset(arr,0,sizeof(arr));
    };

    int& operator()(int i,int j){
        return arr[i][j];
    }

    void printMatrix(){
        for (int i = 0; i < 3; ++i){
            for (int j = 0; j < 3; ++j){
                cout<<arr[i][j]<<" ";
            }cout<<endl;
        }
    }

    ~Matrix() {};
};

/* Two way STACK */
class TwoWayStack{
private:
    int capacity,top_left,top_right;
    int *ptr;
public:
    TwoWayStack() : capacity(0), top_left(0), top_right(0) {
        ptr = nullptr;
    };

    TwoWayStack(int cap){
        this->capacity = cap;
        top_left = -1;
        top_right = capacity;
        ptr = new int[capacity];

    }

    void pushLeft(int val);
    void pushRight(int val);
    int popLeft();
    int popRight();
    int peekLeft();
    int peekRight();
    int isEmptyLeft();
    int isEmptyRight();
    int isFull();

    ~TwoWayStack() {
        delete[] ptr;
    };
};

void TwoWayStack::pushLeft(int val){
    if(isFull()) cout<<"Stack Overflow"<<endl;
    else{
        top_left++;
        ptr[top_left] = val;
    }
}

void TwoWayStack::pushRight(int val){
    if(isFull()) cout<<"Stack Overflow"<<endl;
    else{
        top_right--;
        ptr[top_right] = val;
    }
}

int TwoWayStack::popLeft(){
    int val;
    if(isEmptyLeft()){
        cout<<"Stack Underflow"<<endl;
        return -1;
    }else{
        val = ptr[top_left];
        top_left--;
        return val;
    }
}

int TwoWayStack::popRight(){
    int val;
    if(isEmptyRight()){
        cout<<"Stack Underflow"<<endl;
        return -1;
    }else{
        val = ptr[top_right];
        top_right++;
        return val;
    }
}

int TwoWayStack::peekLeft(){
    if(isEmptyLeft()){
        cout<<"Stack is empty"<<endl;
        return -1;
    }else return ptr[top_left];
}

int TwoWayStack::peekRight(){
    if(isEmptyRight()){
        cout<<"Stack is empty"<<endl;
        return -1;
    }else return ptr[top_right];
}

int TwoWayStack::isEmptyLeft(){
    if(top_left == -1) return 1;
    else return 0;
}

int TwoWayStack::isEmptyRight(){
    if(top_right == capacity) return 1;
    else return 0;
}

int TwoWayStack::isFull(){
    if(top_left + 1 == top_right) return 1;
    else return 0;    
}

/* Inheritance Ex */
class Person{
private:
    string name;
    int age;
protected:
    void setName(string name){ this->name = name; }
    void setAge(int age){ this->age = age; }
public:
    Person() : name(""), age(0) {};

    string getName(){ return name; }
    int getAge(){ return age; }

    ~Person() {};
};

class Employee:public Person{
private:
    float salary;
protected:
    void setSalary(float salray){
        this->salary = salary;
    }
    float getSalary(){ return salary; }
public:
    Employee() : salary(0) {};

    void setEmployee(string name,int age,float salray){
        setName(name), setAge(age), setSalary(salary);
    }

    void showEmployee(){
        cout<<"Name : "<<getName()<<endl;
        cout<<"Age : "<<getAge()<<endl;
        cout<<"Salary : "<<getSalary()<<endl;
    }

    ~Employee() {};
};

/* Overloading of greater than operator > */
class TTime{
private:
    int hour,minute,second;
public:
    TTime() : hour(0), minute(0), second(0) {};
    
    void setTime(int hour,int minute,int second){
        this->hour = hour,this->minute = minute,this->second = second;
    }

    void showTime(){ cout<<hour<<"hr : "<<minute<<"mn : "<<second<<"sc"<<endl; }

    int operator>(TTime t){
        if(hour > t.hour) return 1;
        else if(hour < t.hour) return 0;
        else if(minute > t.minute) return 1;
        else if(minute < t.minute) return 0;
        else if(second > t.second) return 1;
        else return 0;
    }

    ~TTime() {};
};

/* Copy file data to another file */
void copyFile(string f1,string f2){
    ifstream fin;
    ofstream fout;
    char ch;
    fin.open(f1);
    fout.open(f2);
    ch = fin.get();
    while(!fin.eof()){
        fout<<ch;
        ch = fin.get();
    }
    fin.close();
    fout.close();
}

/* class Rectangle */
class Rectangle{
private:
    int length,breadth;
public:
    Rectangle() : length(0), breadth(0) {};

    void setDimensions(int length,int breadth){
        this->length = length;
        this->breadth = breadth;
    }

    void showDimensions(){
        cout<<"Length is : "<<length<<endl;
        cout<<"Breadth is : "<<breadth<<endl;
    }

    int getArea(){ return length*breadth; }

    int getPerimeter(){ return (2*(length+breadth)); }

    ~Rectangle() {};
};

void solve(){
    /* Print Hello */
    cout<<"Hello vishal"<<endl;

    /* Calculate area of circle */
    float radius = 10;
    // cin>>radius;
    cout<<3.14*radius*radius<<endl;

    /* Check leap year */
    int year;
    cin>>year;
    if(year%400 == 0 or year%100!=0 and year%4==0)
        cout<<"Leap Year"<<endl;
    else cout<<"Not a Leap Year"<<endl;

    /* Function overload area */
    cout<<area(10)<<endl;
    cout<<area(10,10)<<endl;

    /* define time class */
    Time *t = new Time(12,12,12);
    t->showTime();
    Time t1(24,54,15),t2(35,185,745);
    t1.normalize(); t2.normalize();
    t1.showTime(); t2.showTime();

    /* overload + operator in time */
    Time t3 = t1 + t2;
    t3.showTime();

    /* Implement Array ADT */
    ArrayADT a,b;
    a.createArray(5);
    a.setItem(0,10);
    a.setItem(1,80);
    a.setItem(2,30);
    a.setItem(3,40);
    a.setItem(4,50);
    cout<<a.getItem(0)<<endl;
    a.sortArray();
    b = a; // array is not sorted

    /* Implement Linked ADT */
    LinkedListADT ll;
    ll.insertAtStart(10);
    ll.insertAtStart(20);
    ll.insertAtStart(30);
    ll.insertAtLast(40);
    ll.insertAfter(20,5);
    ll.viewList();
    ll.editItem(5,15);cout<<endl;
    ll.viewList();

    /* Delete a record from a file - book class 🔺🔺🔺*/

    /* Overloading of subscript operator */
    Array obj;
    for (int i = 0; i < 9; ++i){
        obj.insertData(i,i+1);
    }
    for (int i = 0; i < 9; ++i){
        cout<<obj[i]<<" ";
    }cout<<endl;

    /* Overloading of parenthesis operator () */
    Matrix arr;
    arr(0,0) = 1;
    arr.printMatrix();

    /* Two way STACK */
    TwoWayStack st(11);
    st.pushRight(50);
    st.pushLeft(10);
    st.pushLeft(20);
    st.pushLeft(25);
    st.pushRight(55);
    cout<<"Peek from Stack 1 : "<<st.peekLeft()<<endl;
    cout<<"Peek from Stack 2 : "<<st.peekRight()<<endl;

    /* Inheritance Ex */
    Employee emp;
    emp.setEmployee("vishal kumar",99,1.213);
    emp.showEmployee();

    /* Overloading of greater than operator > */
    TTime tt1,tt2;
    tt1.setTime(2,30,15);
    tt2.setTime(3,15,10);

    if(tt1 > tt2) tt1.showTime();
    else tt2.showTime();

    /* class Rectangle */
    Rectangle r1,r2;
    r1.setDimensions(10,5);
    r2.setDimensions(20,10);
    cout<<"First Rectangle : ";
    r1.showDimensions();
    cout<<"Area of Rectangle is : "<<r1.getArea();
    cout<<"Perimeter of Rectangle is : "<<r1.getPerimeter();
    cout<<"Second Rectangle : ";
    r2.showDimensions();
    cout<<"Area of Rectangle is : "<<r2.getArea();
    cout<<"Perimeter of Rectangle is : "<<r2.getPerimeter();

    /* Copy file data to another file */
    {
        copyFile("file1.txt","file2.txt");
        cout<<"File copy is completed"<<endl;
    }
}

signed main(){
  int t = 1;
  // cin>>t;
  while(t--) solve();
  return 0;
}   