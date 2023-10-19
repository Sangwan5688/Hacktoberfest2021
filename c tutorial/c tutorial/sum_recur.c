/*Write a program in C to calculate the sum of numbers from 1 to n using recursion. Go to the editor
Test Data :
Input the last number of the range starting from 1 : 5
Expected Output:

The sum of numbers from 1 to 5 : 
15*/
#include<stdio.h>
int sum(int n)
{
    if(n==1){
        return 1;
    }
    int a=sum(n-1)+n;
    return a;
}
int main()
{
    int a;
    printf("Input the last number of the range starting from 1 : ");
    scanf("%d",&a);
    printf("The sum of numbers from 1 to %d : %d",a,sum(a));
    return 0;
}