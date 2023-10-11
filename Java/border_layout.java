import java.awt.*;
import javax.swing.*;
class Border
{
	JFrame f;
	Border()
	{
		f=new JFrame("har har shambu");
		JButton button1=new JButton("North");;
	    JButton button2=new JButton("South");;
		JButton button3=new JButton("East");;
	    JButton button4=new JButton("West");;
		JButton button5=new JButton("Center");;
		f.add(button1,BorderLayout.NORTH);
		f.add(button2,BorderLayout.SOUTH);
		f.add(button3,BorderLayout.EAST);
		f.add(button4,BorderLayout.WEST);
		f.add(button5,BorderLayout.CENTER);
        f.setSize(300,400);
		f.setVisible(true);
	}
	public static void main(String[] args)
	{
		new Border();
	}
}
