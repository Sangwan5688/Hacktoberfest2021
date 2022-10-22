import java.util.ArrayList;
import java.util.*;

public class PermutationOfArray {
    static void swap(int index , int i , Integer arr[]){
       int temp= arr[index];
        arr[index]= arr[i];
    arr[i] =temp;
    }
    //method for solve permutation
    static void solve(Integer arr[],int index,ArrayList<Integer> out,ArrayList<ArrayList<Integer>> ans){
        
        
        //base case 
        if(index>=arr.length){
            ans.add(out);
            return;
        }
        for(int i=index;i<arr.length;i++){
           
            swap(index,i,arr);
            
            //c;ear the output list
            out.clear();
            out = new ArrayList<>(Arrays.asList(arr));
           
            //now increment 
            solve(arr,index+1,out,ans);

            //backtrack
            swap(index,i,arr);

        }
    }
    public static void main(String[] args) {
     Integer arr[] = new Integer[]{1,2,3};
     ArrayList<ArrayList<Integer>> ans = new ArrayList<>();
    ArrayList<Integer> out = new ArrayList<>();
     int index = 0;
     solve(arr,index,out,ans);   

     System.out.println(ans);
    }
}
