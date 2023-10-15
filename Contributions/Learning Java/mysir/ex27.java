public class ex27 {
    public static void main(String[] args) {
        try {
            System.out.println(3/0);
            System.out.println("In try");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        System.out.println("End");
    }
}
