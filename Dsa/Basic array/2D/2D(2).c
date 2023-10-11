#include <stdio.h>
#include <stdlib.h>
void add(int a[20][20],int b[30][30],int c[60][60],int n,int m,int l,int p){
	int i,j;
	if(n==l && m==p)
	{
		for(i=0;i<n;i++)
		{
			for(j=0;j<m;j++)
			{
			c[i][j]=a[i][j]+b[i][j];
			}
		}
	printf("After addition array is\n");
	for(i=0;i<n;i++)
	{
		for(j=0;j<m;j++)
		{
			printf("%d ",c[i][j]);
		}
		printf("\n");
	}
}
	else{
	
	printf("Addition not possible\n");
}
}
int main() {
	int n,m,l,p,i,j;
	printf("Enter the number of rows for Matrix 1: \n");
	scanf("%d",&n);
	printf("Enter the number of columns for Matrix 2: \n");
	scanf("%d",&m);
	int a[20][20],b[30][30],c[60][60];
	printf("Enter the elements for matrix 1: \n");
	for(i=0;i<n;i++)
	{
		for(j=0;j<m;j++)
		{
			scanf("%d",&a[i][j]);
		}
	}
	printf("Enter the number of rows for Matrix 2: \n");
	scanf("%d",&l);
	printf("Enter the number of columns for Matrix 2: \n");
	scanf("%d",&p);
	printf("Enter the elements for matrix 2: \n");
	for(i=0;i<l;i++)
	{
		for(j=0;j<p;j++)
		{
			scanf("%d",&b[i][j]);
		}
	}
	add(a,b,c,n,m,l,p);
	return 0;
}
