//Parenthsis Matching 
#include <iostream>
#include <stdlib.h>
#include<string.h>
#define MAX 10
using namespace std;

struct stack{
    int top;
    char exp[MAX];
}sp;

void push(char);
void pop();

int main()
{
  sp.top = -1;
  cout<<"Input values : ";
  cin>>sp.exp;
  for(int i=0;i<strlen(sp.exp);i++)
  {
      if(sp.exp[i]=='(' || sp.exp[i]== '{' || sp.exp[i]=='[')
      {
          push(sp.exp[i]);
          continue;
      }
      else if(sp.exp[i]==')' || sp.exp[i]=='}' || sp.exp[i]==']')
      {
          if(sp.exp[i]==')')
          {
              if(sp.exp[sp.top]=='(')
              {
                  pop();
              }
              else
              {
                  cout<<"Unbalanced"<<endl;
                  break;
              }
          }
          if(sp.exp[i]=='}')
          {
              if(sp.exp[sp.top]=='{')
              {
                  pop();
              }
              else
              {
                  cout<<"Unbalanced"<<endl;
                  break;
              }
          }
          if(sp.exp[i]==']')
          {
              if(sp.exp[sp.top]=='[')
              {
                  pop();
              }
              else
              {
                  cout<<"Unbalanced"<<endl;
                  break;
              }  
          }
      }
  }
  if(sp.top == -1)
  {
      cout<<"Balanced"<<endl;
  }
  else if(sp.top != -1)
  {
      cout<<"Unbalanced"<<endl;
  }
  return 0;
}

void push(char item)
{
    if(sp.top == MAX-1)
    {
        cout<<"Stack Overflow"<<endl;
    }
    else
    {
        sp.top = sp.top+1;
        sp.exp[sp.top] = item;
    }
}

void pop()
{
    if(sp.top == -1)
    {
        cout<<"Stack Underflow"<<endl;
    }
    else
    {
        sp.top = sp.top - 1;
    }
}
