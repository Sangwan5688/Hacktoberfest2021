class A {
    public A(){
        System.out.println("A");
    }
    public A(int x){
        System.out.println("A " + x);
    }
}

class B extends A{
    public B(){
        super(5);
        System.out.println("B");
    }
}

public class ex17_1 {
    public static void main(String[] args) {
        B obj = new B();        
    }
}