/* 
    TODO: First and last occurrences of x
    ? https://practice.geeksforgeeks.org/problems/first-and-last-occurrences-of-x3116/1
 */

class GFG {
    long first(long arr[], int index, int x) {
        int n = arr.length;
        if(index == n) return -1;
        if(arr[index] == x) return index;
        
        long uindex = first(arr,index+1,x);
        if(uindex != -1) return uindex;
        return -1;
    }
    long last(long arr[], int index, int x) {
        int n = arr.length;
        if(index == -1) return -1;
        if(arr[index] == x) return index;
        
        long uindex = last(arr,index-1,x);
        if(uindex != -1) return uindex;
        return -1;
    }
    ArrayList<Long> find(long arr[], int n, int x) {
        ArrayList<Long> list = new ArrayList<>();
        list.add(first(arr,0,x));
        list.add(last(arr,n-1,x));
        return list;
    }
}
