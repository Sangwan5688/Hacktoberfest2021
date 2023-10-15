//This is a c++ program which will help you to calculate how many different notes will be required to pay a certain amount 
//This can be used by ATM to give money in different types of notes available inside it to give to the customer.

/*For Example:
To pay Rs.752 please use following notes: 
Number of 500 notes required is : 1  (500 X 1)
Number of 200 notes required is : 1  (200 X 1)
Number of  50 notes required is : 1  (50 X 1)
Number of  1  notes required is : 2  (1 X 2)
*/
#include<iostream>
#include<math.h>
using namespace std;


int main(){
    cout<<"A program to calculate number of notes reqired to pay a certain amount"<<endl<<endl;
    cout<<"----------------------------------------------------------------"<<endl;
    cout<<"Please Enter amount in Rs. : ";
    int amt;
    cin>>amt;
    //We store all value notes in an array
    int notes[]={500,200,100,50,20,10,5,1};
    cout<<"------------------------------------------------------------------"<<endl;
    cout<<"To pay Rs."<<amt<<" please use following notes: "<<endl<<endl;
    //we iterate through all notes and find total notes required
    for(int i=0;i<8;i++){
        if(amt>=notes[i]){
        int total_notes=amt/notes[i];
        cout<<"Number of "<<notes[i]<<" notes required is  : "<<total_notes<<"  ("<<notes[i]<<" X "<<total_notes<<")"<<endl; 
        amt=amt-(total_notes*notes[i]);
        }
        
    }
    cout<<"----------------------------------------------------------------"<<endl;
}
