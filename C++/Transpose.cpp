#include <iostream>
using namespace std;
int main()
{
	int n;
	cout<<"Enter Size of the matrix"<<endl;
  cin>>n;
    
	int B[n][n],A[n][n], i, j;
	cout<<"ENTER MATRIX ELEMENTS"<<endl;
    for (i = 0; i < n; i++) 
	{
        for (j = 0; j < n; j++)
        {
        	cin>>A[i][j];
		}
	}
	cout<<"ARRAY A:"<<endl;          //printing the original matrix
    for (i = 0; i < n; i++) 
	{
        for (j = 0; j <n; j++)
            cout << " " << A[i][j];
 
        cout << "\n";
    }
    for (i = 0; i < n; i++)
    {
	    for (j = 0; j < n; j++)
        {
        	B[i][j] = A[j][i];    //performing transpose operation
		}
            
}
    cout << "Resultant matrix is \n";   //printing the transpose of the matrix
    for (i = 0; i < n; i++) 
	{
        for (j = 0; j < n; j++)
            cout << " " << B[i][j];
 
        cout << "\n";
    }
    return 0;
}
