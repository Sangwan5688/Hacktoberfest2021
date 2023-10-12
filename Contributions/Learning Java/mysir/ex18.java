class A {
    public A(){
        System.out.println("A");
    }
}

class B extends A{
    public B(){
        this(4); // hide super call of class A constructor
        System.out.println("B");
    }
    public B(int x){
        // compiler by deafult super()
        System.out.println("B " + x);
    }
}

public class ex18 {
    public static void main(String[] args) {
        B obj = new B();
        System.out.println();
        B obj1 = new B(5);
    }   
}