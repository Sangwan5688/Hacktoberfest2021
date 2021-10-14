#include<stdio.h>
#include<limits.h>
#include<stdlib.h>

int mcOrder(int P[], int i, int j)
{
	if (i==0||j==0||j==i||j<=i)
    {
		return 0;
    }
	int k;
	int min = INT_MAX;
	int c;


	for (k = i; k < j; k++)
	{
		c = mcOrder(P, i, k)+ mcOrder(P, k + 1, j)+ P[i - 1] * P[k] * P[j];
		if (c < min)
			min = c;
	}

	return min;
}

int main()
{
    int n;
    scanf("%d", &n);
    int array[n+1];
    int M[n+1][n+1];
    for(int i=0;i<n+1;i++)
    {
        for(int j=0;j<n+1;j++)
        {
            M[i][j]=0;
        }
    }
    for(int i=0;i<=n;i++)
    {
        scanf("%d",&array[i]);
    }
    for(int i=0;i<n+1;i++)
    {
        for(int j=0;j<n+1;j++)
        {
            M[i][j]=mcOrder(array, i, j);
        }
    }

    for(int i=1;i<n+1;i++)
    {
        for(int j=1;j<n+1;j++)
        {
            printf("%d ",M[i][j]);
        }
        printf("%\n");
    }

	// printf("%d",mcOrder(array, 1, n - 1));
	return 0;
}
