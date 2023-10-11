import javax.imageio.ImageIO;
import java.awt.*;
import java.net.URL;
import javax.swing.*;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Map;

public class Transaction extends JFrame implements ActionListener{

    final static String outputFilePath = "C:/Files/AccountDetails.txt";
    JLabel label1,imglabel;
    JButton button1, button2, button3, button4, button5, button6, button7;

    //Get the container
    Container container = getContentPane();
    public Transaction() {

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

        label1 = new JLabel("Transactions");
        label1.setForeground(Color.DARK_GRAY);
        label1.setFont(new Font("Serif", Font.BOLD, 30));
        label1.setBounds(220, 30, 400, 30);

        button1 = new JButton("Deposit");
        button1.setBounds(320, 100, 200, 40);
        button2 = new JButton("Withdraw");
        button2.setBounds(320, 160, 200, 40);
        button3 = new JButton("Balance Inquiry");
        button3.setBounds(320, 220, 200, 40);
        button4 = new JButton("Money Transfer");
        button4.setBounds(320, 280, 200, 40);
        button5 = new JButton("History");
        button5.setBounds(320, 340, 200, 40);
        button6 = new JButton("Delete Account");
        button6.setBounds(320, 400, 200, 40);
        button7 = new JButton("Exit");
        button7.setBounds(320, 460, 200, 40);


        container.add(label1);
        container.add(button1);
        container.add(button2);
        container.add(button3);
        container.add(button4);
        container.add(button5);
        container.add(button6);
        container.add(button7);
        container.add(imglabel);


        button1.addActionListener(this);
        button2.addActionListener(this);
        button3.addActionListener(this);
        button4.addActionListener(this);
        button5.addActionListener(this);
        button6.addActionListener(this);
        button7.addActionListener(this);

        setTitle("Transactions");
        setSize(600,600);
        setVisible(true);
        setResizable(false);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
    }

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

    public static void main(String[] args) {
        new Transaction();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == button1)
        {
            new DepositMoney();
            setVisible(false);
        }else if (e.getSource() == button2)
        {
            new WithdrawMoney();
            setVisible(false);
        }else if (e.getSource() == button3)
        {
            new CheckBalance();
            setVisible(false);
        }else if (e.getSource() == button4)
        {
            new FundTransfer();
            setVisible(false);
        }else if (e.getSource() == button5)
        {
            new TransactionHistory();
            setVisible(false);
        }else if (e.getSource() == button6)
        {
            JOptionPane.showMessageDialog(button6,
                    "Please go to your nearest bank branch inorder to close or remove your account " +
                            "or Please contact 011345983 for further assistance ");

        }else if (e.getSource() == button7)
        {
            if (!FirstWindow.transHist.isEmpty()) {
                writeData();
            }
            JOptionPane.showMessageDialog(button7, "Successfully Logged out!!!");
            System.exit(0);
        }
    }
}
