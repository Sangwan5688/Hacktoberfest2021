#include<iostream.h> 
#include<conio.h> 
 class student 
 { 
       private: 
                    int rn; 
                    float fees; 
       public: 
                    void readdata() 
                { 
                        cout<<"Enter the rollno. and fees of the student : "<<endl; 
                        cin>>rn >> endl>>fees; 
                } 
                   void writedata() 
               { 
                     cout<<"The rollno. is "<<rn<<endl; 
                     cout<<" The fees is "<<fees<<endl; 
               } 
 }; 
           void main() 
       { 
            clrscr(); 
            student st; 
            st.readdata(); 
            st.writedata(); 
            getch(); 
       } 


