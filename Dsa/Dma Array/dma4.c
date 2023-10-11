#include <stdio.h>
#include <stdlib.h>
void sort(int *ptr,int n)
{
	int i,j,temp;
	for(i=0;i<n;i++)
	{
		for(j=0;j<n-i-1;j++)
		{
		
		if(*(ptr+j)>*(ptr+j+1))
		{
			temp=*(ptr+j);
			*(ptr+j)=*(ptr+j+1);
			*(ptr+j+1)=temp;
		}
	}
	}
}

int main() {
	int n,i,*p;
	printf("Enter the number of elemenets\n");
	scanf("%d",&n);
	p=(int *)malloc(n*sizeof(int));
	printf("Enter the elements\n");
	for(i=0;i<n;i++)
	{
		scanf("%d",p+i);
	}
	printf("Array\n");
	for(i=0;i<n;i++)
	printf("%d\n",*(p+i));
	//Calling sort function
	sort(p,n);
	printf("Sorted array\n");
	for(i=0;i<n;i++)
	printf("%d\n",*(p+i));
	return 0;
}
