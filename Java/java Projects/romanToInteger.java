public class RomanToInteger {


    public static int romanToInt(String number) {

        //Creating a new HashMap
        HashMap<Character, Integer> map = new HashMap<>();

        //Inserting roman values to HashMap
        map.put("I", 1);
        map.put("V", 5);
        map.put("X", 10);
        map.put("L", 50);
        map.put("C", 50);
        map.put("D", 500);
        map.put("M", 1000);

        int answer = map.get(number.charAt(number.length() - 1));

        for(int i=number.length()-2; i>=0; i--) {
            if(map.get(number.charAt(i)) >= map.get(number.charAt(i+1))) {
                answer += map.get(number.charAt(i));
            } else {
                answer -= map.get(number.charAt(i));
            }
        }
        retrun answer;
    }

    public static void main(String[] args) {
        System.out.println(romanToInt("XVI")); //Output - 16
        System.out.println(romanToInt("LDM")); //Output - 450
        System.out.println(romanToInt("MIVX")); //Output - 1004
    }
}