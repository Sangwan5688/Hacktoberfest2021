public class ex26 {
    public static void main(String[] args) {
        String name = "ViShAl";
        // ! orginal string will not change
        System.out.println(name.toLowerCase());
        System.out.println(name.toUpperCase());

        // ! searching left to right
        System.out.println(name.indexOf('s')); // -1
        System.out.println(name.indexOf('S')); // 2
        System.out.println(name.indexOf('A',2)); // 4
        System.out.println(name.indexOf("hA")); // 3
        System.out.println(name.indexOf("hA",2)); // 3

        name = "ViShAall";
        // ! searching right to left
        System.out.println(name.lastIndexOf('a')); // 5

        String name1 = "vishal";
        String name2 = "vishal";
        String name3 = "ViShal";
        System.out.println(name1.equals(name2)); // ! consider case sensitive
        System.out.println(name1.equalsIgnoreCase(name3));
        if(name1.compareTo(name2) == 0) // ! miss match char ka unie code no
            System.out.println("String are same");
        else if(name1.compareTo(name2) > 0)
            System.out.println("Opposite to dictionary order");
        else
            System.out.println("Dictionary order");

        System.out.println(name.substring(0, 4));
        System.out.println(name.substring(2));

    }
}
