class A {
    public A(){
        System.out.println("A");
    }
}

class B extends A{
    public B(){
        // by default class default consturctor like using super()
        System.out.println("B");
    }
}

public class ex17 {
    public static void main(String[] args) {
        B obj = new B();        
    }
}