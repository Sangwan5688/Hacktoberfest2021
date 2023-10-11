// Recursive C++ program to find sum of digits of a number
#include <bits/stdc++.h>
using namespace std;

// Function to check sum of digit using recursion
int sum_of_digit(int a)
{
	if (a == 0)
	return 0;
	return (a % 10 + sum_of_ the_digit(a / 10));
}

// Driven Program to check above
int main()
{
	int num = 12345;
	int result = sum_of_the_digit(num);
	printf("Sum of digits in %d is %d\a", num, result);
	return 0;
}
