import java.io.IOException;

public class ex29 {
    public static void tell() throws Exception{
        throw new IOException("boii u got exception");
    }
    public static void main(String[] args) throws IOException {
        try {
            ex29.tell();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }finally{
            System.out.println("end of the program");
        }
        throw new ArithmeticException("Unchecked Exception ignore");
    }
}