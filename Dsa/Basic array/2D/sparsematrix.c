#include <stdio.h>
#include <stdlib.h>

int main() {
	int row,col,i,j;
	printf("Enter the number of rows for the matrix\n");
	scanf("%d",&row);
	printf("Enter the number of rows for the matrix\n");
	scanf("%d",&col);
	int a[30][30],b[100][3];
	printf("Enter the elements for the sparse matrix\n");
	for(i=0;i<row;i++)
	{
		for(j=0;j<col;j++)
		{
			printf("Enter the element at %d,%d : ",i,j);
			scanf("%d",&a[i][j]);
		}
	} 
	printf("Matrix: \n");
	for(i=0;i<row;i++)
	{
		for(j=0;j<col;j++)
		{
			printf("%d ",a[i][j]);
		}
		printf("\n");
	}
	int k=0;
	b[0][0]=row;
	b[0][1]=col;
	for(i=0;i<row;i++)
	{
		for(j=0;j<col;j++)
		{
			if(a[i][j]!=0)
			{
				k++;
				b[k][0]=i;
				b[k][1]=j;
				b[k][2]=a[i][j];
			}
		}
			}
		b[0][k]=k;
	for(i=0;i<k;i++)
	{
		for(j=0;j<3;j++)
	{
			printf("%d ",b[i][j]);
		}
        printf("\n");  		
	}
	return 0;
}
