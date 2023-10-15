import javax.swing.JFrame;

public class ex53_1 extends JFrame{
    public ex53_1(){ }
    public ex53_1(String title){ super(title); }
    public static void main(String[] args) {
        ex53_1 jf = new ex53_1();
        jf.setTitle("Calculator");
        jf.setSize(350, 450);
        jf.setVisible(true);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }    
}