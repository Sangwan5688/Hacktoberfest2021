public class ex5 {

    public static void main(String[] args) {
        Integer sumi = 0;
        for (int i = 0; i < args.length; i++) {
            System.out.println("You have enter " + args[i] + " at " + i + " position ");
            sumi += Integer.valueOf(args[i]);
        }
        System.out.println(sumi);
    }
}