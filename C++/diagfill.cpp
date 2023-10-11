#include <iostream>

using namespace std;

int main()
{
	int n;
	int arr[n][n];
	cout<<"enter array size : ";
	cin>>n;
	int y,z=1,c=1,d=n-1;

	for (int i = 0; i<n; i++)
	{
		for (int j = 0; j<n; j++)
		{
			if((i+j)<=(n-1))
			{
				arr[i][j]=z;
				if(i==3 && j==0)
					y=z+1;
				z+=c;
				c++;
			}
			else
			{
				arr[i][j]=y;
				y-=d;
				d--;
			}
		}
	}
	for(int a=0;a<n;a++)
	{
		for(int b=0;b<n;b++)
			cout<<arr[a][b]<<"  ";
		cout<<endl;
	}
	return 0;
}