#include <iostream>
using namespace std;

void wavePrint(int **input, int n, int m)
{
for(int i=0; i<m; i++){
  if(i%2==0){
    for(int j=0; j<n; j++){
        cout<<input[j][i]<<" ";
    }
  }else{
     for(int j=n-1; j>=0; j--){
        cout<<input[j][i]<<" ";
    }
  }
  }
}

int main()
{
    int t;
	cin >> t;
	while (t--)
	{
		int row, col;
		cin >> row >> col;
		int **input = new int *[row];
		for (int i = 0; i < row; i++)
		{
			input[i] = new int[col];
			for (int j = 0; j < col; j++)
			{
				cin >> input[i][j];
			}
		}
		wavePrint(input, row, col);
		cout << endl;
	}
}
