#include <iostream>
using namespace std;
struct Student 
{
    int id;
    char name[20];
    int age;
    float math;
    float english;
    float science;
};
const int limit = 100;
Student students[limit];
int numstudents = 0;

void addrecord() 
{
    if (numstudents >= limit) 
	{
        cout<< "Student record limit reached.\n";
        return;
    }
    
    Student& student = students[numstudents++];
    
    cout << "Enter Student ID: ";
    cin>>student.id;
    
    cout<< "Enter Name: ";
    cin>>student.name;
    cout << "Enter Age: ";
    cin >> student.age;
    cout << "Enter Marks in Mathematics: ";
    cin >> student.math;
    cout << "Enter Marks in English: ";
    cin >> student.english;
    cout << "Enter Marks in Science: ";
    cin >> student.science;
}

void display() 
{
    for (int i = 0; i < numstudents; i++) 
	{
        cout << "\nStudent ID: " << students[i].id << "\nName: " << students[i].name << "\nAge: " << students[i].age
                  << "\nMathematics Marks : " << students[i].math << "\nEnglish Marks : " << students[i].english
                  << "\nScience Marks : " << students[i].science << "\n\n";
    }
}

void search(int id) 
{
    for (int i = 0; i < numstudents; i++) 
	{
        if (students[i].id == id) 
		{
            cout << "Student ID: " << students[i].id << "\nName: " << students[i].name << "\nAge: " << students[i].age
                      << "\nMathematics Marks : " << students[i].math << "\nEnglish Marks : " << students[i].english
                      << "\nScience Marks : " << students[i].science << "\n\n";
            return;
        }
    }
    cout << "Student ID not found.\n";
}

void calc_avg() 
{
    float total_math = 0, total_english = 0, total_science = 0;
    for (int i = 0; i < numstudents; i++) 
	{
        total_math += students[i].math;
        total_english += students[i].english;
        total_science += students[i].science;
    }
    cout << "Average Mathematics marks: " << total_math / numstudents
              << "\nAverage English marks: " << total_english / numstudents
              << "\nAverage Science marks: " << total_science / numstudents << "\n";
}

void displayhighest() 
{
    Student highest_scorer = students[0];
    float highest_score = students[0].math + students[0].english + students[0].science;
    
    for (int i = 1; i < numstudents; i++) 
	{
        float total_marks = students[i].math + students[i].english + students[i].science;
        if (total_marks > highest_score) 
		{
            highest_scorer = students[i];
            highest_score = total_marks;
        }
    }
    cout << "Highest scorer: " << highest_scorer.name << "\nHighest Scorer ID: " << highest_scorer.id << "\nHighest Score: " << highest_score << "\n";
}

int main() 
{
    int ch;
    int id;
    do {
        cout << "1.Add New Record\n2.Display All Records\n3.Search for a Student by ID\n4.Calculate Average Marks\n5.Display Highest Scorer\n6.Exit \nEnter your choice: ";
        cin >> ch;
        cout<<"\n";
        switch (ch) 
		{
            case 1:
                addrecord();
                cout<<"\n";
                break;
            case 2:
                display();
                break;
            case 3:
                cout << "Enter Student ID to search: ";
                cin >> id;
                search(id);
                cout<<"\n";
                break;
            case 4:
                calc_avg();
                cout<<"\n";
                break;
            case 5:
                displayhighest();
                cout<<"\n";
                break;
            case 6:
                cout << "EXITING PROGRAM \n";
                break;
            default:
                cout << "INVALID CHOICE \n";
                break;
        }
    } while (ch != 6);

    return 0;
}
