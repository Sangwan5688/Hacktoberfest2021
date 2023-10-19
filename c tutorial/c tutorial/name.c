/*Write a program in C that reads a forename,
surname and year of birth and display the names 
and the year one after another sequentially.*/
#include<stdio.h>
int main()
{
    char f[20],l[20];
    int b;
    printf("input your firstname : ");
    scanf("%s",f);
    printf("input your lastname : ");
    scanf("%s",l);
    printf("input you year of birth : ");
    scanf("%d",&b);
    printf("%s %s %d\n",f,l,b);
    return 0;
}