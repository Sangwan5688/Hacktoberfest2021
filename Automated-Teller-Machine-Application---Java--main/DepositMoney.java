import javax.imageio.ImageIO;
import java.net.URL;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.time.LocalDateTime; // Import the LocalDateTime class
import java.time.format.DateTimeFormatter; // Import the DateTimeFormatter class

public class DepositMoney extends JFrame implements ActionListener {

    JLabel label1, label2, label3,imglabel; // labels
    JTextField textField1, textField2; // text fields
    JButton button1, button2, button3; // buttons

    //Get the container
    Container container = getContentPane();
    DepositMoney() { // constructor

        // add the image
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

        label1 = new JLabel("Money Deposit");
        label1.setForeground(Color.blue);
        label1.setFont(new Font("Serif", Font.BOLD, 20));
        label2 = new JLabel("Account No :" );
        label2.setFont(new Font("Serif", Font.BOLD, 18));
        label3 = new JLabel("Amount :" );
        label3.setFont(new Font("Serif", Font.BOLD, 18));

        textField1 = new JTextField();
        textField2 = new JTextField();
        button1 = new JButton("Deposit");
        button2 = new JButton("Clear");
        button3 = new JButton("Back");

        label1.setBounds(220, 30, 400, 30);
        label2.setBounds(90, 80, 200, 30);
        label3.setBounds(90, 120, 200, 30);
        textField1.setBounds(200, 80, 200, 30);
        textField2.setBounds(200, 120, 200, 30);
        button1.setBounds(100, 165, 100, 35);
        button2.setBounds(220, 165, 100, 35);
        button3.setBounds(340, 165, 100, 35);

        // add elements
        container.add(label1);
        container.add(label2);
        container.add(label3);
        container.add(textField1);
        container.add(textField2);
        container.add(button1);
        container.add(button2);
        container.add(button3);
        container.add(imglabel);

        button1.addActionListener(this);
        button2.addActionListener(this);
        button3.addActionListener(this);

        setTitle("Money Deposit");
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
            // clear the text fields
            textField1.setText("");
            textField2.setText("");

        }else if (e.getSource() == button1)
        {
            deposit();
        }else{
            new Transaction();
            setVisible(false);
        }
    }

    public void deposit() {
        String str = textField1.getText();
        String bal = textField2.getText();
        if(str.equals(Login.usr)){ // check entered username equals to log in username
            for ( String key : FirstWindow.AccountBalance.keySet() ) {
                if (key.equals(str)){
                    try{
                        double bal2 = Double.parseDouble(bal);
                        // check the entered value in multiples of one hundred
                        if (bal2>1000000){
                            JOptionPane.showMessageDialog(button1, "The can only deposit Rs. 1000000.");
                        }else {
                            if (bal2 % 100 != 0){
                                JOptionPane.showMessageDialog(button1, "Enter value in multiples of one hundred!");
                            }
                            else {
                                double prevBal = FirstWindow.AccountBalance.get(key); // get the current value in hashmap using key
                                if (prevBal==0 && bal2<1000){ // check the account is new and its initial deposited value is greater than 1000
                                    JOptionPane.showMessageDialog(button1, "Your initial deposit should be grater than Rs.1000.00");
                                    }
                                else{
                                    double currentBal = prevBal + bal2;
                                    FirstWindow.AccountBalance.put(str,currentBal); // add the new value into hashmap
                                    JOptionPane.showMessageDialog(button1, "Successfully Deposited!");

                                    textField1.setText(""); // clear text fields
                                    textField2.setText("");

                                    // get date and time
                                    LocalDateTime myDateObj = LocalDateTime.now();
                                    DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

                                    String formattedDate = myDateObj.format(myFormatObj);

                                    String str1=String.format("You have deposited Rs.%s",bal + " | Transaction Date and Time - "+formattedDate);
                                    FirstWindow.transHist.add(str1);
                                }
                            }
                        }
                    }catch (NumberFormatException e){
                        JOptionPane.showMessageDialog(button1, "Invalid Entry");
                    }
                }
            }
        }else{ // When entered account number is not equal below message box displays
            JOptionPane.showMessageDialog(button1, "Invalid Account number!");}
    }

    public static void main(String[] args) {

        new DepositMoney();

    }
}