#include <stdio.h>
#include <stdlib.h>

int main() {
	int n,i;
	printf("Enter the number of elements \n");
	scanf("%d",&n);
	int a[n];
	int *p;
	p=a;
	printf("Enter the elements \n");
	for(i=0;i<n;i++)
	{
		scanf("%d",(p+i));
	}
	printf("Array \n");
	for(i=0;i<n;i++)
	{
		printf("%d\n",*(p+i));
	}
	int pos;
	printf("Enter the position from which the number will be deleted \n");
	scanf("%d",&pos);
	n=n-1;
	int t;
	for(i=pos-1;i<n;i++)
	{ 
	    
		*(p+i)=*(p+i+1);
	}
	printf("New array \n");
	for(i=0;i<n;i++)
	{
		printf("%d\n",*(p+i));
	}
	
	return 0;
}
