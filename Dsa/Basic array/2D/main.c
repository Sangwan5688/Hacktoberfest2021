#include <stdio.h>
#include <stdlib.h>


int main() {
	int row,col;
	printf("Enter the number of rows for the matrix\n");
	scanf("%d",&row);
	printf("Enter the number of rows for the matrix\n");
	scanf("%d",&col);
	int a[30][30];
	printf("Enter the elements\n");
	for(i=0;i<row;i++)
	{
		for(j=0;j<col;j++)
		{
			printf("Enter the element at %d,%d ",i+1,j+1);
			scanf("%d",&a[i][j]);
		}
	} 
	return 0;
}
