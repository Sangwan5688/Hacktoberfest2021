import javax.imageio.ImageIO;
import java.net.URL;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class WithdrawMoney extends JFrame implements ActionListener {

    JLabel label1, label2, label3, imglabel;
    JTextField textField1, textField2;
    JButton button1, button2, button3;

    //Get the container
    Container container = getContentPane();

    WithdrawMoney() {

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

        label1 = new JLabel("Withdraw");
        label1.setForeground(Color.blue);
        label1.setFont(new Font("Serif", Font.BOLD, 20));
        label2 = new JLabel("Account No :" );
        label2.setFont(new Font("Serif", Font.BOLD, 18));
        label3 = new JLabel("Amount :" );
        label3.setFont(new Font("Serif", Font.BOLD, 18));

        textField1 = new JTextField();
        textField2 = new JTextField();
        button1 = new JButton("Withdraw");
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

        setTitle("Withdraw");
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
            textField1.setText("");
            textField2.setText("");

        }else if (e.getSource() == button1)
        {
            withdrawal();
        }else if (e.getSource() == button3){
            new Transaction();
            setVisible(false);
        }
    }

    public void withdrawal() {
        String str = textField1.getText();
        String bal = textField2.getText();
        if(str.equals(Login.usr)){
            for ( String key : FirstWindow.AccountBalance.keySet() ){
                if (key.equals(str)){
                    try{
                        double bal2 = Double.parseDouble(bal);
                        double currentBlnc = FirstWindow.AccountBalance.get(key); // get the current value in hashmap using key
                        double x = currentBlnc - 1000;
                        // check entered balance is greater than 1000
                        if (x > bal2){
                            if (bal2>100000){
                                JOptionPane.showMessageDialog(button1, "The can only withdraw Rs. 100000.");
                            }else {
                                // check the entered value in multiples of one hundred
                                if (bal2 % 100 != 0) {
                                    JOptionPane.showMessageDialog(button1, "Enter value in multiples of one hundred!");
                                } else {
                                    double newBlnc = currentBlnc - bal2;
                                    FirstWindow.AccountBalance.put(str, newBlnc);
                                    JOptionPane.showMessageDialog(button1, "Successfully Withdrawal!");

                                    // clear the text fields
                                    textField1.setText("");
                                    textField2.setText("");

                                    LocalDateTime myDateObj = LocalDateTime.now();
                                    DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

                                    String formattedDate = myDateObj.format(myFormatObj);

                                    String str3 = String.format("You have withdraw Rs.%s", bal + " | Transaction Date and Time - " + formattedDate);
                                    FirstWindow.transHist.add(str3);
                                }
                            }
                        }
                        else { // When entered balance is not greater than 1000 below message box displays
                            JOptionPane.showMessageDialog(button1, "Insufficient balance\nYour minimum balance should be Rs. 1000");
                        }
                    }catch (NumberFormatException e){
                        JOptionPane.showMessageDialog(button1, "Invalid Entry");
                    }
                }
            }
        } // When entered account number is not equal below message box displays
        else{JOptionPane.showMessageDialog(button1, "Invalid username!");
        }

    }

    public static void main(String[] args) {
        new WithdrawMoney();

    }
}