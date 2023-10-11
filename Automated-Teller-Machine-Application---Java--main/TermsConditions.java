import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.IOException;
import java.net.URL;

class TermsConditions extends JFrame
{
    JLabel label1, imglabel;
    ButtonListener buttonListener1;

    //Get the container
    Container container = getContentPane();

    public TermsConditions()
    {   //Set absolute layout
        container.setLayout(null);

        //Set Background Color
        container.setBackground(Color.WHITE);

        JButton b1=new JButton("Close");
        b1.setSize(100,35);
        b1.setLocation(250,480);

        label1 = new JLabel("Terms & Conditions");
        label1.setSize(300,40);
        label1.setLocation(200,30);
        label1.setForeground(Color.blue);
        label1.setFont(new Font("Serif", Font.BOLD, 20));

        JLabel label3 = new JLabel("<html>The account should always have a minimum balance of 1000.<br/><br/>The bank have the authority to permanently close down any account if suspicious transactions or illegal money is detected.<br/><br/>If the bank account is inactive for more than 5 years with only the initial amount of 1000 as the balance, the bank have the authority to close down the account by notifying the account holder.<br/><br/>All details the user enters during the registration can be used by the bank for non- commercial promotional purposes.<br/><br/>The bank hold responsibility over the account holders privacy and will never give any information to unauthorised parties.</html>");
        container.add(label3);
        label3.setFont(new Font("Arial", Font.BOLD, 15));
        label3.setBounds(20, 70, 530, 380);

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

        buttonListener1 = new ButtonListener();
        b1.addActionListener(buttonListener1);

        container.add(b1);
        container.add(label1);
        container.add(imglabel);

        //Set the title of the window
        setTitle("Terms & Conditions");

        //Set the size of the window and display it
        setSize(600,600);
        setVisible(true);
        setResizable(false);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
    }

    private class ButtonListener implements ActionListener
    {
        @Override
        public void actionPerformed(ActionEvent e)
        {
            setVisible(false);
        }
    }

    public static void main(String[] args)
    {
        new TermsConditions();
    }
}