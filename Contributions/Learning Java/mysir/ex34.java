import java.io.File;

public class ex34 {
    public static void main(String[] args) {
        File f1 = new File("C:\\Users\\yadav\\OneDrive\\Desktop\\github\\Sudo-Code\\Java\\vishal.txt");
        // ? f1.createNewFile(); create new file
        // ? f1 is meta data all propeties
        System.out.println(f1.canWrite());
        System.out.println(f1.exists());
        System.out.println(f1.getName());
        System.out.println(f1.length());
    }
}
