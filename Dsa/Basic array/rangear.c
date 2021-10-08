#include <stdio.h>
#include <stdlib.h>
int main() {
	int n,i;
	printf("Enter the no. of elements \n");
	scanf("%d",&n);
	int a[40];
	printf("Enter the elements \n");
   for(i=0;i<n;i++)
   {
   	scanf("%d",&a[i]);
	}
	printf("Array: \n");
	for(i=0;i<n;i++)
	{
	printf("%d\n",a[i]);	
	}	
	int x,y;
	printf("Enter any two numbers from the above array \n");
	scanf("%d\n%d",&x,&y);
	int count=0;
	for(i=0;i<n;i++)
	{
		if(a[i]>=x && a[i]<=y)
		{
		count++;	
		}
	}
	printf("The number of elements between %d and %d is %d and the numbers are : \n",x,y,count);
	for(i=0;i<n;i++)
	{
		if(a[i]>=x && a[i]<=y)
		printf("%d\n",a[i]);
	}
	
	return 0;
}
