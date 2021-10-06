#include <iostream>
using namespace std;
 
class student
{
    private:
        char  name[30];
        int   rollNo;
        int   total;
        float perc;
    public:
        void getDetails(void);
        void display_Details(void);
};
 void student::getDetails(void)
 {
    cout << "Enter name: " ;
    cin >> name;
    cout << "Enter roll number: ";
    cin >> rollNo;
    cout << "Enter total marks outof 500: ";
    cin >> total;
     
    perc=(float)total/500*100;
}
 
void student::display_Details(void)
{
    cout << "Student details:\n";
    cout << "Name:"<< name << ",Roll Number:" << rollNo << ",Total:" << total << ",Percentage:" << perc;
    cout<<endl;
}
 
int main()
{
    student std[10];       
    int n,i;
     
    cout << "Enter total number of students: ";
    cin >> n;
     
    for(i=0;i< n; i++)
    {
        cout << "Enter details of student " << (i+1) << ":\n";
        std[i].getDetails();
    }
     
    cout << endl;
     
    for(i=0;i< n; i++)
    {
        cout << "Details of student " << (i+1) << ":\n";
        std[i].display_Details();
    }
     
    return 0;
}