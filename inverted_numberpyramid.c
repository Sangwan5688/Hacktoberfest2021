#include<stdio.h>
void main()
{
int i,j,n;
printf("enter no of rows needed\n");
scanf("%d",&n);
for(i=n;i>=1;i--)
{
        for(j=1;j<=i;j++)
        {
        printf("%d",i); 
        }
printf("\n");
}
}
