/* 
    TODO: Print Increasing
    ? https://www.pepcoding.com/resources/online-java-foundation/introduction-to-recursion/print-increasing-official/ojquestion
 */

class Solution{
    static void printTillN(int n){
        if(n == 0) return;
        printTillN(n-1);
        System.out.print(n + " ");
    }
}