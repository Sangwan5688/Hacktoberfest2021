import javax.imageio.ImageIO;
import java.net.URL;
import javax.swing.*;
import java.awt.*;
import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Registration extends JFrame implements ActionListener   {
    public static String acc;
    public static double balance;

    JLabel label1, label2, label3, label4, label5, label6, label7, label8, label9, label10,imglabel; // labels
    JTextField textField1, textField2, textField3, textField4, textField5; // text fields
    JButton button1, button2, button3, button4, button5; // buttons
    JPasswordField pwdField1, pwdField2; // password fields
    JCheckBox term; // check box

    StringBuilder start = new StringBuilder();

    File file = new File("C:\\Files"); // file path

    int ln;

    //Get the container
    Container container = getContentPane();

    Registration()
    {
        Random value = new Random();

        // create the account number
        // Generate two values to append to 'BE'
        int r1 = value.nextInt(10);
        int r2 = value.nextInt(10);
        start.append(r1).append(r2);

        int count = 0;
        int n = 0;
        for(int i =0; i < 7;i++)
        {
            if(count == 4)
            {
                count =0;
            }
            else
                n = value.nextInt(10);
            start.append(n);
            count++;
        }

        term = new JCheckBox("Accept Terms And Conditions.");
        term.setFont(new Font("Arial", Font.PLAIN, 15));
        term.setOpaque(false);
        term.setSize(250, 20);
        term.setLocation(150, 362);

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

        label1 = new JLabel("Registration Form in ATM");
        label1.setForeground(Color.blue);
        label1.setFont(new Font("Serif", Font.BOLD, 20));
        label2 = new JLabel("Name :");
        label3 = new JLabel("Email :");
        label4 = new JLabel("Phone No : ");
        label5 = new JLabel("Gender : ");
        label6 = new JLabel("Address :");
        label7 = new JLabel("Create Password :");
        label8 = new JLabel("Confirm Password :");
        label9 = new JLabel("**You will receive your unique account number once the registration is successful");
        label10 = new JLabel("Please remember/take note of it since it will be used for all future transactions .");
        textField1 = new JTextField();
        textField2 = new JTextField();
        textField3 = new JTextField();
        textField4 = new JTextField();
        textField5 = new JTextField();
        pwdField1 = new JPasswordField();
        pwdField2 = new JPasswordField();

        button1 = new JButton("Submit");
        button2 = new JButton("Clear");
        button3 = new JButton("Login");
        button4 = new JButton("Support Centre");
        button5 = new JButton("View");
        button5.addActionListener(this);
        button5.setBounds(380, 362, 60, 20);
        container.add(button5);

        button1.addActionListener(this);
        button2.addActionListener(this);
        button3.addActionListener(this);
        button4.addActionListener(this);

        label1.setBounds(100, 30, 400, 30);
        label2.setBounds(80, 70, 200, 30);
        label3.setBounds(80, 110, 200, 30);
        label4.setBounds(80, 150, 200, 30);
        label5.setBounds(80, 190, 200, 30);
        label6.setBounds(80, 230, 200, 30);
        label7.setBounds(80, 270, 200, 30);
        label8.setBounds(80, 310, 200, 30);
        label8.setBounds(80, 310, 200, 30);
        label9.setBounds(20, 430, 600, 50);
        label9.setFont(new Font("Serif", Font.BOLD, 16));
        label9.setForeground(Color.red);
        label10.setBounds(20, 445, 600, 50);
        label10.setFont(new Font("Serif", Font.BOLD, 16));
        label10.setForeground(Color.red);
        textField1.setBounds(300, 70, 200, 30);
        textField2.setBounds(300, 110, 200, 30);
        textField3.setBounds(300, 230, 200, 30);
        textField4.setBounds(300, 150, 200, 30);
        textField5.setBounds(300, 190, 200, 30);
        pwdField1.setBounds(300, 270, 200, 30);
        pwdField2.setBounds(300, 310, 200, 30);
        button1.setBounds(200, 400, 100, 30);
        button2.setBounds(320, 400, 100, 30);
        button3.setBounds(530, 10, 130, 30);
        button4.setBounds(530, 55, 130, 30);

        // add elements
        container.add(label1);
        container.add(label2);
        container.add(textField1);
        container.add(label3);
        container.add(textField2);
        container.add(label4);
        container.add(pwdField1);
        container.add(label5);
        container.add(pwdField2);
        container.add(label6);
        container.add(textField3);
        container.add(label7);
        container.add(textField4);
        container.add(label8);
        container.add(textField5);
        container.add(button1);
        container.add(button2);
        container.add(button3);
        container.add(button4);
        container.add(label9);
        container.add(label10);
        container.add(term);
        container.add(imglabel);

        setTitle("Registration Form");
        setSize(700, 700);
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
            FileReader fr = new FileReader(file +"\\logins.txt");
        } catch (FileNotFoundException ex) {
            try {
                FileWriter fw = new FileWriter(file +"\\logins.txt");
            } catch (IOException ex1) {
            }
        }

    }

    void addData(String name,String pswd,String acc,String address,String phnNo,String gender,String mail){
        Registration.acc = acc;
        try {
            RandomAccessFile raf = new RandomAccessFile(file +"\\logins.txt", "rw");
            for(int i=0;i<ln;i++){
                raf.readLine();
            }
            //if condition added after video to have no lines on first entry
            if(ln>0){
                raf.writeBytes("\r\n");
                raf.writeBytes("\r\n");
            }
            raf.writeBytes("AccNo:"+acc+ "\r\n");
            raf.writeBytes("Password:"+pswd+ "\r\n");
            raf.writeBytes("Name:"+name+"\r\n");
            raf.writeBytes("Address:"+address+ "\r\n");
            raf.writeBytes("Email:"+mail + " | Phone No:"+phnNo+ "\r\n");
            raf.writeBytes("Gender:"+gender);

            FirstWindow.AccountBalance.put(acc,balance); // put account number and balance as 0

        } catch (IOException ex) {
        }

    }

    void countLines(){
        try {
            ln=0;
            RandomAccessFile raf = new RandomAccessFile(file +"\\logins.txt", "rw");
            for(int i=0;raf.readLine()!=null;i++){
                ln++;
            }
        } catch (IOException ex) {
        }

    }
    // validation of password
    public boolean checkValidPassword(char[] password)
    {
        int u = 0, l = 0, d = 0, sp = 0;
        //This function returns different values based on what is missing in the parameter 'password'
        if(password.length < 8)
        {
            return false;
        }
        for (char c : password) {
            if (Character.isUpperCase(c)) {
                u = 1;
            } else if (Character.isLowerCase(c)) {
                l = 1;
            } else if (Character.isDigit(c)) {
                d = 1;
            }
            if (!Character.isLetter(c) && !Character.isDigit(c) && !Character.isWhitespace(c)) {
                sp = 1;
            }
        }
        return u == 1 && l == 1 && d == 1 && sp == 1;
    }
    @Override
    public void actionPerformed(ActionEvent e)
    {
        if (e.getSource() == button1)
        {
            // get texts and get passwords
            String s1 = textField1.getText();
            String s2 = textField2.getText();
            char[] s3 = pwdField1.getPassword();
            char[] s4 = pwdField2.getPassword();
            String s8 = new String(s3);
            String s9 = new String(s4);
            String s5 = textField3.getText();
            String s6 = textField4.getText();
            String s7 = textField5.getText();

            // checking whether text fields are empty
            if (s1.equals("") || s2.equals("") || s9.equals("") || s5.equals("") || s6.equals("") || s7.equals("") || s8.equals("")){
                JOptionPane.showMessageDialog(button1, "Blank not allowed!");
            }
            else{
                if (term.isSelected()) // check term and condition checkbox is empty
                {
                    if (s8.equals(s9)) // check the entered passwords are equal
                    {
                        try
                        {
                            // check validity of password
                            char[] password = pwdField1.getPassword(); //getPassword() method returns the typed password as a character array
                            if(checkValidPassword(password))
                            {
                                // check validity of email
                                //Regular Expression
                                String regex = "^(.+)@(.+)$";
                                //Compile regular expression to get the pattern
                                Pattern pattern = Pattern.compile(regex);

                                Matcher matcher = pattern.matcher(s2);

                                if (matcher.matches()){
                                    // check validity of phone number
                                    StringBuilder string2 = new StringBuilder(s6);
                                    char x1 = string2.charAt(0);
                                    int length = string2.length();
                                    if (x1=='0' && length == 10){
                                        // check validity of gender
                                        if (s7.equalsIgnoreCase("Female") || s7.equalsIgnoreCase("Male") ){
                                            createFolder();
                                            readFile();
                                            countLines();

                                            String accNo = start.toString();
                                            addData(s1,s8,accNo,s5,s6,s7,s2);

                                            String str1=String.format("Your account created successfully\nYour account number is %s",start);
                                            JOptionPane.showMessageDialog(button1, str1);

                                            // get date & time
                                            LocalDateTime myDateObj = LocalDateTime.now();
                                            DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

                                            String formattedDate = myDateObj.format(myFormatObj);

                                            String str2= "Your account was created successfully | Transaction Date and Time - " + formattedDate;

                                            FirstWindow.transHist.add(str2);

                                            new Login(); // open login class
                                            setVisible(false); // close the registration window
                                        }else {
                                            JOptionPane.showMessageDialog(button1, "Please enter either Male or Female");
                                        }
                                    }else {
                                        JOptionPane.showMessageDialog(button1, "Please enter valid phone number.\nFor further information please click on the Support Centre button");
                                    }
                                }else {JOptionPane.showMessageDialog(button1, "Please enter valid email address.\nFor further information please click on the Support Centre button");}
                            }
                            else
                            {
                                String text ="Your password should be at least 8 characters long and contain\nat least one Uppercase letter,one Lowercase letter,one Number\nand one Special Character.\n";
                                JOptionPane.showMessageDialog(button1, "The password is not strong enough.\n"+text+"For further information please click on the Support Centre button.");
                            }

                            Arrays.fill(password, '0'); // Zero out the password, for security

                        }
                        catch (Exception ex)
                        {
                        }
                    }
                    else
                    {
                        JOptionPane.showMessageDialog(button1, "Password Does Not Match");
                    }
                }
                else{
                    JOptionPane.showMessageDialog(button1, "Please accept the terms & conditions");
                }

            }
        }else if (e.getSource() == button3){
            if (FirstWindow.AccountBalance.isEmpty()) {
                JOptionPane.showMessageDialog(button2, "Please register yourself in the system first");
            }else {
                new Login();
                setVisible(false);
            }
        }else if (e.getSource() == button4){
            new SupportCentre();
        }else if (e.getSource() == button5){
            new TermsConditions();
        }
        else
        {
            textField1.setText("");
            textField2.setText("");
            pwdField1.setText("");
            pwdField2.setText("");
            textField3.setText("");
            textField4.setText("");
            textField5.setText("");
            term.setSelected(false);
        }
    }
    public static void main(String[] args)
    {
        new Registration();

    }
}