public class ex28 {
    public static void main(String[] args) {
        
        int balance = 100;
        int withDraw = 150;

        // ! default exception
        // if(balance < withDraw)
        //     throw new ArithmeticException("Insufficent balance");
        // System.out.println(balance - withDraw + " balance remain after transition");
        
        try {
            if(balance < withDraw)
                throw new Exception("Insufficent balance");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}
