#include <stdio.h>
#include <stdlib.h>
void transpose(int a[20][20],int n,int m)
{
	int i,j;
	for(i=0;i<n;i++)
	{
		for(j=0;j<m;j++)
		{
			printf("%d ",a[j][i]);
		}
		printf("\n");
	}	
}
int main() {
	int n,m,i,j;
	printf("Enter the number of rows for Matrix \n");
	scanf("%d",&n);
	printf("Enter the number of columns for Matrix \n");
	scanf("%d",&m);
	int a[20][20];
	printf("Enter the elements \n");
	for(i=0;i<n;i++)
	{
		for(j=0;j<m;j++)
		{
			scanf("%d",&a[i][j]);
		}
	}
	printf("Array\n");
	for(i=0;i<n;i++)
	{
		for(j=0;j<m;j++)
		{
			printf("%d ",a[i][j]);
		}
		printf("\n");
	}
	printf("Transpose \n");
	transpose(a,n,m);
	return 0;
}
