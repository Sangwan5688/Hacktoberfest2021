int help(int *input,int n, int sum, int index, int curr){
    if(index>=n){
        if(curr==sum)
            return 1;
        else
            return 0;
    }
    int a = help(input,n,sum,index+1,curr);
    int b= help(input,n,sum,index+1,curr+input[index]);
    int c=help(input,n,sum,index+1,curr-input[index]);
    
    int ans= a+b+c;
    return ans;
}
int number(int* input,int n,int sum)
{
	//Write your code here
    int poss=help(input,n,sum,0,0);
    if(sum==0)
        return poss-1;
    else
        poss;
}