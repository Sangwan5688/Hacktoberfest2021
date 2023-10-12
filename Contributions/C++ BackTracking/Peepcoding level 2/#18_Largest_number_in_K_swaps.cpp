/* 
    TODO: Largest number in K swaps
    ? https://practice.geeksforgeeks.org/problems/largest-number-in-k-swaps-1587115620/1
 */

class Solution {
    public static String max = "";
    public static void swap(char[] c, int i, int j) {
        char temp = c[i];
        c[i] = c[j];
        c[j] = temp;
    }
    public static void pre(int k, char[] str) {
        if(String.valueOf(str).compareTo(max) > 0) max = String.valueOf(str);
        if(k == 0) return;
        
        int n = str.length;
        for(int i=0;i<n;i++) {
            for(int j=i+1;j<n;j++) {
                if(str[j] > str[i]) {
                    swap(str, i, j);
                    pre(k-1, str);
                    swap(str, i, j);
                }
            }   
        }
    }
    public static String findMaximumNum(String str, int k) {
        max = str;
        pre(k, str.toCharArray());
        return max;
    }
}


//! wrong
class Solution {
    public static TreeSet<String> st = new TreeSet<>();
    public static String toStr(List<Character> list) {
        String str = "";
        for(Character ch : list) str += ch;
        return str;
    }
    public static List<Character> toList(String str) {
        List<Character> list = new ArrayList<>();
        for(char ch : str.toCharArray()) {
            list.add(ch);
        }
        return list;
    }
    public static void pre(int idx, int k, List<Character> list) {
        if(k == 0) {
            // System.out.print(list + " ");
            st.add(toStr(list));
            return;
        }
        
        for(int i=idx+1;i<list.size();i++) {
            Collections.swap(list, idx, i);
            pre(idx+1, k-1, list);
            Collections.swap(list, idx, i);
        }
    }
    public static String findMaximumNum(String str, int k) {
        st.clear();
        st.add(str);
        List<Character> list = toList(str);
        // System.out.println(list);
        pre(0, k, list);
        
        for(String s : st) System.out.print(s + " ");
        
        return st.last();
    }
}