#include<stdio.h>
#include<stdlib.h>
#include<time.h>

int main()
{
    int n, guess, attempt=1;
    srand(time(0));
    n = rand()%100+1; // formula to generate random number from 1 to 100
    //printf("Random number is %d", n);
    printf("\t\tNumber Guessing Game\n");
    do
    {
    printf("Guess the Number: \t");
    scanf("%d", &guess);

    if (guess > n)
    {
        printf("\nGuessed Number is greater number please Input lower number\n");
    }
    else if (guess < n)
    {
        printf("Guessed Number is lower number please Input Greater number\n");
    }
    else
    {
        printf("You Guessed right Number in %d attempt",attempt);
    }
    attempt++;
    }while(guess!=n);

    return 0;
}
