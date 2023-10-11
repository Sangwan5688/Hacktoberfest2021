#include <stdio.h>
#include <Windows.h>
#include <time.h>
int main(){
    system("color 0A");
    int pin=1234,count=0,enteredPin,option,amount=1,continueTransaction=1,continueATM=1;
    float balance=5000;
    while(continueATM){
        time_t now;
        time(&now);
        printf("\n\t%s\n",ctime(&now));
        printf("-------------------------------------------\n");
        while(enteredPin!=pin){
            if(count>=3){
                printf("\nYou have entered the wrong pin 3 times. Please try again later\n");
                exit(0);
            }
            printf("Please enter four digit your pin: ");
            scanf("%d",&enteredPin);
            if(enteredPin!=pin){
                Beep(610,500);
            }
            count++;
            continueTransaction=1;
        }
        printf("\n\n\tWelcome to My ATM\n");
        printf("-------------------------------------------\n");
        while(continueTransaction && continueATM){
            printf("\nPlease choose from the following operations\n");
            printf("\n\t1.Withdraw\n\t2.Deposit\n\t3.Check Balance\n\t4.Logout\n\t5.Quit\n");
            printf("\nYour choice: ");
            scanf("%d",&option);
            switch (option)
            {
            case 1:
                while(amount%500!=0){
                    printf("\nEnter the amount you wish to withdraw(only multiples of 500 allowed): ");
                    scanf("%d",&amount);
                    if(amount%500!=0){
                        Beep(650,500);
                        printf("\nERROR! Not a valid amount!\n");
                        break;
                        amount=1;
                    }
                    if(balance>=amount){
                        balance=balance-amount;
                        printf("\nRs.%d have been withdrawn. Your remaining balance is %0.2f\n",amount,balance);
                        amount=1;
                        break;
                    }
                    else{
                        Beep(650,500);
                        printf("\nERROR! Not enough balance\n");
                        break;
                    } 
                }
                break;

            case 2:
                printf("\nEnter the amount you wish to deposit: ");
                scanf("%d",&amount);
                balance=balance+amount;
                printf("\nRs.%d have been deposited into your account. Your new balance is Rs.%0.2f\n",amount,balance);
                amount=1;
                break;

            case 3:
                printf("\nYour current bank balance is Rs.%0.2f\n",balance);
                break;
            case 4:
                printf("\nLogging out...\n");
                continueTransaction=0;
                enteredPin=0;
                break;
            case 5:
                printf("\nQuitting...\n");
                exit(0);
                break;
            default:
                Beep(650,500);
                printf("\nERROR! Invalid operation");
                break;
            }
        }
    }
    
    return 0;
}