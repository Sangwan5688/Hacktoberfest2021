/*****************************************************************
 * Successfully Runs on Turbo C++
 * ***************************************************************/

//BANKING SYSTEM

#include<iostream.h>

#include<conio.h>

#include<stdlib.h>

#include<dos.h>

class bank {
    private:
        static int acctno;
    static int acttno;
    char name[20], add[20], ph_no[10];
    public:
        static void increment();
    static void display();
    static void increse();
    static void show();
    void saving();
    void curr();
};
void bank::saving() {
    int ch, acno;
    long int amt, ammt, ammt1, bal = 0;
    do {
        clrscr();
        cout << "*****MENU*****" << endl;
        cout << "1.A/C opening\n2.Deposit\n3.Withdraw\n4.BALANCE\n5.close\n" << endl;
        cout << "Enter your choice : ";
        cin >> ch;
        clrscr();
        switch (ch) {
        case 1:
            clrscr();
            bank::increment();
            bank::display();
            cout << "Enter Name             : ";
            cin >> name;
            cout << "Enter Address          : ";
            cin >> add;
            cout << "Enter Phone no         : ";
            cin >> ph_no;
            cout << "Account Type           :Saving" << endl;
            cout << "Enter Amount           : ";
            cin >> amt;
            while (amt < 500) {
                cout << "Amount must be Rs.500" << endl;
                cout << "Enter Amount           : ";
                cin >> amt;
            }
            cout << "Account has been created" << endl;
            bal = bal + amt;
            cout << "Now your BALANCE is : " << bal;
            cout << "\n\nHit a KEY to come back Main Menu" << endl;
            getch();
            break;
        case 2:
            clrscr();
            cout << "Enter A/C No : ";
            cin >> acno;
            if (acctno == acno) {
                cout << "Name             : " << name << endl;
                cout << "Address          : " << add << endl;
                cout << "Phone no         : " << ph_no << endl;
                cout << "Account Type     :Saving" << endl;
                cout << "Enter Amount to Deposit:";
                cin >> ammt;
                cout << "Deposit Amount added to your Account" << endl;
                bal = bal + ammt;
                cout << "Your BALANCE is: " << bal << endl;
            } else {
                cout << "Enter valid Account number" << endl;
            }
            cout << "\n\nHit a KEY to come back Main Menu" << endl;
            getch();
            break;
        case 3:
            clrscr();
            cout << "Enter A/C No           : ";
            cin >> acno;
            if (acctno == acno) {
                cout << "Name                   : " << name << endl;
                cout << "Address                : " << add << endl;
                cout << "Phone no               : " << ph_no << endl;
                cout << "Account type           :Saving" << endl;
                cout << "Your BALANCE is        : " << bal << endl;
                cout << "Enter Withdrawl Amount : ";
                cin >> ammt1;
                if (ammt1 <= bal) {
                    cout << "Rs." << ammt1 << " Ammount Withdrawl from your account" << endl;
                    bal = bal - ammt1;
                    cout << "Now your BALANCE is : " << bal;
                } else {
                    cout << "You can't withdraw any amount" << endl;
                    cout << "Insufficient BALANCE" << endl;
                }
            } else {
                cout << "Enter valid Account number" << endl;
            }
            cout << "\n\nHit a KEY to come back Main Menu" << endl;
            getch();
            break;
        case 4:
            clrscr();
            cout << "Enter A/C No     : ";
            cin >> acno;
            if (acctno == acno) {
                cout << "Name             : " << name << endl;
                cout << "Address          : " << add << endl;
                cout << "Phone no         : " << ph_no << endl;
                cout << "Account type     :Saving" << endl;
                cout << "Your BALANCE is  : " << bal << endl;
            } else {
                cout << "enter valid account number" << endl;
            }
            cout << "\n\nHit a KEY to come back Main Menu" << endl;
            getch();
            break;
        case 5:
            return;
        default:
            clrscr();
            cout << "wrong choice entered";
            cout << "\n\nHit a KEY to come back Main Menu" << endl;
            getch();
        }
    } while (ch != 5);
}
void bank::curr() {
    int ch, acno;
    long int amt, ammt, ammt1, bal = 0;
    do {
        clrscr();
        cout << "*****MENU*****" << endl;
        cout << "1.A/C opening\n2.Deposit\n3.Withdraw\n4.Balance\n5.close" << endl;
        cout << "\nEnter your Choice : ";
        cin >> ch;
        clrscr();
        switch (ch) {
        case 1:
            clrscr();
            bank::increse();
            bank::show();
            cout << "Enter Name             : ";
            cin >> name;
            cout << "Enter Address          : ";
            cin >> add;
            cout << "Enter Phone no         : ";
            cin >> ph_no;
            cout << "Account Type           :Current" << endl;
            cout << "Enter Amount           : ";
            cin >> amt;
            while (amt < 1000) {
                cout << "Amount must be Rs.1000" << endl;
                cout << "Enter Amount           : ";
                cin >> amt;
            }

            cout << "Account has been created" << endl;
            bal = bal + amt;
            cout << "Now your BALANCE is : " << bal;
            cout << "\n\nHit a KEY to come back Main Menu" << endl;
            getch();
            break;
        case 2:
            clrscr();
            cout << "Enter A/C No : ";
            cin >> acno;
            if (acttno == acno) {
                cout << "Name             : " << name << endl;
                cout << "Address          : " << add << endl;
                cout << "Phone no         : " << ph_no << endl;
                cout << "Account type     :Current" << endl;
                cout << "Enter Amount to Deposit:";
                cin >> ammt;
                cout << "Deposit Amount added to your account" << endl;
                bal = bal + ammt;
                cout << "Your BALANCE is : " << bal << endl;
            } else {
                cout << "Enter valid Account number" << endl;
            }
            cout << "\n\nHit a KEY to come back Main Menu" << endl;
            getch();
            break;
        case 3:
            clrscr();
            cout << "Enter A/C No : ";
            cin >> acno;
            if (acttno == acno) {
                cout << "Name             : " << name << endl;
                cout << "Address          : " << add << endl;
                cout << "Phone no         : " << ph_no << endl;
                cout << "Account Type     :Current" << endl;
                cout << "Your BALANCE is  : " << bal << endl;
                cout << "Enter Withdrawl Amount : ";
                cin >> ammt1;
                if (ammt1 <= bal) {
                    cout << "Rs." << ammt1 << " Ammount Withdrawl from your Account" << endl;
                    bal = bal - ammt1;
                    cout << "Now your BALANCE is : " << bal;
                } else {
                    cout << "You can't withdraw any amount" << endl;
                    cout << "Insufficient BALANCE" << endl;
                }
            } else {
                cout << "Enter valid Account number" << endl;
            }
            cout << "\n\nHit a KEY to come back Main Menu" << endl;
            getch();
            break;
        case 4:
            clrscr();
            cout << "Enter A/C No : ";
            cin >> acno;
            if (acttno == acno) {
                cout << "Name             : " << name << endl;
                cout << "Address          : " << add << endl;
                cout << "Phone no         : " << ph_no << endl;
                cout << "Account type     :Current" << endl;
                cout << "Your BALANCE is  : " << bal << endl;
            } else {
                cout << "Enter valid Account number" << endl;
            }
            cout << "\n\nHit a KEY to come back Main Menu" << endl;
            getch();
            break;
        case 5:
            return;
        default:
            clrscr();
            cout << "wrong choice entered";
            cout << "\n\nHit a KEY to come back Main Menu" << endl;
            getch();
        }
    } while (ch != 5);
}
int bank::acctno;
void bank::increment() {
    bank::acctno = bank::acctno + 1;
}
void bank::display() {
    cout << "Account No.            : " << bank::acctno << endl;
}
int bank::acttno;
void bank::increse() {
    bank::acttno = bank::acttno + 1;
}
void bank::show() {
    cout << "Account No.            : " << bank::acttno << endl;
}
int main() {
    bank b;
    int choice;
    clrscr();
    cout << "\n\t\t**************************************************";
    cout << "\n\t\t**************************************************";
    cout << "\n\t\t**                                              **";
    cout << "\n\t\t**      Welcome to Bank Management system       **";
    cout << "\n\t\t**                                              **";
    cout << "\n\t\t**************************************************";
    cout << "\n\t\t**************************************************";
    cout << "\n\n\n\n\n\t\t\tPress any key to Proceed further";
    getch();
    clrscr();
    do {
        cout << "*****MENU*****" << endl;
        cout << "\n1.Savings\n2.Current\n3.Exit\n" << endl;
        cout << "Enter your choice : ";
        cin >> choice;
        clrscr();
        switch (choice) {
        case 1:
            b.saving();
            break;
        case 2:
            b.curr();
            break;
        case 3:
            cout << endl << "\n\n\n\n\n\n\n\t_____________________Thank You For Visiting_____________________" << endl;
            delay(1000);
            exit(0);
        default:
            clrscr();
            cout << "wrong choice entered";
            getch();
        }
    } while (choice != 3);
    getch();
    return (0);
}
