#include <iostream>
#include <iomanip>

using namespace std;

main(){
	
	cout<<"***********************************************"<<endl;
	cout<<"*           GRADE CALCULATOR                  *"<<endl;
	cout<<"***********************************************"<<endl<<endl;
	int score;
	cout<<"Please enter your SCORE = ";
    cin >> score;
	switch(score<49){
		case 1:
		cout<<"Unfortunately :(, Your grade is F"<<endl;
	}

    switch(score>=90){
		case 1:
		cout <<"Your grade is A+"<<endl;
	}
    switch(score>=80 && score<90){
		case 1:
		cout<<"Your grade is A"<<endl;
	}
	switch(score>=70 && score <80){
		case 1:
		cout<<"Your grade is B"<<endl;
	}
	switch(score>=60 && score <70){
		case 1:
		cout<<"Your grade is C"<<endl;
	}
	switch(score>=50 &&	score <60){
		case1:
		cout<<"Your grade is D"<<endl;
		break;
	}

    switch(score<50){
		case 1:
		cout<<"Unfortunately :(, Your grade is F"<<endl;
		break;
	}	
	
	
}