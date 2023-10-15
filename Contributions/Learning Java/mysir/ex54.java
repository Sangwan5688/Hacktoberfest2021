import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;
import java.awt.event.*;

public class ex54 extends JFrame{
    JLabel l1,l2,l3,l4;
    JTextField t1,t2;
    JButton b1;

    public ex54(){ }
    public ex54(String s){ super(s); }

    public void setComponents(){
        l1 = new JLabel("Addition of Two number");
        l2 = new JLabel("First no. ");
        l3 = new JLabel("Second no. ") ;
        l4 = new JLabel();
        t1 = new JTextField();
        t2 = new JTextField();
        b1= new JButton("Add");

        setLayout(null);
        l1.setBounds(35,20,250,20);
        add(l1);
        l2.setBounds(35,55,250,20);
        add(l2);
        t1.setBounds(120,55,50,20);
        add(t1);
        l3.setBounds(35,75,250,20);
        add(l3);
        t2.setBounds(120,75,50,20);
        add(t2);
        b1.setBounds(35,95,135,20);
        add(b1);
        l4.setBounds(35,135,250,20);
        add(l4);

        b1.addActionListener(new Handler());
        
    }

    class Handler implements ActionListener{
        public void actionPerformed(ActionEvent e){
            Integer a = Integer.parseInt(t1.getText());
            Integer b = Integer.parseInt(t2.getText());
            Integer s = a+b;
            l4.setText("sum is : "+s);
        }
    }

    public static void main(String[] args) {
        ex54 jf = new ex54();
        jf.setTitle("Calculator");

        jf.setComponents();


        jf.setVisible(true);
        jf.setSize(250, 300);   
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}
