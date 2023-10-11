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
	int compactMatrix[size][3]; 
	int k = 0; 
	for (i = 0; i < 4; i++) 
		for (j = 0; j < 5; j++) 
			if (sparseMatrix[i][j] != 0) 
			{ 
				compactMatrix[k][0] = i; 
				compactMatrix[k][1] = j; 
				compactMatrix[k][2] = sparseMatrix[i][j]; 
				k++; 
			} 
	for (i=0; i<size; i++) 
	{ 
		for (j=0; j<3; j++) 
			printf("%d ", compactMatrix[i][j]); 

		printf("\n"); 
	} 
	return 0; 
}
