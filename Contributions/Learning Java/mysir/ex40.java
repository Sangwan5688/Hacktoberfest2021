class Greeting {
    public void Hello(){
        System.out.println("Hello world");
    }
}

class India {
    Greeting welcome = new Greeting(){
        public void Hello(){
            System.out.println("Namaste India");
        }
    };
}

public class ex40 {
    public static void main(String[] args) {
        India i = new India();
        i.welcome.Hello();
    }
}
