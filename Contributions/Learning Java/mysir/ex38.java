import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ex38 {
    public static void main(String[] args) throws IOException{
        BufferedReader bf = new BufferedReader(new FileReader("C:\\Users\\yadav\\OneDrive\\Desktop\\github\\Sudo-Code\\Java\\vishal.txt"));

        int ch = 1;
        while(ch != -1){
            ch = bf.read();
            System.out.print((char)ch);
        }

        bf = new BufferedReader(new FileReader("C:\\Users\\yadav\\OneDrive\\Desktop\\github\\Sudo-Code\\Java\\vishal.txt"));
        
        String s = bf.readLine();
        while(s != null){
            System.out.println(s);
            s = bf.readLine();
        }

        bf = new BufferedReader(new FileReader("C:\\Users\\yadav\\OneDrive\\Desktop\\github\\Sudo-Code\\Java\\vishal.txt"));

        char[] str = new char[32];
        bf.read(str,0,31);
        System.out.println(str);
        
        bf.close();
    }
}
