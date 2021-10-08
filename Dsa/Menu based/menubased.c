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
int Delete(int arr[],int n,int pos){
	int i,j;
	int index=pos;
	for(i=index;i<n;i++)
	{
	 arr[i-1]=arr[i];
}
if(i==n)
return n;
return (n-1);
}
void search(int arr[],int n,int x){

int i,c=0;
for(i=0;i<n;i++)
{
	if(arr[i]==x)
	{
	printf("Element found at %d",i+1);
	c++;
	break;
    }
}
if(c==0)
printf("Element not found");
}
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
int k;
printf("Now please enter the task you want to perform: \n");
printf("1 for Insertion\n ");
printf("2 for deletion\n");
printf("3 for searching\n");
printf("4 for sorting\n");
scanf("%d",&k);
if(k==1)
{
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

}
else if(k==2){
int p;
	printf("Enter the position from which the element is to be deleted \n");
	scanf("%d",&p);
	Delete(a,n,p);
	n=n-1;
	printf("New array \n");
	for(i=0;i<n;i++)
	printf("%d\n",a[i]);
	return 0;
}
else if(k==3)
{
	int x;
	printf("Enter the number to be searched \n");
	scanf("%d",&x);
	search(a,n,x);
	return 0;
}
else if(k==4){
		sort(a,n);
	printf("Sorted array \n");
	for(i=0;i<n;i++)
	printf("%d\n",a[i]);
	return 0;
}
	return 0;
}
