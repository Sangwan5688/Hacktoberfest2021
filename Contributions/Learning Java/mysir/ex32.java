class A extends Thread { public void run(){ for (int i = 0; i < 10; i++) { System.out.println("A : " + i); } } }
class B extends Thread { public void run(){ for (int i = 0; i < 10; i++) { System.out.println("B : " + i); } } }
class C extends Thread { public void run(){ for (int i = 0; i < 10; i++) { System.out.println("C : " + i); } } }

public class ex32 {
    public static void main(String[] args) {
        Thread t1 = new Thread(new A()), t2 = new Thread(new B()), t3 = new Thread(new C());
        t1.setPriority(Thread.MAX_PRIORITY);
        t2.setPriority(Thread.NORM_PRIORITY);
        t3.setPriority(Thread.MIN_PRIORITY);
        t1.start();
        t2.start();
        t3.start();
    }
}
