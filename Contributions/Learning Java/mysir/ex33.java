class Account {
    private int balance;
    public Account(int balance){ this.balance = balance; }
    public boolean isSufficentBalance(int withDrawAmount){ 
        return (balance > withDrawAmount); 
    }    
    public void withDraw(int amount){
        this.balance -= amount;
        System.out.println("WithDrawl Amount : " + amount);
        System.out.println("Current Balance : " + this.balance);
    }
    public int getBalance(){ return this.balance; }
}
class Customer implements Runnable{
    private Account account;
    private String name;
    public Customer(Account account,String name){ 
        this.account = account; 
        this.name = name; 
    }
    public void run(){
        synchronized(account){
            int amount = 60;
            System.out.println("Welcome, " + this.name);
            if(this.account.isSufficentBalance(amount)) this.account.withDraw(amount);
            else System.out.println(this.name + ", Insufficent Balance");
        }
    }
}
public class ex33 {
    public static void main(String[] args) {
        Account a1 = new Account(100);
        Customer c1 = new Customer(a1,"vishal"), c2 = new Customer(a1,"yash");
        Thread t1 = new Thread(c1),t2 = new Thread(c2);
        t1.start();
        t2.start();
        // System.out.println(a1.getBalance());;
    }
}
