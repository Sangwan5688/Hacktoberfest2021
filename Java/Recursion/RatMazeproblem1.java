 import java.util.*;
 public class RatMazeproblem1{
 //method to determine that step  is safe or not
    static boolean isSafeMove(int n, int m[][],boolean visited[][],int x , int y){
        if(x>=0 && x<n && y>=0 && x<n && m[x][y]==1 && !visited[x][y]){
            return true;
        }else{
            return false;
        }
    }
    //method to solve the maze problem
    static void solve(int m[][],int n,String out,ArrayList<String> ans ,boolean visited[][] ,int coorx, int coory){
        
        if(coorx==n-1 && coory==n-1){
            ans.add(out);
            return;
        }
        
        //now mark the block true
        visited[coorx][coory]=true;
        int x= coorx;
        int y=coory;
        //now code to move down
        x=coorx+1;
        y=coory;
        if(isSafeMove(n,m,visited, x, y)){
            out+="D";
            solve(m,n,out,ans,visited,x,y);
            //now clear the last added char
            out = out.substring(0,out.length()-1);
        }
        //now code to move left
        x=coorx;
        y=coory-1;
        if(isSafeMove(n,m,visited, x,  y)){
            out+="L";
            solve(m,n,out,ans,visited,x,y);
            //now clear the last added char
            out = out.substring(0,out.length()-1);
        }
        
        //now code to move right
        x=coorx;
        y=coory+1;
        if(isSafeMove(n,m,visited,x, y)){
            out+="R";
            solve(m,n,out,ans,visited,x,y);
            //now clear the last added char
            out = out.substring(0,out.length()-1);
        }
         //now code to move up
        x=coorx-1;
        y=coory;
        if(isSafeMove(n,m,visited,x,  y)){
            out+="U";
            solve(m,n,out,ans,visited,x,y);
            //now clear the last added char
            out = out.substring(0,out.length()-1);
        }
        
        //after that marked the visited block false
        visited[coorx][coory]=false;
    }
    public static void findPath(int[][] m, int n) {
        ArrayList<String> ans= new ArrayList<>();
        boolean visited[][] = new boolean[n][n];
        //edge case
        // if(m[0][0]==0){
        //     return ans;
        // }
        
        String out="";
        int coorx=0;
        int coory=0;
        //now calling function  to solve the problem
        solve(m,n,out,ans,visited,coorx,coory);
        // if(ans.size()==0){
        //     return -1;
        // }else{
        //     return ans;
        // }
        //print
        System.out.println(ans);
    }

    public static void main(String[] args) {
        int m[][] = new int[][]{{1,0,0,0},{1,1,0,1},{1,1,0,0},{0,1,1,1}};
        // ArrayList<String> ans= new ArrayList<>();
        
        //edge case
        if(m[0][0]==0){
            return ;
        }
        //initial corrdinates
        // int coorx=0;
        // int coory=0;

        findPath(m, m.length);

        

    }
}