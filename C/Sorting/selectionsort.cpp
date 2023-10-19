//Selection sort
#include<stdio.h>

void swap(int *x, int *y)
{
	int temp;
	temp=*x;
	*x=*y;
	*y=temp;
}

void display(int arr[], int num)
{
	int i; 
	for(i=0;i<num;i++)
	{
		printf("%d\t",arr[i]);
	}
}

int main()
{
	int n,i,j,min;
	printf("Enter no of elements to be entered in the array: ");
	scanf("%d",&n);
	int arr[n];
	printf("Enter %d elements:\n",n);
	for(i=0;i<n;i++)
	{
		scanf("%d",&arr[i]);
	}
	for(i=0;i<n-1;i++)
	{min=i;
		for(j=i+1 ; j<n;j++)
		{if(arr[j] < arr[min])
			{min=j;}
			if( min != i)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
			{
				swap(&arr[i], &arr[min]);
			}
         }
}
	printf("The sorted array using Selection sort is:\n");
	 display(arr, n);  
}
