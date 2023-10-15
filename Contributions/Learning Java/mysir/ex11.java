public class ex11 {
    private int x = 99;
    private static int k = 0;
    {
        System.out.println("we are in intialization block : "+ x);
        x++;
    }
    static{
        System.out.println("Static intialization block : k "+k);
        k++;
    }
    public ex11(){
        System.out.println("we are in constructor block : "+x);
        x++;
    }
    public static void main(String[] args) {
        ex11 b1 = new ex11();
        ex11 b2 = new ex11();
        System.out.println(b1.x + " " + b2.x);
    }
}
