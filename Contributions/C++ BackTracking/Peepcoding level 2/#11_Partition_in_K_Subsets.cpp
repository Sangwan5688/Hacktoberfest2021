/* 
    TODO: Partition in K Subsets
    ? https://www.onlinegdb.com/online_java_compiler
 */
import java.util.*;

public class Main {
    public static void pre(int idx, int n, int k, int filled, ArrayList<ArrayList<Integer>> ds) {
        if(idx > n) {
            if(k == filled) {
                for(ArrayList<Integer> list : ds) {
                    System.out.print(list);
                }
                System.out.println();
            }
            return;
        }
 
        for(int j=0;j<ds.size();j++) {
            if(ds.get(j).size() > 0) {
                ds.get(j).add(idx);
                pre(idx+1, n, k, filled, ds);
                ds.get(j).remove(ds.get(j).size() - 1); 
            } else {
                ds.get(j).add(idx);
                pre(idx+1, n, k, filled + 1, ds);
                ds.get(j).remove(ds.get(j).size() - 1);
                break;
            }
        }

    }
	public static void main(String[] args) {
		Scanner fs = new Scanner(System.in);

        int n = fs.nextInt(), k = fs.nextInt();
        ArrayList<ArrayList<Integer>> list = new ArrayList<>();
        for(int i=0;i<k;i++) list.add(new ArrayList<>());

        pre(1, n, k, 0, list);
	}
}