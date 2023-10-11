import javax.imageio.ImageIO;
import java.net.URL;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.io.*;
import java.util.*;

public class CheckBalance extends JFrame implements ActionListener {

    JLabel label1, label2, label3,imglabel; // labels
    JTextField textField1; // text fields
    JButton button1, button2, button3; // buttons
    final static String outputFilePath = "C:/Files/AccountDetails.txt"; // file path
    //Get the container
    Container container = getContentPane();
    CheckBalance() { // constructor

        Image image = null;
        imglabel = new JLabel(""); // add the image
        try {
            URL url = new URL("https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=2000");
            image = ImageIO.read(url);
        } catch (IOException e) {
            e.printStackTrace();
        }
        imglabel.setIcon(new ImageIcon( image));

        imglabel.setBounds(0,0,11000,800);

        label1 = new JLabel("Balance Inquiry");
        label1.setForeground(Color.blue);
        label1.setFont(new Font("Serif", Font.BOLD, 20));
        label2 = new JLabel("Account No :" );
        label2.setFont(new Font("Serif", Font.BOLD, 18));

        textField1 = new JTextField();
        button1 = new JButton("Enter");
        button2 = new JButton("Logout");
        button3 = new JButton("Back");

        label1.setBounds(220, 30, 400, 30);
        label2.setBounds(90, 80, 200, 30);

        label3 = new JLabel("");
        label3.setFont(new Font("Serif", Font.BOLD, 18));
        label3.setForeground(Color.RED);
        label3.setBounds(130, 130, 300, 30);
        container.add(label3);

        textField1.setBounds(200, 80, 200, 30);
        button1.setBounds(100, 180, 100, 35);
        button2.setBounds(220, 180, 100, 35);
        button3.setBounds(340,180,100,35);

        // add elements
        container.add(label1);
        container.add(label2);
        container.add(textField1);
        container.add(button1);
        container.add(button2);
        container.add(button3);
        container.add(imglabel);

        button1.addActionListener(this);
        button2.addActionListener(this);
        button3.addActionListener(this);

        setTitle("Balance Inquiry");
        setSize(600, 300);
        setVisible(true);
        setResizable(false);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
    }

    // write account number and balance into AccountDetails.txt file
    void writeData(){
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

    @Override
    public void actionPerformed(ActionEvent e) {

        if (e.getSource() == button2)
        {
            if (!FirstWindow.transHist.isEmpty()) {
                writeData();
            }
            JOptionPane.showMessageDialog(button2, "Successfully Logged out!!!");
            System.exit(0);
        }else if (e.getSource() == button1){
            String str = textField1.getText();
            if(str.equals(Login.usr)){
                double blnc = FirstWindow.AccountBalance.get(Login.usr); // get account number's value in hashmap

                String str1=String.format("Your account balance is %s",blnc+"0");
                label3.setText(str1);

                // set date & time
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

                String formattedDate = myDateObj.format(myFormatObj);

                String str2=String.format("You have inquired balance | Transaction Date and Time - %s",formattedDate);

                // add balance inquiry transaction to arraylist
                FirstWindow.transHist.add(str2);
                textField1.setText(""); // clear the teat field
            }else{
                JOptionPane.showMessageDialog(button1, "Invalid username!"); // display the message box when username is invalid
            }

        }else if (e.getSource() == button3) {

            new Transaction(); // call to transaction class
            setVisible(false); // close the check balance window
        }
    }

    public static void main(String[] args) {

        new CheckBalance();

    }
}
