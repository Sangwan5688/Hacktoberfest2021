#include <stdio.h>
#include <stdlib.h>

int main() {
	int n,i,*ptr,pos,x;
	printf("Enter the number of elements\n");
	scanf("%d",&n);
	ptr=(int *)malloc(n*sizeof(int));
	printf("Enter the elemets\n");
	for(i=0;i<n;i++)
	scanf("%d",ptr+i);
	printf("Original array\n");
	for(i=0;i<n;i++)
	printf("%d\n",*(ptr+i));
	n=n+1;
	printf("Enter the position\n");
	scanf("%d",&pos);
	printf("Enter the element to be inserted\n");
	scanf("%d",&x);
	for(i=n-1;i>=pos-1;i--)
	{
		*(ptr+i+1)=*(ptr+i);
	}
	*(ptr+(pos-1))=x;
	printf("New array\n");
	for(i=0;i<n;i++)
	printf("%d\n",*(ptr+i));
	return 0;
}
