import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionListener;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.awt.event.ActionEvent;
import java.util.Map;

public class TransactionHistory extends JFrame implements ActionListener{
    JTable  table = new JTable(); // table
    DefaultTableModel model = new DefaultTableModel();
    JScrollPane scroll;
    final static String outputFilePath = "C:/Files/AccountDetails.txt";
    JButton button1, button2; // buttons
    //Get the container
    Container container = getContentPane();
    public TransactionHistory() {

        button1 = new JButton("Back");
        button1.setBounds(180, 490, 100, 35);
        button2 = new JButton("Logout");
        button2.setBounds(300, 490, 100, 35);

        container.add(button1);
        container.add(button2);

        button1.addActionListener(this);
        button2.addActionListener(this);

        ArrayList<String> list = FirstWindow.transHist;

        String[] array = new String[list.size()];

        for (int i = 0; i < list.size(); i++) {
            array[i] = list.get(i);
        }

        table.setModel(model);
        scroll = new JScrollPane(table);

        String[] text = {"Your have not done any transaction!!"}; // check transaction history is empty
        if (FirstWindow.transHist.isEmpty()){
            model.addColumn("Your Transaction History",text);
        }else {
            model.addColumn("Your Transaction History",array); // array get into the JTable
        }
        container.add(scroll, BorderLayout.CENTER);

        setTitle("Transaction History");
        setSize(600, 600);
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
        new TransactionHistory();
    }

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == button1)
        {
            new Transaction();
            setVisible(false);
        }else if (e.getSource() == button2)
        {
            if (!FirstWindow.transHist.isEmpty()) {
                writeData();
            }
            JOptionPane.showMessageDialog(button2, "Successfully Logged out!!!");
            System.exit(0);
        }
    }
}