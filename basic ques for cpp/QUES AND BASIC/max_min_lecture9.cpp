// maximum and minimum element in arry using max and mix defined fuction

#include <bits/stdc++.h>
using namespace std;
int getMin(int arr[], int size)
{
  int minimum = INT_MAX;
  for (int i = 0; i < size; i++)
  {
    minimum = min(minimum, arr[i]);
  }
  return minimum;
}
int getMax(int arr[], int size)
{
  int maximum = INT_MIN;
  for (int i = 0; i < size; i++)
  {
    maximum = max(maximum, arr[i]);
  }
  return maximum;
}
int main()
{
  int n;
  cin >> n;

  int aman[99999];
  for (int i = 0; i < n; i++)
  {
    cin >> aman[i];
  }
  cout << getMax(aman, n) << endl;
  cout << getMin(aman, n);
}