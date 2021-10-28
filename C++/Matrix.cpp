#include<iostream>
using namespace std;
template<class T>
class matrix
{
	T ** matr;
	int rows,colm;
public:
	matrix()
	{
		matr=nullptr;
		rows=0;
		colm=0;
	}
	matrix(int r,int c)
	{
		
		rows=r;
		colm=c;
		matr=new T*[r];
		for(int i=0;i<r;i++)
		{
			matr[i]=new T[c];
		}
	}
	matrix(matrix & obj)
	{
		this->rows=obj.rows;
		this->colm=obj.colm;
		this->matr=new T*[obj.rows];
		for(int i=0;i<obj.rows;i++)
		{
			matr[i]=new T[obj.colm];
		}
		for(int i=0;i<obj.rows;i++)
		{
			for(int j=0;j<obj.colm;j++)
			{
				this->matr[i][j]=obj.matr[i][j];
			}
		}
	}
	void insertmatrix(T const& ele,int r,int c)
	{
		this->matr[r][c]=ele;
	}
	matrix<T> operator + (matrix const &obj)
	{
		matrix mtemp;
		mtemp.rows=this->rows;
		mtemp.colm=this->colm;
		mtemp.matr=new T*[obj.rows];
		for(int i=0;i<obj.rows;i++)
		{
			mtemp.matr[i]=new T[obj.colm];
		}
		if(obj.colm==this->colm &&obj.rows==this->rows)
		{
			for(int i=0;i<obj.rows;i++)
			{
				for(int j=0;j<obj.colm;j++)
				{
					mtemp.matr[i][j]=this->matr[i][j]+obj.matr[i][j];
				}
			}
		}
		else
		{
			cout<<"mismatch occur\n";
		}
		return mtemp;
	}
	void print()
	{
		for(int i=0;i<this->rows;i++)
		{
			for(int j=0;j<this->colm;j++)
			{
				cout<<this->matr[i][j]<<'\t';
			}
			cout<<'\n';
		}
	}
	void transpose()
	{
		matrix temp;
		int r=this->colm;
		int c=this->rows;
		temp.matr=new T*[r];
		for(int i=0;i<r;i++)
		{
			temp.matr[i]=new T[this->rows];
		}
		for(int i=0;i<this->colm;i++)
		{
			for(int j=0;j<this->rows;j++)
			{
				temp.matr[i][j]=this->matr[j][i];
			}
		}
		for(int i=0;i<this->rows;i++)
		{
			delete[] matr[i];
		}
		delete [] matr;
		this->rows=r;
		this->colm=c;
		this->matr=new T*[r];
		for(int i=0;i<r;i++)
		{
			matr[i]=new T[c];
		}
		for(int i=0;i<r;i++)
		{
			for(int j=0;j<c;j++)
			{
				matr[i][j]=temp.matr[i][j];
			}
		}
	}
	~matrix()
	{
		if(matr!=nullptr)
		{
			for(int i=0;i<rows;i++)
			{
				if(matr[i]!=nullptr)
				delete [] matr[i];
			}
			delete [] matr;
		}
	}
};
void main()
{
matrix<int> m1(2, 3);
m1.insertmatrix(1, 0, 0);
m1.insertmatrix(1, 0, 1);
m1.insertmatrix(1, 0, 2);
m1.insertmatrix(0, 1, 0);
m1.insertmatrix(0, 1, 1);
m1.insertmatrix(0, 1, 2);
m1.transpose();
matrix<int> m2(2, 3);
m2.insertmatrix(-1, 0, 0);
m2.insertmatrix(-1, 0, 1);
m2.insertmatrix(-1, 0, 2);
m2.insertmatrix(10, 1, 0);
m2.insertmatrix(5, 1, 1);
m2.insertmatrix(1, 1, 2);
m2.transpose();
matrix<int> m3(m2);
matrix<int> m4(m1 + m3);
m4.transpose();
m4.print();
system("pause");
}