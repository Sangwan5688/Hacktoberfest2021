// one file can $%$ have more than one public class
public class ex3 {
    int a = 31254; // instance variable
    static int y = 9872; // static member variable

    public void quiz() {
        // instance member function
        System.out.println("quiz");
        // static int age; declaring static error
    }

    public static void test() {
        // static member function - it can only access static member
        int age = 20;
        System.out.println("Test : " + age);
    }

    static class timming {
        public static String country = "INDIA : IN";
    }

    public static void main(String[] args) {
        ex3 mm = new ex3();
        ex3 nn = new ex3();
        System.out.println(mm.a);
        System.out.println(nn.a);

        // class without object , when className. -> calling static thing
        System.out.println(y);
        System.out.println(ex3.y);
        System.out.println(ex3.y);

        ex3.test();
        System.out.println(ex3.timming.country.concat(", my country"));

    }
}