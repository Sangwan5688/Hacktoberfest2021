import java.io.FileOutputStream;
import java.io.IOException;

public class ex35 {
    public static void main(String[] args) throws IOException {
        FileOutputStream f1 =  new FileOutputStream("C:\\Users\\yadav\\OneDrive\\Desktop\\github\\Sudo-Code\\Java\\vishal.txt",true);

        String content = "\nmy name is khan";
        char[] ch = content.toCharArray();

        for (int i = 0; i < content.length() ; i++) {
            f1.write(ch[i]);
        }
        f1.close();

    }
}
