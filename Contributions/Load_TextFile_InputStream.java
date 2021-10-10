import java.io.InputStream;
import java.io.FileInputStream;

public class Main {

  public static void main(String args[]) {

    try {

      // file input.txt is loaded as input stream
      // input.txt file contains:
      // This is a content of the file input.txt
      InputStream input = new FileInputStream("input.txt");

      System.out.println("Data in the file: ");

      // Reads the first byte
      int i = input.read();

      while(i != -1) {
        System.out.print((char)i);

        // Reads next byte from the file
        i = input.read();
      }
      input.close();
    }

    catch(Exception e) {
      e.getStackTrace();
    }
  }
}
