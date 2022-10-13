import javax.swing.*;
import javax.imageio.ImageIO;
import java.io.IOException;
import java.net.URL;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FundTransfer extends JFrame implements ActionListener   {

    JLabel label1, label2, label3, label4, label5,imglabel;
    JTextField textField1, textField2, textField3, textField4;
    JButton button1, button2, button3;
    //Get the container
    Container container = getContentPane();

    FundTransfer()
    {
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

        label1 = new JLabel("Inter Bank Fund Transfer");
        label1.setForeground(Color.blue);
        label1.setFont(new Font("Serif", Font.BOLD, 20));
        label2 = new JLabel("Account No :");
        label3 = new JLabel("Beneficiary Account No :");
        label4 = new JLabel("Re-enter Beneficiary Account No :");
        label5 = new JLabel("Amount : ");
        textField1 = new JTextField();
        textField2 = new JTextField();
        textField3 = new JTextField();
        textField4 = new JTextField();

        button1 = new JButton("Submit");
        button2 = new JButton("Check Balance");
        button3 = new JButton("Back");
        button1.addActionListener(this);
        button2.addActionListener(this);
        button3.addActionListener(this);

        label1.setBounds(160, 30, 400, 30);
        label2.setBounds(80, 80, 200, 30);
        label3.setBounds(80, 120, 200, 30);
        label4.setBounds(80, 160, 200, 30);
        label5.setBounds(80, 200, 200, 30);
        textField1.setBounds(300, 80, 200, 30);
        textField2.setBounds(300, 120, 200, 30);
        textField3.setBounds(300, 160, 200, 30);
        textField4.setBounds(300, 200, 200, 30);
        button1.setBounds(55, 400, 150, 30);
        button2.setBounds(215, 400, 150, 30);
        button3.setBounds(375, 400, 150, 30);
        container.add(label1);
        container.add(label2);
        container.add(textField1);
        container.add(label3);
        container.add(textField2);
        container.add(label4);
        container.add(label5);
        container.add(textField3);
        container.add(textField4);
        container.add(button1);
        container.add(button2);
        container.add(button3);
        container.add(imglabel);

        setTitle("Fund Transfer");
        setSize(600, 600);
        setVisible(true);
        setResizable(false);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
    }

    void fundTransfer(){
        String usr = textField1.getText();
        String Beneficiary = textField2.getText();
        String bal = textField4.getText();
        double doubleBal = Double.parseDouble(bal);

        if (FirstWindow.AccountBalance.containsKey(usr)){
            double currentBlnc = FirstWindow.AccountBalance.get(usr); // get the account balance by hashmap's key
            double x = currentBlnc - 1000;
            if (x > doubleBal){ // check entered balance is greater than 1000
                try{
                    double prevBal = FirstWindow.AccountBalance.get(usr);
                    double currentBal = prevBal - doubleBal;
                    FirstWindow.AccountBalance.put(usr,currentBal); // put user's current balance into hashmap
                    if (FirstWindow.AccountBalance.containsKey(Beneficiary)){
                        double prevBalBene = FirstWindow.AccountBalance.get(Beneficiary);
                        double currentBalBene = prevBalBene + doubleBal;
                        FirstWindow.AccountBalance.put(Beneficiary,currentBalBene); // put beneficiary's current balance into transaction
                        JOptionPane.showMessageDialog(button1, "Successfully Transferred!");

                        // clear the text fields
                        textField1.setText("");
                        textField2.setText("");
                        textField3.setText("");
                        textField4.setText("");

                        // get date & time
                        LocalDateTime myDateObj = LocalDateTime.now();
                        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

                        String formattedDate = myDateObj.format(myFormatObj);
                        String str2= "Your have successfully transferred money | Transaction Date and Time - " + formattedDate;
                        FirstWindow.transHist.add(str2); // add history into arraylist

                    }else {// When entered username is not equal below message box displays
                        JOptionPane.showMessageDialog(button1, "Invalid Beneficiary Account Number!!");
                    }
                }catch (NumberFormatException e){
                    JOptionPane.showMessageDialog(button1, "Invalid Entry");
                }
            }else { // When entered balance is not greater than 1000 above message box displays
                JOptionPane.showMessageDialog(button1, "Insufficient balance\nYour minimum balance should be Rs. 1000");
            }
        }else { // When entered account number is not equal below message box displays
            JOptionPane.showMessageDialog(button1, "Invalid Username!");
        }
    }

    @Override
    public void actionPerformed(ActionEvent e)
    {
        String str1 = textField1.getText();
        String str2 = textField2.getText();
        String str3 = textField3.getText();
        String str4 = textField4.getText();
        if (e.getSource() == button1)
        {
            // checking whether text fields are empty
            if (str1.equals("") || str2.equals("") || str3.equals("") || str4.equals("")){
                JOptionPane.showMessageDialog(button1, "Blank not allowed!");
            }else{
                // check the beneficiary account number is equals to login's account number
                if (str1.equals(str2)){
                    JOptionPane.showMessageDialog(button1, "You can not deposit money to your own account in this section\nPlease Go to the Deposit section to deposit money into your own account");
                }else{
                    if (str2.equals(str3)){
                        fundTransfer();
                    }else {JOptionPane.showMessageDialog(button1, "Beneficiary Account Number Does Not Match");}
                }
            }
        }else if (e.getSource() == button2)
        {
            new CheckBalance();
            setVisible(false);
        }else if (e.getSource() == button3) {
            new Transaction();
            setVisible(false);
        }
    }
    public static void main(String[] args)
    {
        new FundTransfer();

    }
}