#include <stdio.h>

void towerOfHanoi(int n, int start, int end)
{
    if (n == 1)
    {
        printf("Move disk from %d to %d.\n", start, end);
    }
    else
    {
        int other = 6 - (start + end);
        towerOfHanoi(n - 1, start, other);
        printf("Move disk from %d to %d.\n", start, end);
        towerOfHanoi(n - 1, other, end);
    }
}

int main()
{
    int n, towers;
    printf("Enter the number of discs: ");
    scanf("%d", &n);
    printf("Enter the number of towers: ");
    scanf("%d", &towers);
    towerOfHanoi(n, 1, towers);
    return 0;
}
