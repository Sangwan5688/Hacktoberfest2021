#include<stdio.h>
int main()
{
    int n=10;

    int arr[100];
    int position;
    printf("position : ");
    scanf("%d",&position);
    int element;
    scanf("%d",&element);
   
    for(int i=0;i<n;i++)
    {
        scanf("%d",&arr[i]);
    }

    for(int i=n;i>position;i--)
    {
        arr[i]=arr[i-1];
        // arr[10]=arr[9]
    }

    arr[position]=element;
    n++;
    for(int i=0;i<n;i++)
    {
        printf("%d ",arr[i]);
    }
    printf("\n");

    return 0;

}