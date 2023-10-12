public class ex41 {
    public <X> void print(X []s){
        for (X x : s) {
            System.out.print(x + " ");
        }
        System.out.println();
    }
    public static void main(String[] args) {
        String name[] = new String[]{"vishal","vivek","vijay","beena"};
        Integer score[] = new Integer[]{123123,123123,123123,123123};
        ex41 i = new ex41();
        i.print(name);
        i.print(score);
    }
}
