#include <stdio.h>
int main()
{
int arr[20],i,j,temp,f,l,mid,n,x;
printf("Enter the number of elements\n");
scanf("%d", &n);
printf("Enter %d numbers\n", n);
for (i=0;i<n;i++)
scanf("%d",&arr[i]);
for(i=0;i<n-1;i++)
{
for(j=0;j<n-i-1;j++)
{
if(arr[j]>arr[j+1])
{
temp=arr[j];
arr[j]=arr[j+1];
arr[j+1]=temp;
}
}
}
printf("Sorted array is:\n");
for(i=0;i<n;i++)
printf("%d\n",arr[i]);
printf("Enter value to be searched\n");
scanf("%d", &x);
f=0;
l=n-1;
mid=(f+l)/2;
while(f<=l)
{
if(arr[mid]<x)
f= mid+1;
else if (arr[mid]==x)
{
printf("%d found at position %d\n",x,mid+1);
break;
}
else
l=mid-1;mid=(f+l)/2;
}
if(f>l)
printf("%d is not found in the list",x);
return 0;
}
