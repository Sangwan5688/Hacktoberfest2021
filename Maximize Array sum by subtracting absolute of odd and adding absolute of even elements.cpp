// C++ code for above approach

#include <bits/stdc++.h>
using namespace std;

// Function to return maximum sum
// after swapping
int maxSum(int* arr, int N)
{
	// Initialize the variables
	int Max = INT_MIN;
	int Min = INT_MAX;
	int X, Sum = 0;

	// Traverse the array
	for (int i = 0; i < N; i++) {
		X = arr[i];

		// If element is odd then subtract
		// it from the Sum and update maximum
		if (X & 1) {
			Max = max(Max, abs(X));
			Sum -= abs(X);
		}

		// Else add it to the Sum and
		// update minimum
		else {
			Min = min(Min, abs(X));
			Sum += abs(X);
		}
	}

	// If minimum even element is greater
	// than maximum odd element then no
	// need to swap
	if (Min >= Max)
		return Sum;

	// Else print the sum after swapping
	return (Sum + 2 * (Max - Min));
}

// Driver Code
int main()
{
	int arr[] = { -5, -4, -3, -2, -1,
				0, 1, 2, 3, 4, 5 };
	int N = sizeof(arr) / sizeof(arr[0]);

	// Function call
	cout << maxSum(arr, N);
	return 0;
}
