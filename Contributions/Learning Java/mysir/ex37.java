import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class ex37 {
    public static void main(String[] args) throws IOException {
        BufferedWriter f = new BufferedWriter(new FileWriter("C:\\Users\\yadav\\OneDrive\\Desktop\\github\\Sudo-Code\\Java\\vishal.txt",true));
        f.write("\nmy name is khan");
        f.close();
    }
}
