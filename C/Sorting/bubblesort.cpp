//#include <stdbool.h>
#include <stdio.h>
 
void swap(int* xp, int* yp)
{
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}
 
// An optimized version of Bubble Sort
void bubbleSort(int arr[], int n)
{
int i,j;
for(i=0;i<n-1;i++)
{
	for(j=0;j<n-1;j++)
		{
			if(arr[j]>arr[j+1])
			swap(&arr[j], &arr[j+1]);
		}
}
    
}
 
// Function to print an array
void printArray(int arr[], int size)
{
    int i;
    for (i = 0; i < size; i++)
        printf("%d ", arr[i]);
}
 
// Driver program to test above functions
int main()
{
    int n,i, j;
	printf("Enter no of elements in the array:");
	scanf("%d",&n);
	int arr[n];
	printf("Enter array to be sorted:\n");
	for(i=0;i<n;i++)                   
	{
		scanf("%d",&arr[i]);
	}
    bubbleSort(arr, n);
    printf("Sorted array: \n");
    printArray(arr, n);
    return 0;
}
