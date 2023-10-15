#include "bits/stdc++.h"
using namespace std;

#define int    long long int 

template<typename x>
class ArrayList{
private:
    struct ControlBlock{
        int capacity;
        x *arr_ptr; // 👏
    };
    ControlBlock *s;
public:
    ArrayList() {
        s->capacity = 0;
        s->arr_ptr = NULL;
    };
    ArrayList(x capacity) {
        s = new ControlBlock();
        s->capacity = capacity;
        s->arr_ptr = new x[s->capacity]; // 👏
    };

    void addElement(int index,x data){
        if(index >= 0 and index <= (s->capacity) - 1)
            s->arr_ptr[index] = data;
        else cout<<"Array index is not valid"<<endl;
    }

    void viewElement(int index,x& data){
        if(index >= 0 and index <= (s->capacity) - 1)
            data = s->arr_ptr[index];
        else cout<<"Array index is not valid"<<endl;
    }

    void viewList(){
        for (int i = 0; i < (s->capacity); ++i)
        {
            cout<<*((s->arr_ptr) + i)<<" | ";
        }
        cout<<endl;
    }

    ~ArrayList() {};
};

void solve(){ 
    ArrayList<float> list(5);
    list.addElement(0,1.2);
    list.addElement(1,2.3);
    list.addElement(2,3.4);
    list.addElement(3,4.5);
    list.addElement(4,5.6);

    float data = -1;
    list.viewElement(1,data);
    if(data != -1) cout<<data<<endl;

    list.viewList();
}

signed main(){
  int t = 1;
  cin>>t;
  while(t--) solve();
  return 0;
}   