package infix.postfix;

import java.util.Stack;

public class infixToPostfix {
    public String infixToPostfix(String infixString)
    {
        String postfix = "";
        Stack<Character> s  =new Stack<>();
        s.push('(');
        infixString +=")";
        for(int i = 0;i<infixString.length();i++)
        {
            char c = infixString.charAt(i);
            if(c=='(')
                s.push(c);
            else if(c==')')
            {
                while(s.peek()!='(')
                {
                    postfix+=s.pop();
                }
                s.pop();
            }
            else if(isOperator(c))
            {
                while(precedence(s.peek())>=precedence(c))
                {
                    postfix+=s.pop();
                }
                s.push(c);
            }
            else {
                postfix+=c;
            }
        }

        return postfix;
    }
    private int precedence(char ch)
    {
        int response = 0;
        switch(ch)
        {
            case '^': response = 3;
            break;
            case '*':
            case '/':
                response  = 2;
            break;
            case '+':
            case '-':
                response = 1;
        }
        return response;
    }
    private boolean isOperator(char c)
    {
        boolean res = false;
        switch(c)
        {
            case '+':
            case '-':
            case '*':
            case '/':
            case '^':
                res = true;
        }
        return res;
    }
}
