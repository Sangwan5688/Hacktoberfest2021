#include <bits/stdc++.h>
using namespace std;

// Linearly search x in arr[]. If x is present then return its
// location, otherwise return -1
int search(int arr[], int n, int x)
{
	int i;
	for (i = 0; i < n; i++)
		if (arr[i] == x)
			return i;
	return -1;
}

// Driver code
int main()
{
	int arr[] = { 3, 4, 1, 7, 5 };
	int n = sizeof(arr) / sizeof(arr[0]);
	int x = 4;

	int index = search(arr, n, x);
	if (index == -1)
		cout << "Element is not present in the array";
	else
		cout << "Element found at position " << index;

	return 0;
}
