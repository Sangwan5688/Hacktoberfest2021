class PeakElement {
    public int findPeakElement(int[] arr) {
        int s = 0, e = arr.length - 1;
        while(s < e){
            int m = s + (e - s) / 2;
            if(arr[m + 1] < arr[m]){
                e = m;
            }
            else{
                s = m + 1;
            }
        }
        return s;
    }
}
