#include <iostream>
using namespace std;
int main()
{

    int n1 = 0, n2 = 1;

    cout << n1 << endl<< n2 << endl;
    int n3;
    for (int i = 2; i < 10; i++)
    {
        n3 = n1 + n2;
        cout << n3 << endl;
        n1 = n2;
        n2 = n3;
     
    }

    return 0;
}