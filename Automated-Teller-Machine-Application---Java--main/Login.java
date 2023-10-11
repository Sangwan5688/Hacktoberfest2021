import javax.imageio.ImageIO;
import java.net.URL;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class Login extends JFrame implements ActionListener {

    public static String usr;
    JLabel label1, label2, label3,imglabel;   //label for email and password
    JTextField textField; // email field
    JButton button1, button2, button3; // login button
    JPasswordField passwordField; // password field

    File file = new File("C:\\Files");   //file path
    int ln;
    //Get the container
    Container container = getContentPane();
    // create folder in which record save
    void createFolder() {
        if (!file.exists()) {
            file.mkdirs();
        }
    }
    //check file is exist or not
    void readFile() {
        try {
            FileReader fr = new FileReader(file + "\\logins.txt");
        } catch (FileNotFoundException ex) {
            try {
                FileWriter fw = new FileWriter(file + "\\logins.txt");
            } catch (IOException ex1) {
            }
        }

    }
    // login logic
    void logic(String usr, String pswd) {
        Login.usr =  usr;
        try {
            RandomAccessFile raf = new RandomAccessFile(file + "\\logins.txt", "rw");
            for (int i = 0; i < ln; i += 7) {

                String forUser = raf.readLine().substring(6); // get username from logins.txt
                String forPswd = raf.readLine().substring(9); // get password from logins.txt
                if (usr.equals(forUser) & pswd.equals(forPswd)) { // password & username verification
                    JOptionPane.showMessageDialog(null, "Logged Successfully!!");

                    // get date & time
                    LocalDateTime myDateObj = LocalDateTime.now();
                    DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
                    String formattedDate = myDateObj.format(myFormatObj);

                    String str2= "You have successfully logged in | Transaction Date and Time - " + formattedDate;

                    FirstWindow.transHist.add(str2); // add history to arraylist

                    new Transaction();
                    setVisible(false);
                    break;
                } else if (i == (ln - 6)) {
                    JOptionPane.showMessageDialog(null, "Incorrect Username or Password");
                    break;
                }
                for (int k = 1; k <= 5; k++) {
                    raf.readLine();
                }
            }
        } catch (IOException ex) {
        }

    }
    //count the number of lines from file
    void countLines() {
        try {
            ln = 0;
            RandomAccessFile raf = new RandomAccessFile(file + "\\logins.txt", "rw");
            for (int i = 0; raf.readLine() != null; i++) {
                ln++;
            }
        } catch (IOException ex) {
        }

    }

    void writeData(){
        final String outputFilePath = "C:/Files/AccountDetails.txt";
        // new file object
        File file = new File(outputFilePath);

        try (BufferedWriter bf = new BufferedWriter(new FileWriter(file))) {

            // create new BufferedWriter for the output file
            // iterate map entries
            for (Map.Entry<String, Double> entry : FirstWindow.AccountBalance.entrySet()) {

                // put key and value separated by a column
                bf.write("AccNo:" + entry.getKey() + "\r\n" + "CurntBal:"+ entry.getValue() + "\r\n");

                // new line
                bf.newLine();
            }

            bf.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // always close the writer
    }

    Login() {

        Image image = null;
        imglabel = new JLabel("");
        try {
            URL url = new URL("https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=2000");
            image = ImageIO.read(url);
        } catch (IOException e) {
            e.printStackTrace();
        }
        imglabel.setIcon(new ImageIcon( image));

        imglabel.setBounds(0,0,11000,800);

        label1 = new JLabel("Login");
        label1.setForeground(Color.blue);
        label1.setFont(new Font("Serif", Font.BOLD, 20));
        label2 = new JLabel("Account Number:");
        label3 = new JLabel("Password:");
        textField = new JTextField();
        passwordField = new JPasswordField();
        button1 = new JButton("Submit");
        button2 = new JButton("Clear");
        button3 = new JButton("Logout");

        label1.setBounds(100, 30, 400, 30);
        label2.setBounds(80, 70, 200, 30);
        label3.setBounds(80, 110, 200, 30);
        textField.setBounds(300, 70, 200, 30);
        passwordField.setBounds(300, 110, 200, 30);
        button1.setBounds(150, 160, 100, 30);
        button2.setBounds(270, 160, 100, 30);
        button3.setBounds(490, 10, 80, 30);

        container.add(label1);
        container.add(label2);
        container.add(label3);
        container.add(textField);
        container.add(passwordField);
        container.add(button1);
        container.add(button2);
        container.add(button3);
        container.add(imglabel);

        button1.addActionListener(this);
        button2.addActionListener(this);
        button3.addActionListener(this);

        setTitle("Login");
        setSize(600, 300);
        setVisible(true);
        setResizable(false);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        if (e.getSource() == button2)
        {
            textField.setText("");
            passwordField.setText("");

        }else if (e.getSource() == button1)
        {
            showData();
        }else if (e.getSource() == button3)
        {
            if (!FirstWindow.transHist.isEmpty()) {
                writeData();
            }
            JOptionPane.showMessageDialog(button3, "Successfully Logged out!!!");
            System.exit(0);
        }
    }

    public void showData() {

        String str1 = textField.getText();

        char[] p = passwordField.getPassword();

        String str2 = new String(p);

        try {

            createFolder();
            readFile();
            countLines();
            logic(str1, str2);

        } catch (Exception ex) {

        }
    }
    public static void main(String[] args) {

        new Login();
    }
}