/*You are in a book shop which sells n different books. 
 * You know the price and number of pages of each book.
You have decided that the total price of your purchases will be at most x. 
What is the maximum number of pages you can buy? You can buy each book at most once.
 * link:https://cses.fi/problemset/task/1158
 */
import java.util.*;
public class BookShop {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner sc=new Scanner(System.in);
		int n=sc.nextInt();
		int x=sc.nextInt();
		int []a=new int[x+1];
		int []b=new int[n];
		int []c=new int[n];
		for(int i=0;i<n;i++) {
			b[i]=sc.nextInt();
		}
		for(int i=0;i<n;i++) {
			c[i]=sc.nextInt();
		}
		for(int i=0;i<n;i++) {
			int h=b[i],s=c[i];
			for(int y=x;y>=h;y--) {
				a[y]=Math.max(a[y],a[y-h]+s);
			}
		}System.out.println(a[x]);
		

	}

}
//author:Shruti
//profile link:https://cses.fi/user/32358
