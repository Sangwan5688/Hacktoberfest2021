public class Valid_paranthesis {
    public boolean isValid(String s) {
        
        
        Stack<Character> stack = new Stack<Character>();
        
        int flag = 0;
        
        for(int i=0;i<s.length();i++){
            
            char c = s.charAt(i);
            
            if(c!= ')' && c!= '}' && c!=']'){
                
                stack.push(c);
                continue;
            }
            
            if(!stack.isEmpty()){
                
                if(c ==')'){
                    
                    if(stack.peek() == '('){
                        
                        stack.pop();
                        continue;
                    }  
                    
                    
                    else{
                    
                    flag = 1;
                    break;
                    }
                    
                }
                
                
                if(c =='}'){
                    
                    if(stack.peek() == '{'){
                        
                        stack.pop();
                        continue;
                    }  
                    
                    
                    else{
                    
                    flag = 1;
                    break;
                    }
                    
                }
                
                
                if(c ==']'){
                    
                    if(stack.peek() == '['){
                        
                        stack.pop();
                        continue;
                    }  
                    
                    
                    else{
                    
                    flag = 1;
                    break;
                    }
                    
                }
                
                
                
            }
            
            else{
                flag = 1;
                break;
            }
            
        }
        
        if(stack.isEmpty() && flag!=1){
            return true;
        }
        else{
            return false;
        }
        
    }
}
