#include <stdio.h>
#include <stdlib.h>

#define maxsize 10

int stack[maxsize], top = -1;

void push(int n)
{
    if (top == maxsize - 1)
        printf("Overflow\n");
    else
    {
        top++;
        stack[top] = n;
    }
}

int pop()
{
    if (top == -1)
    {
        printf("Underflow\n");
        return;
    }
    else
    {
        int d = stack[top];
        top--;
        return d;
    }
}

void add()
{
    int a, b, c;
    a = pop();
    b = pop();
    c = a + b;
    push(c);
}

void subtract()
{
    int a, b, c;
    a = pop();
    b = pop();
    c = b - a;
    push(c);
}

void product()
{
    int a, b, c;
    a = pop();
    b = pop();
    c = a * b;
    push(c);
}

void divide()
{
    int a, b, c;
    a = pop();
    b = pop();
    c = b / a;
    push(c);
}

void display()
{
    printf("%d", stack[top]);
}

int main()
{
    char exp[20];
    printf("Enter the expression\n");
    scanf("%s", exp);
    int i, k;
    for (i = 0; exp[i] != '\0'; i++)
    {
        if (exp[i] == '+')
        {
            add();
        }
        else if (exp[i] == '-')
        {
            subtract();
        }
        else if (exp[i] == '*')
        {
            product();
        }
        else if (exp[i] == '/')
        {
            divide();
        }
        else
        {
            k = exp[i] - 48;
            push(k);
        }
    }
    display();
    return 0;
}