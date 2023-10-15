class A {
    public void f1(){ System.out.println("f1 : A");}
    public void f2(){ System.out.println("f2 : A");}
    public void f4(){ System.out.println("f4 : A");}
}    
class B extends A{
    public void f3(){ System.out.println("f3 : B");}
    public void f4(){ System.out.println("f4 : B");}
}
public class ex40_2 {
    public static void main(String[] args) {
        A i = new B();
        i.f1();
        i.f2();
        // i.f3(); // ! error
        i.f4(); // ! overridding : Late Binding
    }
}