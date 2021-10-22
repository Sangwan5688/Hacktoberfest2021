package MultiThreading;

class JoinMethod extends Thread {
    @Override
    public void run() {
        try {
            System.out.println("THREAD 1");
            Thread.sleep(1000);
            System.out.println("My thread after sleeping ");
            for(int i=0; i<5; i++){
                System.out.println("Thread 1 Count ...."+i);
            }
        } catch (InterruptedException ie) {
        }
    }
} class JoinMethod2 extends Thread {
        @Override
        public void run() {
            try {
                System.out.println("THREAD 2");
                Thread.sleep(1000);
                System.out.println("My thread after sleeping ");
                for(int i=0; i<5; i++){
                    System.out.println("Thread 2 Count ...."+i);
                }
            } catch (InterruptedException ie) {
            }
        }
    }
        class MAINJOIN {
            public static void main(String[] args) throws InterruptedException {
                JoinMethod t1 = new JoinMethod();
                JoinMethod2 t2 = new JoinMethod2();
                t1.start();
                t1.join();
                t2.start();
                t2.join();
            }
        }


