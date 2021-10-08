#include <stdio.h>
#include <stdlib.h>
void matrix(int arr[1][2],int n,int m){
int i,j;
for(i=0;i<n;i++)
{
	for(j=0;j<m;j++)
	{
		   printf("%d",arr[i][j]);
	}
	printf("\n");
}
}
int main() {
	int i,j,m,n;
	printf("Enter the rows for the matrix\n");
	scanf("%d",&m);
	printf("Enter the columns for the matrix\n");
	scanf("%d",&n);
	int ar[m][n];
	for(i=0;i<m;i++)
	{
		for(j=0;j<n;j++)
		{
			scanf("%d",&ar[i][j]);
		}
	}
	matrix(ar,m,n);
	return 0;
}
