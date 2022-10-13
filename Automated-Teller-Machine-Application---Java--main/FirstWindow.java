import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.JButton;
import javax.swing.JLabel;
import java.awt.*;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;

public class FirstWindow extends JFrame implements ActionListener {

    public static HashMap<String, Double> AccountBalance = new HashMap<>(); // Account details will be stored into hashmap
    public static ArrayList<String> transHist = new ArrayList<>(); // History will be stored into arraylist
    JLabel label1, imglabel; // labels
    JButton button1, button2; // buttons

    File file = new File("C:\\Files");   //file path
    int ln;

    //Get the container
    Container container = getContentPane();
    public FirstWindow() {
        // add the image
        Image image = null;
        imglabel = new JLabel("");
        try {
            URL url = new URL("https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=2000");
            image = ImageIO.read(url);
        } catch (IOException e) {
            e.printStackTrace();
        }
        assert image != null;
        imglabel.setIcon(new ImageIcon( image));
        imglabel.setBounds(0,0,11000,800);

        label1 = new JLabel("ATM");
        label1.setForeground(Color.DARK_GRAY);
        label1.setFont(new Font("Serif", Font.BOLD, 30));
        label1.setBounds(250, 30, 400, 30);

        button1 = new JButton("Register");
        button1.setBounds(190, 100, 200, 40);
        button2 = new JButton("Login");
        button2.setBounds(190, 150, 200, 40);

        container.add(label1);
        container.add(button1);
        container.add(button2);
        container.add(imglabel);

        button1.addActionListener(this);
        button2.addActionListener(this);

        createFolder();
        readFile();
        countLines();
        logicBal();
        countLinesBal();

        setTitle("ATM");
        setSize(600,300);
        setVisible(true);
        setResizable(false);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    void createFolder(){
        if(!file.exists()){
            file.mkdirs();
        }
    }
    void readFile(){
        try {
            FileReader fr = new FileReader(file+"\\AccountDetails.txt");
        } catch (FileNotFoundException ex) {
            try {
                FileWriter fw = new FileWriter(file+"\\AccountDetails.txt");
            } catch (IOException ex1) {
            }
        }

    }

    void countLines(){
        try {
            ln=0;
            RandomAccessFile raf = new RandomAccessFile(file+"\\AccountDetails.txt", "rw");
            for(int i=0;raf.readLine()!=null;i++){
                ln++;
            }
        } catch (IOException ex) {
        }
    }

    void logicBal() {
        try {
            RandomAccessFile raf = new RandomAccessFile(file + "\\AccountDetails.txt", "rw");
            for (int i = 0; i < ln; i += 3) {

                String forUser = raf.readLine().substring(6);
                String CuBal = raf.readLine().substring(9);

                double b =Double.parseDouble(CuBal);
                AccountBalance.put(forUser,b);

                for (int k = 1; k <= 1; k++) {
                    raf.readLine();
                }
            }
        } catch (IOException ex) {
        }
    }
    //count the number of lines from file
    void countLinesBal() {
        try {
            ln = 0;
            RandomAccessFile raf = new RandomAccessFile(file + "\\AccountDetails.txt", "rw");
            for (int i = 0; raf.readLine() != null; i++) {
                ln++;
            }
        } catch (IOException ex) {
        }
    }

    public static void main(String[] args) {
        new FirstWindow();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == button1)
        {
            new Registration();
            setVisible(false);
        }else if (e.getSource() == button2)
        {
            if (AccountBalance.isEmpty()) {
                JOptionPane.showMessageDialog(button2, "Please register yourself in the system first");
            }
            else {
                new Login();
                setVisible(false);
            }
        }
    }
}
