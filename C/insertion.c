#include <stdio.h>
int main()
{ 
    // Write a program for Insertion sort
    int arr[9] = {2, 6, 4, 3, 78, 90, 7, 9, 1};
    int value, hole;
    for (int i = 1; i < 9; i++)
    {
        value = arr[i];
        hole = i;
        while (hole > 0 && arr[hole - 1] > value)
        {
            arr[hole]=arr[hole-1];
            hole--;
        }
        arr[hole]=value;
    }
    for (int i = 0; i < 9; i++)
    {
        printf("%d ", arr[i]);
    }

    return 0;
}