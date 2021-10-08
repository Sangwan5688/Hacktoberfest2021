#include <stdio.h>
#include <stdlib.h>

int main() {
	int n,i,j,temp;
	printf("Enter the number of elements \n");
	scanf("%d",&n);
	int a[n];
	int *p;
	p=a;
	printf("Enter the elements \n");
	for(i=0;i<n;i++)
	{
		scanf("%d",p+i);
	}
	printf("Original array\n");
	for(i=0;i<n;i++)
	{
		printf("%d\n",*(p+i));
	}
	for(i=0;i<n;i++)
	{
		for(j=0;j<n-i-1;j++)
		{
			if(a[j+1]<a[j])
			{
				temp=*(p+j+1);
				*(p+j+1)=*(p+j);
				*(p+j)=temp;
			}
		}
	}
	printf("New sorted array\n");
	for(i=0;i<n;i++)
	{
		printf("%d\n",*(p+i));
	}
	return 0;
}
