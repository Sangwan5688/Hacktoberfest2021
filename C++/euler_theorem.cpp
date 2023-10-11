//Euler Theorem
/*This is a C++ Program which demonstrates the implementation of Euler Theorem. The number and modular must be coprime for the modular multiplicative inverse to exist.*/
/*Enter number to find modular multiplicative inverse: 26
Enter Modular Value: 7
7*/
#include <iostream>
#include <vector>
using namespace std;
vector<int> inverseArray(int x, int y) {
   vector<int> modInverse(x + 1, 0);
   modInverse[1] = 1;
   for (int i = 2; i <= x; i++) {
      modInverse[i] = (-(y / i) * modInverse[y % i]) % y + y;
   }
   return modInverse;
}
int main() {
   vector<int>::iterator it;
   int a, m;
   cout<<"Enter number to find modular multiplicative inverse: ";
   cin>>a;
   cout<<"Enter Modular Value: ";
   cin>>m;
   cout<<inverseArray(a, m)[a]<<endl;
}