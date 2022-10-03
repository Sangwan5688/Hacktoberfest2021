#include <stdio.h>
int printfibo(int i)
{
    if (i == 0)
    {
        return 0;
    }
    else if (i == 1)
    {
        return 1;
    }
    else
    {
        return (printfibo(i - 1) + printfibo(i - 2));
    }
}
int main()
{
    // Write a program to print Fibonacci Series using recursion
    int a;
    printf("enter the nos of fabonacci nos = ");
    scanf("%d", &a);
    printf("fabonacci nos are ");
    for (int i = 1; i <= a; i++)
    {
        printf("%d\t", printfibo(i));
    }

    return 0;
}