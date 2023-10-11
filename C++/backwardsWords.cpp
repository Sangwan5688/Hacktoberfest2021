#include <iostream>
#include <cstring> //for strlen()
using namespace std;

//function prototype
void displayBack(char *);

int main()
{
    //declare char array for C-string
    //of size 21
    char inputString[21];

    //prompt user to enter input
    //then read
    cout << "Enter a string with a maximum of 20 characters\n";
    cout << "and I will display it backwards!\n";
    cout << "Enter your string at below:\n";
    //read up until 20 characters, pass 21 as second argument
    //to account for null terminator
    cin.getline(inputString, 21);

    //call function and display backwards string message
    displayBack(inputString);

    //return 0 to mark successful termination
    return 0;
}

void displayBack(char *ptr)
{
    //use for loop, start from last character and decrement
    //counter until it reaches first char
    //counter is initialized to strlen()-1 to get proper
    //index of last char
    cout << "Here is the reversed words:\n";
    for (int counter = strlen(ptr) - 1; counter >= 0; counter--)
        cout << ptr[counter];
}