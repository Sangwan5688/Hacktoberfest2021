//Introduction
//____________________________
/* Quicksort is a divide and conquer algorithm.
Here we choose an element of array as pivot and partition the 
given array around this pivot.
We can choose the pivot in different ways.
 1. First element as pivot
 2. Last element as pivot
 3. Random element as pivot 
 4. median as pivot
 Main aim is to find the place of pivot where it should be present in the sorted array.
 The default implementation of Quicksort is not stable but it can be made.
 The Quicksort is not adaptive.
*/
//_______________________________
// Time complexity
/* 
   1. Worst case:
       O(n^2) the case of already sorted list.
   2. Best case:
       O(nlogn) median element as pivot
   3. Avearge case:
       O(nlogn)
*/
//_______________________________
// Code
#include <stdio.h>
#include<stdlib.h>

void swap(int *x,int *y)
{
    int temp=*x;
    *x=*y;
    *y=temp;
}
// This function returns the index of pivot where it should be present in sortd array.
// We are choosing first element as our pivot.
int partition(int A[],int l,int h)
{
    int pivot=A[l];
    int i=l,j=h;
    do
    {
        do{i++;}while(A[i]<=pivot);
        do{j--;}while(A[j]>pivot);
        if(i<j)
            swap(&A[i],&A[j]);
    }while(i<j);
    swap(&A[l],&A[j]);
    return j;
}
// This is recursive function for quicksort.
void QuickSort(int A[],int l,int h)
{
    int j;
    if(l<h)
    {
        j=partition(A,l,h);
        QuickSort(A,l,j);
        QuickSort(A,j+1,h);
    }
}

int main()
{
    int A[]={11,13,7,12,16,9,24,5,10,3},n=10,i;

    QuickSort(A, 0, n);

    for(i=0;i<10;i++)
        printf("%d ",A[i]);
    printf("\n");

    return 0;
}

// Output:
// 3 5 7 9 10 11 12 13 16 24
