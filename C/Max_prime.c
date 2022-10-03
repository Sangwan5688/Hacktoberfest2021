/*Tony has been assigned a number n and was asked to represent it as a sum of maximum possible number of prime numbers.One can prove that such representation exists for any integer greater than 1. Help Tony to solve this problem.

Input variables:-
  int t=> no. of test cases
  int n=> assigned number

Input Description:-
 -First line of input consists of t, the number of test cases
 -Next each lines consist of n, the assigned number

Output Description:-
  -The first line of the output contains a single integer k — maximum possible number of primes in representation.
  -The second line should contain k primes with their sum equal to n. You can print them in any order. If there are several optimal solution, print any of them.

Constraints:-
-> 1<=t<=100
-> 2<=n<=1000

Sample Input:-
2
5
6

Sample Output:-
2
2 3
3
2 2 2 */
 
#include <stdio.h>
int main()
{
    int t;
    scanf("%d", &t);
    while (t != 0)
    {
        int k;
        scanf("%d", &k);
        if (k % 2 == 1)
        {
            printf("3 ");
            k = k - 3;
        }
        while (k > 0)
        {
            printf("2 ");
            k = k - 2;
        }
        printf("\n");

        t--;
    }
}
