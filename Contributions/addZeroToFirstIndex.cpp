#include <iostream>
#include <vector>
using namespace std;

void shift(vector<int>& array);

int main() {
	vector<int> arr = {1,0,4,3,1};
  cout << "Before:" << endl;
  for (int i = 0; i < arr.size(); i++) {
     cout << arr[i] << " ";
  }
  shift(arr);
  cout << "After:" << endl;
	for (int j = 0; j < arr.size(); j++) {
		cout << arr[j] << " ";
	}
	cout << endl;
}
void shift(vector<int>& array) {
	for (int i = array.size() - 2; i >= 1; i--) {
		array[i+1] = array[i];
	}
	array[1] = 0;
}
