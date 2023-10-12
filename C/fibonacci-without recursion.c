#include<stdio.h>
void main()
{
    int n, t1 = 0, t2 = 1, nextTerm = 0, i;
printf("Enter the n value: ");
scanf("%d", &n);
if(n == 0 || n == 1) 
printf("%d",n); 
else
nextTerm = t1 + t2;
for (i = 3; i <= n; ++i)
{
t1 = t2;
t2 = nextTerm;
nextTerm = t1 + t2;
}
printf("%d", t2);
}