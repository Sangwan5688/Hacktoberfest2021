#include <stdio.h>

int main() {
    int a, b, temp;

    printf("Enter two numbers (separated by space): ");
    scanf("%d %d", &a, &b);

    // Swapping logic
    temp = a;
    a = b;
    b = temp;

    printf("After swapping: a = %d, b = %d\n", a, b);

    return 0;
}
