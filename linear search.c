#include <stdio.h>
int main()
{
int arr[20],x,i,n;
printf("Enter number of elements in array\n");
scanf("%d", &n);
printf("Enter %d numbers\n",n);
for (i=0;i<n;i++)
scanf("%d", &arr[i]);
printf("Enter number to be searched\n");
scanf("%d",&x);
for(i=0;i<n;i++)
{
if(arr[i]==x)
{
printf("%d is present at position %d.\n",x,i+1);
break;
}
}
if(i==n)
printf("%d is not found\n",x);
return 0;
}
