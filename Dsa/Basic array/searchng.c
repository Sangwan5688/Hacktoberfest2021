#include <stdio.h>
#include <stdlib.h>
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
	for(i=0;i<n;i++)
	{
		printf("%d\n",a[i]);
	}
	int x;
	printf("Enter the number to be searched \n");
	scanf("%d",&x);
	search(a,n,x);
	return 0;
}
