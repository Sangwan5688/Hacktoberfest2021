#include <bits/stdc++.h>
using namespace std;

int ayush(int arr[], int n)
{
	unordered_set<int> S;
	int ans = 0;

	for (int i = 0; i < n; i++)
		S.insert(arr[i]);               // Hash all the array elements

	for (int i = 0; i < n; i++)
	{

		if (S.find(arr[i] - 1) == S.end())
		{

			int j = arr[i];
			while (S.find(j) != S.end())
				j++;
			ans = max(ans, j - arr[i]);
		}
	}
	return ans;
}

int main()
{
	
	int n;
	cin>>n;
	int arr[n];
	
	for (int i = 0; i < n; i++)
	    cin>>arr[i];
	
	cout << ayush(arr, n);
	return 0;
}
