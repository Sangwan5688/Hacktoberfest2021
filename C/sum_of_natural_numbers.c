#include <stdio.h>

int main() {
    int num, sum = 0;
    
    printf("Enter a positive integer: ");
    scanf("%d", &num);

    for (int i = 1; i <= num; i++) {
        sum += i;
    }

    printf("The sum of natural numbers from 1 to %d is: %d\n", num, sum);

    return 0;
}
