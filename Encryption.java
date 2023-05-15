public class Practice_Set2_Question2 {
    // To encrypt a grade by adding 8 to it. Decrypt it to show the correct grade.
    public static void main(String[] args) {
        // Encrypting Grade.
        char grade = 'B';
        grade = (char)(grade +8);
        System.out.print(grade);
        // Decrypting Grade.
        grade = (char) (grade -8);
        System.out.print(grade);
    }
}
