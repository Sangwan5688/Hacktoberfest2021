class A {
    public A(){}
    protected void finalize() throws Throwable {}
}
class B {
    public B(){}
    @Override
    protected void finalize() throws Throwable {
        super.finalize();
    }
}

public class ex39 {
    public static void main(String[] args) {
        
    }
}
