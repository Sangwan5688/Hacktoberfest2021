package JotEase;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class About extends JFrame implements ActionListener {
    About(){
//        Opens a window with preset dimensions
        setBounds(700,300,600,500);
        setLayout(null);

//        Adding an image (i1) and downscaling it (i2)
//        since JLabel is a class in Swing, it doesn't accept an awt object (i2)
//        (JLabel doesn't accept object of Image class)so we have to convert it back to ImageIcon object (i3)

        ImageIcon originalImage = new ImageIcon(ClassLoader.getSystemResource("JotEase/icons/windows.png"));
        Image downscaledImage = originalImage.getImage().getScaledInstance(300,60,Image.SCALE_DEFAULT);
        ImageIcon finalImage = new ImageIcon(downscaledImage);
        JLabel headerIcon = new JLabel(finalImage);

//        Places the image on top of the window
        headerIcon.setBounds(70,40,400,80);
        add(headerIcon);

        JLabel text = new JLabel("<html><p>JotEase is a lightweight and user-friendly notepad clone developed in Java,designed to provide a seamless and efficient text editing experience.</p><html>");
        text.setBounds(100,150,400,200);
        text.setFont(new Font("SAN SERIF",Font.PLAIN,20));
        add(text);

//        Adds Button to the about page
        JButton button = new JButton("OK");
        button.setBounds(400,400,120,25);
        button.addActionListener(this);
        add(button);

        setVisible(true);
    }

    @Override
    public void actionPerformed (ActionEvent actionEvent){
//        Closes the window
        this.setVisible(false);
    }
    public static void main(String[] args) {
        new About();
    }
}
