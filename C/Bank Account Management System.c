#include <stdio.h>

typedef struct {
    int accountNumber;
    char accountHolder[50];
    double balance;
} BankAccount;

void deposit(BankAccount* account, double amount) {
    account->balance += amount;
    printf("Deposit of %.2lf successful. New balance: %.2lf\n", amount, account->balance);
}

void withdraw(BankAccount* account, double amount) {
    if (amount <= account->balance) {
        account->balance -= amount;
        printf("Withdrawal of %.2lf successful. New balance: %.2lf\n", amount, account->balance);
    } else {
        printf("Insufficient balance.\n");
    }
}

int main() {
    BankAccount myAccount = {1001, "John Doe", 1000.0};
    int choice;
    double amount;

    while (1) {
        printf("Bank Account Management System\n");
        printf("1. Deposit\n");
        printf("2. Withdraw\n");
        printf("3. Quit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter the amount to deposit: ");
                scanf("%lf", &amount);
                deposit(&myAccount, amount);
                break;
            case 2:
                printf("Enter the amount to withdraw: ");
                scanf("%lf", &amount);
                withdraw(&myAccount, amount);
                break;
            case 3:
                return 0;
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}
