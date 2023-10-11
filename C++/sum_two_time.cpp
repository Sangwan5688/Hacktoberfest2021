#include<iostream>
using namespace std;
class Time
{
	private :
		int h1,m1,s1,h2,m2,s2,H,M,S;
	public :
		void GetData()
		{
			cout<<"enter time HH : MM :SS formate "<<endl;
			cout<<"enter value of hour :";
			cin>>h1;
			cout<<"enter value of minuts :";	
			cin>>m1;
			cout<<"enter value of seconds :";
			cin>>s1;	
			cout<<"enter value of hour2 :";
			cin>>h2;
			cout<<"enter value of minuts2 :";	
			cin>>m2;
			cout<<"enter value of seconds2 :";
			cin>>s2;	
		}
		void PrintData()
		{
			S = s1+s2;
			M = m1+m2+(S/60);
			H = h1+h2+(M/60);
			M = M%60;
			S = S%60;
			
			cout<<H<<" : "<<M<<" : "<<S<<endl;
		}
		
};
int main()
{
	Time a1;

	
		a1.GetData();
		a1.PrintData();

	
}
