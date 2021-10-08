#include <stdio.h>
#include <stdlib.h>
void sort(int arr[],int n)
{
int i,j,temp;
for(i=0;i<n;i++)
{
	for(j=0;j<n-i-1;j++)
	if(arr[j]>arr[j+1])
	{
		temp=arr[j];
		arr[j]=arr[j+1];
		arr[j+1]=temp;
	}
	
}
}


int main() {
	int n,i;
	printf("Enter the number of elements \n");
	scanf("%d",&n);
	int a[40];
	printf("Enter the elements for the array \n");
	for(i=0;i<n;i++)
	{
		scanf("%d",&a[i]);
    }
    printf("Array \n");
    for(i=0;i<n;i++)
    {
    	printf("%d\n",a[i]);
	}
	sort(a,n);
	printf("Sorted array \n");
	for(i=0;i<n;i++)
	printf("%d\n",a[i]);
	return 0;
}
