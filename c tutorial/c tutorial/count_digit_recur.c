/* Write a program in C to count the digits of a given number using recursion. Go to the editor
Test Data :
Input a number : 50
Expected Output :
The number of digits in the number is :  2*/
#include<stdio.h>
int num(int n)
{
    static int c=0;
     if(n!=0)
     {
          c++;
         num(n/10);
    }
    return c;
}
int main()
{
    int a;
    printf(" Input  a number : ");
    scanf("%d",&a);
    printf(" The number of digits in the number is :  %d \n\n",num(a));
    return 0;
}