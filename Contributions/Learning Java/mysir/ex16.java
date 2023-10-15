/*
 ? function with same name & argument
 ! overridding -> instance member function
 ! overhidding -> static member function

 TODO: static member function hides instance member function & vice - versa
*/

class A {
    public static void name() {
        System.out.println("Class A");
    }
    public static void overhidding() {
        System.out.println("overridding Class A");
    }
}

class B extends A{
    public static void overhidding() {
        System.out.println("Overridding Class B");
    }
}

public class ex16 {
    public static void main(String[] args) {
        B obj = new B();
        obj.name();
        obj.overhidding();
    }
}
