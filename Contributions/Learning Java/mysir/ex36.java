import java.io.FileInputStream;
import java.io.IOException;

public class ex36 {
    public static void main(String[] args) throws IOException{
        FileInputStream f = new FileInputStream("C:\\Users\\yadav\\OneDrive\\Desktop\\github\\Sudo-Code\\Java\\vishal.txt");

        int ch = 1;
        while(ch != -1){
            ch = f.read();
            System.out.print((char)ch);
        }

        f.close();
    }
}
