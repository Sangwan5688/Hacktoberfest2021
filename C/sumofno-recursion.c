#include <stdio.h>
int sum(int a)
{
    if (a > 0)
    {
        return (a + sum(a - 1));
    }
}
int main()
{
    // Write a program to calculate the sum of numbers from 1 to n using recursion
    int a, ans = 0;
    printf("enter the no ");
    scanf("%d", &a);
    ans = sum(a);
    printf("%d", ans);
    return 0;
}