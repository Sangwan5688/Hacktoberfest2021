/* 
    TODO: Tower Of Hanoi
    ? https://practice.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1
 */

class Hanoi {
    public long cnt = 0;
    public void pre(int n, int A, int B, int C) {
        if(n == 0) return;  
        cnt++;
        pre(n-1,A,C,B);
        System.out.println("move disk "+ n +" from rod "+ A +" to rod " + B);
        pre(n-1,C,B,A);
    }
    public long toh(int N, int from, int to, int aux) {
        pre(N,from,to,aux);
        return cnt;
    }
}
