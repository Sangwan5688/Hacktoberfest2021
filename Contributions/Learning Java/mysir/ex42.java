class Data<X> {
    X i;
    public void Add(X i){ this.i = i;}
    public X get(){ return this.i; }
}
public class ex42 {
    public static void main(String[] args) {
        Data<Integer> i = new Data<>();
        i.Add(45);
        System.out.println(i.get());
        Data<String> ii = new Data<>();
        ii.Add("vishal");
        System.out.println(ii.get());
    }
}
