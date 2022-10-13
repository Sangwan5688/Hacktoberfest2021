import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.net.URL;

public class SupportCentre extends JFrame implements ActionListener {

    JLabel label1, pwlabel,label2, label3, label4, imglabel; // labels
    JButton button1; // button

    //Get the container
    Container container = getContentPane();
    SupportCentre() {

        label1 = new JLabel("Support Centre");
        label1.setForeground(Color.BLUE);
        label1.setFont(new Font("Serif", Font.BOLD, 20));
        label1.setBounds(220, 30, 400, 30);

        pwlabel = new JLabel("<html>PASSWORD<br/>Please make sure that your password is in the following format<br/>- Contain at least one Uppercase letter<br/>- Contain at least one Lowercase letter,one Number<br/>- Contain at least one Special Character.<br/>- Should be at least 8 characters long</html>");
        container.add(pwlabel);
        pwlabel.setBounds(20, 70, 400, 100);

        label2 = new JLabel("<html>EMAIL<br/>The email should be in the standard format (eg: john@gmail.com)</html>");
        container.add(label2);
        label2.setBounds(20, 160, 400, 100);

        label3 = new JLabel("<html>PHONE NUMBER<br/>The phone number should start from 0 and should contain only 10 characters.</html>");
        container.add(label3);
        label3.setBounds(20, 220, 400, 100);

        label4 = new JLabel("<html>Please make sure to log out of the system once you have registered yourself. (If you do not log out of the system your details won't be recorded)<br/><br/>For further inquires please contact our 24 hour hotline 011345983</html>");
        container.add(label4);
        label4.setBounds(20, 290, 400, 100);

        button1 = new JButton("Close");
        button1.setBounds(250, 480, 100, 35);


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

        container.add(label1);
        container.add(button1);
        container.add(imglabel);

        button1.addActionListener(this);

        setTitle("Support Centre");
        setSize(600, 600);
        setVisible(true);
        setResizable(false);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
    }


    @Override
    public void actionPerformed(ActionEvent e) {

        if (e.getSource() == button1){
            setVisible(false);
        }

    }

    public static void main(String[] args) {

        new SupportCentre();

    }
}