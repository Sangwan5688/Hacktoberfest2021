import java.awt.event.*;  
import javax.swing.*;  
public class WCC extends JFrame implements ActionListener{  
JTextArea ta;  
JButton b1,b2;  
WCC(){  
    super("Word Character Counter - JavaTpoint");  
    ta=new JTextArea();  
    ta.setBounds(50,50,300,200);  
      
    b1=new JButton("Word");  
    b1.setBounds(50,300,100,30);  
      
    b2=new JButton("Character");  
    b2.setBounds(180,300,100,30);  
      
    b1.addActionListener(this);  
    b2.addActionListener(this);  
    add(b1);add(b2);add(ta);  
    setSize(400,400);  
    setLayout(null);  
    setVisible(true);  
}  
public void actionPerformed(ActionEvent e){  
    String text=ta.getText();  
    if(e.getSource()==b1){  
        String words[]=text.split("\\s");  
        JOptionPane.showMessageDialog(this,"Total words: "+words.length);  
    }  
    if(e.getSource()==b2){  
        JOptionPane.showMessageDialog(this,"Total Characters with space: "+text.length());  
    }  
}  
public static void main(String[] args) {  
    new WCC();  
}  
}  
