#include <iostream>
using namespace std;

int main() {
    int* pointInt;
    float* pointFloat;
    pointInt = new int;
    pointFloat = new float;
    *pointInt = 45;
    *pointFloat = 45.45f;

    cout << *pointInt << endl;
    cout << *pointFloat << endl;
    delete pointInt, pointFloat;

    return 0;
}

