#include<stdio.h> 
int main() 
{
	int i,j;
	// Assume 4x5 sparse matrix 
	int sparseMatrix[4][5] = 
	{ 
		{0 , 0 , 3 , 0 , 4 }, 
		{0 , 0 , 5 , 7 , 0 }, 
		{0 , 0 , 0 , 0 , 0 }, 
		{0 , 2 , 6 , 0 , 0 } 
	}; 
	int size = 0; 
	for (i = 0; i < 4; i++) 
		for (j = 0; j < 5; j++) 
			if (sparseMatrix[i][j] != 0) 
				size++; 
	int compactMatrix[3][size]; 
	int k = 0; 
	for (i = 0; i < 4; i++) 
		for (j = 0; j < 5; j++) 
			if (sparseMatrix[i][j] != 0) 
			{ 
				compactMatrix[0][k] = i; 
				compactMatrix[1][k] = j; 
				compactMatrix[2][k] = sparseMatrix[i][j]; 
				k++; 
			} 
	for (i=0; i<3; i++) 
	{ 
		for (j=0; j<size; j++) 
			printf("%d ", compactMatrix[i][j]); 

		printf("\n"); 
	} 
	return 0; 
}
