/*
 * This is a testing/proving ground for solution for Leetcode problems or maybe even other problems at a later date.
 * When a solution is found, I will create another file with the problem name and number and then clean out this file.
 *
 * Evan C.
 * October 28, 2021
 * Current Leetcode Problem: 657. Robot Return to Origin
 */


public class ReturnToOrigin {

    public static void main(String[] args){
        // Testing area using the example test cases.
        String test = "UD";
        String test2 = "LL";
        String test3 = "RRDD";
        String test4 = "LDRRLRUULR";

        System.out.println(judgeCircle(test));
        System.out.println(judgeCircle(test2));
        System.out.println(judgeCircle(test3));
        System.out.println(judgeCircle(test4));
    }

    // This is actually part of the Leetcode question below this point.
    public static boolean judgeCircle(String moves){
        boolean result = false;
        int xPlane = 0;
        int yPlane = 0;

        //Convert String to char array
        char[] movesArr = moves.toCharArray(); // Note, this is fast as heck but uses more memory. Keep that in mind.

        for(char letter : movesArr) {
            if(letter == 'R'){
                xPlane++; // Increase xPlane to the right
            } else if(letter == 'L') {
                xPlane--; // Decrease xPlane to the left
            } else if(letter == 'U') {
                yPlane++; // Increase the yPlane upwards
            } else {
                yPlane--; // Decrease the yPlane downwards
            }
        }
        if( xPlane == 0 && yPlane == 0) result = true; // If the robot has returned to origin.
        //System.out.println("xPlane: " + xPlane + " yPlane: " + yPlane);
        return result;
    }

}
