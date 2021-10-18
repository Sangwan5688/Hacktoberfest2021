// Kashish Ahuja | @codeitmin
// Teachers' Attendance Management System

#include<iostream>
#include<conio.h>
#include<fstream>
#include<stdlib.h>
#include<string.h>
using namespace std;

class teacher
{
		char name[20], depart[10], subject[20], contact[10];
		int absent, present, holiday, dd, mm, yy;
    public:
		teacher() {absent=0; present=0; holiday=0;}
		void get();
		void put();
		void names(int q);
		void date();
		void check();
		void mark();
		void display();
};

void teacher :: get()
{
	cout<<"Enter teacher's name: "; cin.get(); cin.get(name, 20);
	cout<<"Enter teacher's department: "; cin>>depart;
	cout<<"Enter teacher's subject: "; cin>>subject;
	cout<<"Enter teacher's contact: "; cin>>contact;
	cout<<"\n";
}

void teacher :: put()
{
	cout<<"Name: "<<name<<endl;
	cout<<"Department: "<<depart<<endl;
	cout<<"Subject: "<<subject<<endl;
	cout<<"Contact: "<<contact<<endl;
	cout<<"\n";
}

void teacher :: names(int q)
{
	cout<<q<<") "<<name<<"\n";
}

void teacher :: date()
{
	system("cls");
	cout<<"\nEnter date for which you want to mark attendance in form of dd, mm, yy \n";
	cin>>dd>>mm>>yy;
	check();
}

void teacher :: check()
{
	if(mm>=1 && mm<=12)
	{
		if(mm==2)
		{
			if(yy%4==0)
			{
				if(dd<1 || dd>29)
				{
					cout<<"Wrong date \n";
					exit(0);
				}
			}
			else if(dd<1 || dd>28)
			{
				cout<<"Wrong date \n";
				exit(0);
			}
		}
		if(mm==4 || mm==6 || mm==9 || mm==11)
		{
			if(dd<1 || dd>30)
			{
				cout<<"Wrong date \n";
				exit(0);
			}
		}
		if(mm==1 || mm==3 || mm==5 || mm==7 || mm==8 || mm==10 || mm==12)
		{
			if(dd<1 || dd>31)
			{
				cout<<"Wrong date \n";
				exit(0);
			}
		}
	}
	else
	{
		cout<<"Wrong month \n";
		exit(0);
	}
}

void teacher :: mark()
{
	cout<<"\n";
	cout<<"Select attendance option for "<<dd<<"/"<<mm<<"/"<<yy<<endl;
	cout<<"Absent = A \n";
	cout<<"Present = P \n";
	cout<<"Holiday/no class = H \n\n";
	char z;
	cin>>z;

		if(z == 'A' || z == 'a')
		{
			absent++ ;
		}

		else if (z == 'P' || z == 'p')
		{
			present++;
		}

		else if (z == 'H' || z == 'h')
		{
			holiday++;
		}
		else {
			cout<<"Not a valid option \n\n";
			exit(0);
		}
	cout<<"Attendance marked successfully. \n\n";
}

void teacher :: display()
{
	cout<<"Total attendance: "<<present<<endl;
	cout<<"Total leave/absent: "<<absent<<endl;
	cout<<"Total holidays: "<<holiday<<endl;
	cout<<"\n";
}

int main()
{
	system("cls");
	teacher T[5] ;

	cout<<"\n \n \n \n \n \n";
	cout<<"\t \t \t ------------------------------------- \n";
	cout<<"\t \t \t Teachers Attendence Management System \n";
	cout<<"\t \t \t ------------------------------------- \n";
	cout<<"\n \n \n";
	cout<<"\t \t \t \t \t \t - Kashish Ahuja \n";
	cout<<"\t \t \t \t \t \t   @codeitmin";
	cout<<"\n \n \n \n \n \n \n \n";
	// cout<<"Press any key to continue...\n";
	getch();
	system("cls");
	int i=1;

	fstream file;
	file.open("TAMS", ios::app | ios::in | ios::out | ios::binary | ios::ate);
	cout<<"Do you want to add a new teacher's data? [Y/N] : ";
	char ch; cin>>ch;
	system("cls");
	if(ch=='Y' || ch=='y')
	{
		again:
		T[i].get();
		file.write((char *) &T[i], sizeof(T[i]));
		i++;
		cout<<"Do you want to add more teacher's data? [Y/N] :  ";
		char ch; cin>>ch;
		system("cls");
		if(ch=='Y' || ch=='y')
		{
			system("cls");
			goto again;
		}
		else if(ch=='N' || ch=='n')
		{
			goto first;
		}
		system("cls");
	}

	first:
	cout<<"Select a teacher whose activity you want by entering its position number \n\n";
	cout<<"Teacher's list \n";
	cout<<"--------------------- \n";
	file.seekg(0);
	int q=1;
	while(file.read((char *) &T[i], sizeof(T[i])))
	{
		T[i].names(q);
		q++;
	}
	file.clear();
	cout<<"---------------------- \n\n";
	cout<<"100) Add another teacher's data\n";
	// cout<<"300) Modify a teacher's data\n";
	cout<<"500) Exit\n\n";
	int n; cin>>n;
	system("cls");

	if(n==100)
	{
		T[i].get();
		file.write((char *) & T[i], sizeof(T[i]));
		cout<<"Successfully added \n\n";
		cout<<"Do you want to add more teacher's data? [Y/N] :  ";
		char ch; cin>>ch;
		system("cls");
		if(ch=='Y' || ch=='y')
			goto again;
		else if(ch=='N' || ch=='n')
			goto first;
	}
	/*else if(n==300)
	{
		modify:
		cout<<"Select a teacher whose data you want to modify by entering its position number \n\n";
		cout<<"Teacher's list \n";
		cout<<"--------------------- \n";
		file.seekg(0);
		int q=1;
		while(file.read((char *) & T[i], sizeof(T[i])))
		{
			T[i].names(q);
			q++;
		}
		file.clear();
		cout<<"---------------------- \n\n";

		int mod; cin>>mod;
		int location = (mod-1)*sizeof(T[0]);
		file.clear();
		file.seekp(location);
		cout<<"Enter new data. \n";
		T[mod].get();
		file.write((char *) &T[mod], sizeof(T[mod]));
		file.clear();
		cout<<"Successfully modified \n\n";
		cout<<"Do you want to modify more data? [Y/N] : ";
		char ch; cin>>ch;
		system("cls");
		if(ch=='Y' || ch=='y')
			goto modify;
		else if(ch=='N' || ch=='n')
			goto first;
	}*/
	else if(n==500)
		exit(0);
	else
	{
		i=n;
		second:
		cout<<"\n";
		cout<<"Select an activity by entering its position number \n\n";
		cout<<"Activity list \n";
		cout<<"------------------- \n";
		cout<<"1) Show teacher's data \n";
		cout<<"2) Mark attendance \n";
		cout<<"3) Display attendance \n";
		cout<<"-------------------- \n\n";
		cout<<"100) Go back\n";
		cout<<"500) Exit\n\n";
		int num; cin>>num;
		system("cls");
		if(num==1)
		{
			T[i].put();
			cout<<"\n";
			cout<<"100) Go back\n";
			cout<<"300) Go to main menu\n";
			cout<<"500) Exit\n\n";
			int r; cin>>r;
			system("cls");
			if(r==100)
				goto second;
			if(r==300)
				goto first;
			if(r==500)
				exit(0);
		}
		else if(num==2)
		{
			mark:
			T[i].date();
			T[i].mark();
			cout<<"\n";
			cout<<"Do you want to mark attendance for another day? [Y/N]: ";
			char ch; cin>>ch;

			if(ch=='Y' || ch=='y')
			{
				goto mark;
			} 

			if(ch=='N' || ch=='n')
			{
				cout<<"\n\n100) Go back\n";
				cout<<"300) Go to main menu\n";
				cout<<"500) Exit\n\n";
				int r; cin>>r;
				system("cls");
				if(r==100)
					goto second;
				if(r==300)
					goto first;
				if(r==500)
					exit(0);
			}
		}
		else if(num==3)
		{
			T[i].display();
			cout<<"\n";
			cout<<"100) Go back\n";
			cout<<"300) Go to main menu\n";
			cout<<"500) Exit\n\n";
			int r; cin>>r;
			system("cls");
			if(r==100)
				goto second;
			if(r==300)
				goto first;
			if(r==500)
				exit(0);
		}
		else if(num==100)
			goto first;
		else if(num==500)
			exit(0);
	}

	getch();
	return 0;
}