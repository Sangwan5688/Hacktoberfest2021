#include <stdio.h>
#include <stdlib.h>
int main() {
	int n,i;
	printf("Enter the number of elements \n");
	scanf("%d",&n);
	int a[n];
	int *p;
	p=a;
	printf("Enter the elements\n");
	for(i=0;i<n;i++)
	{
		scanf("%d",(p+i));
	}
	printf("Array : \n");
	for(i=0;i<n;i++)
	{
		printf("%d\n",*(p+i));
	}
	n=n+1;
	int pos,x;
	printf("Enter the position where you want yo insert the element \n");
	scanf("%d",&pos);
	printf("Enter the element we want to insert \n");
	scanf("%d",&x);
	int index=pos-1;
	for(i=n-1;i>=index;i--)
	{
		*(p+(i+1))=*(p+i);
	}
	
	*(p+index)=x;
	for(i=0;i<n;i++)
	{
		printf("%d\n",*(p+i));
	}
	return 0;
}
