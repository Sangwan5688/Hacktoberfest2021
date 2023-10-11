#include<iostream>
using namespace std;
class Distance 
{
	private :
		int km,m,tm=0;
	public :
		void getData()
		{
			cout<<"enter kilometer : ";
			cin>>km;
			cout<<"enter meter :";
			cin>>m;
		}
		Distance sum (Distance T)
		{
			Distance S;
			S.km = km + T.km ;
			S.m = m + T.m;
			
			return S;
		}
		
		void printData()
		{

			tm = m %1000; 
			
			
			km = km + m/1000; 
			cout<<km<<"  "<<tm;
		}	
};
int main()
{
	Distance a1,a2,a3;
	a1.getData();
	a2.getData();
	a3 = a1.sum(a2);
	a3.printData();
}
