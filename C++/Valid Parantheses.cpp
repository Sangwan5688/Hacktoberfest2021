class Solution {
public:
    bool isValid(string s) {
        int l=s.length();
        stack<char>st;
        for(int i=0;i<l;i++)
        {
            if(s[i]=='(' || s[i]=='{' || s[i]=='[' )
            {
                st.push(s[i]);
            }
            else
            {
                if(st.empty())
                return false;
                
                if(s[i]=='}')
                {
                    if(st.top()=='{')
                    st.pop();
                    else
                    return false;
                }
                

                else if(s[i]==')')
                {
                    if(st.top()=='(')
                    st.pop();
                    else
                    return false;
                }
                else if(s[i]==']')
                {
                    if(st.top()=='[')
                    st.pop();
                    else
                    return false;
                }
            }
        }
        if(st.empty())
        return true;
        else
        return false;
    }
};
