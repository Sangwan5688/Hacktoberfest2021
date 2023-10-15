class A {
    public int z = 1;
    public void fun1() {
        System.out.println("A");
    }
    public void fun(){
        System.out.println("Overridding");
    }
}
class B extends A{
    private int z = 2;
    public void fun() {
        int z = 3;
        super.fun1();
        System.out.println("B");
        super.fun();
        System.out.println(super.z + " " + this.z + " " + z);
    }
}

public class ex15 {
    public static void main(String[] args) {
        B obj = new B();
        obj.fun();
    }    
}
