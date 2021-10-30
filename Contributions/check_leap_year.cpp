#include <iostream>
using namespace std;

bool leapYear(int y);

int main(){
   int y;
   cout<<"Enter year: ";
   cin>>y;
   //Calling function
   bool flag = leapYear(y);
   if(flag == true)  
      cout<<y<<" is a leap Year"; 
   else 
      cout<<y<<" is not a leap Year";
   return 0;
}
bool leapYear(int y){
   bool isLeapYear = false;
   if (y % 4 == 0) {
      if (y % 100 == 0) {
         if (y % 400 == 0) {
            isLeapYear = true;
         }
      } 
      else isLeapYear = true;
   }
   return isLeapYear;
}
