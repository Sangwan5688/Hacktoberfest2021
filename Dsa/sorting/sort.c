#include <stdio.h>
#include <stdlib.h>
int checksort(int arr[],int n)
{
	int i,j,c=0;
	for(i=0;i<n;i++)
	{
		
		for(j=0;j<n-i-1;j++)
		{
			if(arr[j]>arr[j+1])
			{
			c++;
			break;
	        }
		}
	}
	if(c==0)
	printf("Sorted\n");
	else
	printf("Not sorted \n");
}


int main() {
	int n,i;
	printf("Enter the number of elements \n");
	scanf("%d",&n);
	int a[40];
	printf("Enter the elements \n");
	for(i=0;i<n;i++)
	{
		scanf("%d",&a[i]);
	}
	checksort(a,n);
	return 0;
}
