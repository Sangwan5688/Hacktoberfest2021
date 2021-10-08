#include <stdio.h>
#include <stdlib.h>
int  Insert(int arr[],int n,int x,int pos,int cap){
if(cap==n)
return n;
int index=pos-1;
int i;
for(i=n-1;i>=index;i--)
arr[i+1]=arr[i];
arr[index]=x;
return (n+1);	
}

int main() {
int n,i;
printf("Enter the number of elements\n");
scanf("%d",&n);
int a[30];
printf("Enter the elements \n");
for(i=0;i<n;i++)
{
	scanf("%d",&a[i]);
	}
printf("Array  \n");	
for(i=0;i<n;i++)
{
	printf("%d\n",a[i]);
}
int p,e;
printf("Enter the position at which element is to be inserted \n");
scanf("%d",&p);
printf("Enter the element to be inserted \n");
scanf("%d",&e);
n=n+1;
Insert(a,n,e,p,30);
printf("New array  \n");
for(i=0;i<n;i++)
printf("%d\n",a[i]);
	return 0;
}

