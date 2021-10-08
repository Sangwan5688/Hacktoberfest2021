#include <stdio.h>
#include <stdlib.h>
int delete(int arr[],int n,int pos){
	int i,j;
	int index=pos;
	for(i=index;i<n;i++)
	{
	 arr[i-1]=arr[i];
}
if(i==n)
return n;
return (n-1);
}


int main() {
	int i,n;
	printf("Enter the number of elements \n");
	scanf("%d",&n);
	int a[30];
	printf("Enter the elements \n");
	for(i=0;i<n;i++)
	{
		scanf("%d",&a[i]);
	}
	
	printf("Array \n");
	for(i=0;i<n;i++)
	{
		printf("%d\n",a[i]);
	}
	
	int p;
	printf("Enter the position from which the element is to be deleted \n");
	scanf("%d",&p);
	delete(a,n,p);
	n=n-1;
	printf("New array \n");
	for(i=0;i<n;i++)
	printf("%d\n",a[i]);
	return 0;
}
