#include<iostream>
using namespace std;
class A
{
    int a;
public:
    A(int i)
    {
        a=i;
    }
    void assign(int i)
    {
        a=i;
    }
    void display()
    {
        cout<<a;
    }
};
int main()
{
    A obj;
    obj.assign(5);
    obj.display();
    return 0;
}