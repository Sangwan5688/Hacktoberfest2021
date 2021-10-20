// INTRODUCTION
// --------------------------------
//  Merge Sort is a Divide and Conquer algorithm. It has mainly divide the array into subarray
//  untill futher division is not possible, then subarray is combined while comparing with other
//  subarray.
// ---------------------------------

// TIME COMPLEXITIES

// Best	    O(nlog n)
// Worst	O(nlog n)
// Average	O(nlog n)



// CODE
// -------------------------------------------

#include<stdio.h>
#define MAXSIZE 100  //used to define Maximum size of array

int arr[MAXSIZE]; //main array
int b[MAXSIZE];  //auxilary array


//This fuctions merge and sort the array
void merge( int low, int mid, int high){
    int h=low, i=low, j=mid+1, k;
    while((h<=mid)&&(j<=high)){
        if(arr[h]<=arr[j]){
            b[i]= arr[h];
            h++;
        }else{
            b[i]=arr[j];
            j++;
        }
        i++;
    }

    if(h>mid){
        for(k=j;k<=high;k++){
            b[i]=arr[k];
            i++;
            }
        }
        else{
        for(k=h;k<=mid;k++){
            b[i]=arr[k];
            i++;
        }
        }
        for(k=low;k<=high;k++){
            arr[k]=b[k];
        }
}

//This function divide the array into subarray 
void mergeSort( int low, int high ){

    if(low<high){
        int mid = low+(high-low)/2;
        mergeSort(low,mid);
        mergeSort(mid+1,high);
        merge( low, mid,high );
    }
}

int main(){
    int  n, i,temp;

    printf("Enter number elements to be sorted: ");
    scanf("%d",&n);

    printf("Enter numbers:");
    for(i=0;i<n;i++){
        scanf("%d",&temp);
        arr[i]=temp;
    }

    mergeSort(0,n-1);

    printf("After Sorting: \n");

    for(i=0;i<n;i++){
        printf("%d ",arr[i]);
    }

    return 0;
}