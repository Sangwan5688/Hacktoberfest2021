#include <stdio.h>
#include <stdlib.h>
void mergesort(int a[],int b[],int c[],int n1,int n2){
	int i=0,j=0,k=0;
	while(i<n1 && j<n2 )
	{
		if(a[i]<b[j])
		{
			c[k]=a[i];
			i++;
			k++;
		}
		else
		{
			c[k]=b[j];
			j++;
			k++;
		}
		
	}
    while(i<n1)
    {
    	c[k]=a[i];
    	i++;
    	k++;
	}
	while(j<n2)
	{
		c[k]=b[j];
		j++;
		k++;
	}
}

int main() {
	int n1,n2,n,i,j,k;
	printf("Enter the number of elements for array A\n");
	scanf("%d",&n1);
	int a[n1];
	printf("Enter the elements for array A in an ascending sorted manner\n");
	for(i=0;i<n1;i++)
	{
		scanf("%d",&a[i]);
	}
	printf("Enter the number of elements for array B\n");
	scanf("%d",&n2);
	int b[n2];
	printf("Enter the elements for array B in an ascending sorted manner\n");
	for(j=0;j<n2;j++)
	{
		scanf("%d",&b[j]);
	}
	n=n1+n2;
	int c[n];
	mergesort(a,b,c,n1,n2);
	printf(" Array A\n");
	for(i=0;i<n1;i++)
	{
		printf("%d\t",a[i]);
	}
	printf("\n Array B\n");
	for(j=0;j<n2;j++)
	{
		printf("%d\t",b[j]);
	}
	printf("\n Array C\n");
    for(k=0;k<n;k++)
	{
		printf("%d\t",c[k]);
	}
	return 0;
}
