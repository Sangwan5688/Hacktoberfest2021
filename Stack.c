//C program to create a stack and perform its operations. 

#include <stdio.h> 
int top=-1; 
int stack[5]; 
void push(int stack[], int item) { 
    if(top<4){ 
        top++; stack[top]=item; 
        printf("%d is pushed into the stack\n",item); 
    }
    else 
        printf("Stack is FULL...\n"); 
}
int pop(){ 
    if(top>-1){ 
        int item=stack[top]; 
        top--; 
        return item; 
    }
    else{ 
        printf("Stack is EMPTY...\n"); 
        return 0; 
    }
}
void main(){ 
    push(stack,11); 
    push(stack,12); 
    push(stack,13); 
    push(stack,14); 
    push(stack,115); 
    push(stack,116); 
    printf("%d\n",pop()); 
    printf("%d\n",pop()); 
    printf("%d\n",pop()); 
    printf("%d\n",pop()); 
    printf("%d\n",pop()); 
    printf("%d\n",pop());
}