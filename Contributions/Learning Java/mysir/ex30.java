class A implements Runnable{
    public void run(){ 
        for (int i = 0; i < 10; i++) System.out.println("func1 " + i); 
    }    
}
class B implements Runnable{
    public void run(){ 
        for (int i = 0; i < 10; i++) System.out.println("func2 " + i); 
    }    
}

public class ex30 {
    public static void main(String[] args) {
        Runnable a = new A();
        Runnable b = new B();
        Thread n1 = new Thread(a);
        Thread n2 = new Thread(b);
        /*
         * Thread n1 = new Thread(new A());
         */
        n1.start();
        n2.start();
    }
}
