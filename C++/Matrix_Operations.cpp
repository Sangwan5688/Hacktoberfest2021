#include<iostream>
using namespace std;
int ch;
void add(int A[][3], int B[][3]);
void difference(int A[][3], int B[][3]);
void multiply(int A[][3], int B[][3]);
void transpose(int A[][3], int B[][3]);

int main()
{   
    int i,j;
    int A[][3]={{1,2,3},{4,5,6},{7,8,9}};
 	cout<<"Printing MATRIX 1 : "<<endl;
 	for(i=0;i<3;i++)
 	{
 		for(j=0;j<3;j++)
 		{
 			cout<<A[i][j]<<" ";
		 }
		 cout<<endl;
	 }
	 
    int B[][3]={{10,20,30},{40,50,60},{70,80,90}};
 	cout<<"Printing MATRIX 2 : "<<endl;
 	for(i=0;i<3;i++)
 	{
 		for(j=0;j<3;j++)
 		{
 			cout<<B[i][j]<<" ";
		 }
		 cout<<endl;
	 }
 	
 	
do {
 	cout<<endl;
	cout<<"1.Perform Addition"<<endl;
 	cout<<"2.Perform Subtraction"<<endl;
 	cout<<"3.Perform Multiplication"<<endl;
    cout<<"4.Perform Transpose"<<endl;
 	cout<<"5.EXIT"<<endl;
 	
 	cout<<"\n Enter Your Choice : ";
    cin>>ch;
 	switch(ch)
 {
 	case 1:	
 	{
 		add(A,B);
 		break;
	 }
	 case 2:	
 	{
 		difference(A,B);
 		break;
	 }
	 case 3:	
 	{
 		multiply(A,B);
 		break;
	 }
	 case 4:	
 	{
 		transpose(A,B);
 		break;
	 }
	 case 5: 
	 cout<<"EXITING PROGRAM"<<endl;
	 break;
	 
	 default: cout<<"INVALID CHOICE"<<endl;
}
}while(ch!=5);
return 0;
}

void add(int A[][3], int B[][3])  //performing addition of two 2D Matrices
{
	int m=3,n=3,m1=3,n1=3;
	int i,j;
 	if(m==m1&&n==n1&&m==n1&&m1==n)
 	{
 		int sum[m][n1];
 		for(i=0;i<m;i++)
 		{
 			for(j=0;j<n1;j++)
 			{
 				sum[i][j]= A[i][j]+B[i][j];
			 }
		 }
 		
 		cout<<"\nRESULTANT SUM OF MATRICES :"<<endl;
 		
 		for(i=0;i<m;i++)
 		{
 			for(j=0;j<n1;j++)
 			{
 				cout<<sum[i][j]<<"  ";
			 }
			 cout<<"\n";
		 }
	 }
	 else
	 cout<<"Addition NOT POSSIBLE"<<endl;
 	
}
void difference(int A[][3], int B[][3])   //performing subtraction of two 2D Matrices
{
{
 	int m=3,n=3,m1=3,n1=3;
	int i,j;
 	if(m==m1&&n==n1&&m==n1&&m1==n)
 	{
 		int sub[m][n1];
 		for(i=0;i<m;i++)
 		{
 			for(j=0;j<n1;j++)
 			{
 				sub[i][j]= A[i][j] - B[i][j];
			 }	
		}
		
		 cout<<"\nRESULTANT DIFFERENCE MATRIX :"<<endl;
		 for(i=0;i<m;i++)
 		{
 			for(j=0;j<n1;j++)
 			{
 				cout<<sub[i][j]<<" ";
			 }
			 cout<<endl;
		 }
	 }
	 else
	 cout<<"Subtraction NOT POSSIBLE"<<endl;
}
void multiply(int A[][3], int B[][3])  //performing multiplication of two 2D Matrices
{
{
	int m=3,n=3,m1=3,n1=3;
	int i,j,k;
	
	if(m1==n)
 	{
 		int sum[m][n1];
 		for(i=0;i<n1;i++)
 		{ 
		 int a=0,s=0;
 			for(j=0;j<m;j++)
 			{
 				a=0;
 				for(k=0;k<n;k++)
 				{
 					s=s+ A[j][k]*B[a][i];
 					a++;
				 }
 				sum[i][j]= s;
			 }
		 }
 		
 		cout<<"\nRESULTANT MULTIPLIED MATRICES :"<<endl;
 		
 		for(i=0;i<m;i++)
 		{
 			for(j=0;j<n1;j++)
 			{
 				cout<<sum[i][j]<<"  ";
			 }
			 cout<<"\n";
		 }
	 }
	 else
	 cout<<"MULTIPLICATION NOT POSSIBLE"<<endl;
 	
}

void transpose(int A[][3], int B[][3]) ////performing transpose of two 2D Matrices
{
{
		int m=3,n=3,m1=3,n1=3;
	    int i,j;
	    int A1[m][n],B1[m1][n1];
	
	 for (i = 0; i < m; i++)
    {
	    for (j = 0; j < n; j++)
        {
        	A1[i][j] = A[j][i];
		}
            
}
     cout << "\nTRANSPOSE OF MATRIX 1: \n";
    for (i = 0; i < m; i++) 
	{
        for (j = 0; j < n; j++)
            cout << A1[i][j]<< " " ;
 
        cout <<endl;
    }

 for (i = 0; i < m1; i++)
    {
	    for (j = 0; j < n1; j++)
        {
        	B1[i][j] = B[j][i];
		}
            
}
 cout << "\nTRANSPOSE OF MATRIX 2: \n";
    for (i = 0; i < m1; i++) 
	{
        for (j = 0; j < n1; j++)
            cout << B1[i][j]<< " " ;
 
        cout <<endl;
    }
}
