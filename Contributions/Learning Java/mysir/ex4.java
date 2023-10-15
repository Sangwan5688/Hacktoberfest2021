public class ex4 {
    public static void main(String[] args) {
        Integer ag = 20;
        System.out.println("Boii age is " + ag);

        // valueof
        {
            Integer overConfidence = Integer.valueOf("101");
            System.out.println("Over Confidence value is : "+overConfidence);

            Double pi = Double.valueOf("3.1458");
            System.out.println(pi); // string + double == error

            // binary to intiger 
            Integer BtI = Integer.valueOf("10100",2);
            System.out.println("Converting binary to intiger : "+BtI);
        }
 
        // parsexxx return value
        {
            int age = Integer.valueOf("20");
            System.out.println(age);

            double mind = Double.valueOf("564.245468");
            System.out.println(mind);
        }
        
        // xxxValue
        {
            Integer BtI = Integer.valueOf("10100",2);
            int age = BtI.intValue();
            System.out.println(age);
        }
    }
}