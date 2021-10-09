#include<iostream>
#include<fstream>
using namespace std;
class Person
{
    private:
        int age,ph_no,present,absent;
        string f_name,l_name,address;
    public:
        void input()
        {
            cout<<"Enter First name: ";
            cin>>f_name;
            cout<<"Enter Last Name: ";
            cin>>l_name;
            cout<<"Enter Age: ";
            cin>>age;
            cout<<"Enter phone number: ";
            cin>>ph_no;
            cout<<"Enter Address: ";
            cin>>address;
            cout<<"Enter present days: ";
            cin>>present;
            cout<<"Enter absent days: ";
            cin>>absent;
        }
    void display()
    {

        cout<<"Name:  "<<f_name+l_name<<endl;
        cout<<"Age:   "<<age<<endl;
        cout<<"Ph_no: "<<ph_no<<endl;
        cout<<"Address: "<<address<<endl;
        cout<<"Present days: "<<present<<endl;
        cout<<"Absent days: "<<absent<<endl;
    }
};

class Student: public Person
{
    int Class,roll_no;
    public:
        void input()
        {
            Person::input();
            cout<<"Enter your class: ";
            cin>>Class;
            cout<<"Enter your roll no: ";
            cin>>roll_no;
        }
        int returnRoll_no()
        {
            return roll_no;
        }
        void display()
        {
            Person::display();
            cout<<"Class: "<<Class<<endl;
            cout<<"Roll no: "<<roll_no<<endl;
        }
};

class Staff: public Person
{
    private:
        int s_salary,s_id;
    public:
        void input()
        {
            Person::input();
            cout<<"Enter staff's id: ";
            cin>>s_id;
            cout<<"Enter salary: ";
            cin>>s_salary;
        }

        int returnS_id()
        {
            return s_id;
        }
        void display()
        {
            Person::display();
            cout<<"Staff ID: "<<s_id<<endl;
            cout<<"Salary: "<<s_salary<<endl;

        }

};

class Teacher: public Person
{
    private:
        int t_id,t_salary;

    public:
        void input()
        {
            Person::input();
            cout<<"Enter id: ";
            cin>>t_id;
            cout<<"Enter salary: ";
            cin>>t_salary;
        }

        int returnT_id()
        {
            return t_id;
        }

        void display()
        {
            Person::display();
            cout<<"Teacher ID: "<<t_id<<endl;
            cout<<"Salary: "<<t_salary<<endl;
        }
};

int main()
{
    Staff s1;
    Teacher t1;
    Student st1;
    bool loop_data=true;
    int choice,flag,id;
    ofstream o_file;
    ifstream I_file;
    cout<<"Enter your choice \n";

    while (loop_data)
    {
        cout<<"1. STAFF\n2. TEACHER \n3. STUDENT\n4. EXIT";
        cin>>choice;
        switch (choice)
        {
            case 1:
                o_file.open("STAFF.DAT",ios::out|ios::binary|ios::app);
                s1.input();
                o_file.write((char*)&s1,sizeof(s1));
                o_file.close();
                break;
            case 2:
                o_file.open("TEACHER.DAT",ios::out|ios::binary|ios::app);
                s1.input();
                o_file.write((char*)&t1,sizeof(t1));
                o_file.close();

                break;
            case 3:
                o_file.open("STAFF.DAT",ios::out|ios::binary|ios::app);
                s1.input();
                o_file.write((char*)&st1,sizeof(st1));
                o_file.close();

                break;
            case 4:
                loop_data=false;

            default:
                cout<<"Wrong choice \n Please try after a little bit later\n";
        }
    }



    loop_data=true;
    while (loop_data)
    {
        cout<<"1. STAFF\n2. TEACHER \n3. STUDENT\n4. EXIT";
        cin>>choice;
        switch (choice)
        {
            case 1:
                I_file.open("STAFF.DAT",ios::in|ios::binary);
                cout<<"Enter Staff Id ";
                cin>>id;
                flag=0;
                while (I_file.read((char*)&s1,sizeof(s1)))
                {
                    if(id==s1.returnS_id())
                    {
                        flag=1;
                        break;
                    }
                }

                if(flag==1)
                    s1.display();
                else
                {
                    cout<<"\nNo such Staff exist";
                }
                I_file.close();
                break;

            case 2:
                I_file.open("TEACHER.DAT",ios::in|ios::binary);
                cout<<"Enter Teacher's Id ";
                cin>>id;
                flag=0;
                while (I_file.read((char*)&t1,sizeof(t1)))
                {
                    if(id==t1.returnT_id())
                    {
                        flag=1;
                        break;
                    }
                }

                if(flag==1)
                    t1.display();
                else
                {
                    cout<<"\nNo such Staff exist";
                }
                I_file.close();
                break;

            case 3:
                I_file.open("STUDENT.DAT",ios::in|ios::binary);
                cout<<"Enter Student's Id ";
                cin>>id;
                flag=0;
                while (I_file.read((char*)&st1,sizeof(st1)))
                {
                    if(id==st1.returnRoll_no())
                    {
                        flag=1;
                        break;
                    }
                }

                if(flag==1)
                    st1.display();
                else
                {
                    cout<<"\nNo such Staff exist";
                }
                I_file.close();
                break;


            case 4:
                loop_data=false;

            default:
                cout<<"Wrong choice \n Please try after a little bit later\n";
        }
    }

}