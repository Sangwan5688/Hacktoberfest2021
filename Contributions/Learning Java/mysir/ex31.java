class A extends Thread{
    public void run(){
        for (int i = 0; i < 10; i++) System.out.println("A : "+ i);
    }
}
class B extends Thread{
    public void run(){
        for (int i = 0; i < 10; i++) System.out.println("B : "+ i);
    }
}

public class ex31 {
    public static void main(String[] args) {
        Thread n1 = new A(), n2 = new B();
        n1.start();
        n2.start();
    }
}
