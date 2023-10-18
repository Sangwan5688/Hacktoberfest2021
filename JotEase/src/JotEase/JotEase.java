package JotEase;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.filechooser.*;
import java.io.*;

public class JotEase extends JFrame implements ActionListener {
    JTextArea textArea;
    String text;

    JotEase(){
        setTitle("Note");

//        Sets Logo
        ImageIcon JotEaseLogo = new ImageIcon(ClassLoader.getSystemResource("JotEase/icons/notepad.png"));
        Image logo = JotEaseLogo.getImage();
        setIconImage(logo);

//         creating a menu bar
        JMenuBar menubar = new JMenuBar();
        menubar.setBackground(Color.WHITE);


//         creating a File Menu
        JMenu file = new JMenu("File");
        file.setFont(new Font("AERIAl",Font.PLAIN,14));

//         Creating File menu items and mnemonics
        JMenuItem newDoc = new JMenuItem("New");
        newDoc.addActionListener(this);
        newDoc.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_N, InputEvent.CTRL_DOWN_MASK));

        JMenuItem openDoc = new JMenuItem("Open");
        openDoc.addActionListener(this);
        openDoc.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_O, InputEvent.CTRL_DOWN_MASK));

        JMenuItem saveDoc = new JMenuItem("Save");
        saveDoc.addActionListener(this);
        saveDoc.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_S, InputEvent.CTRL_DOWN_MASK));

        JMenuItem printDoc = new JMenuItem("Print");
        printDoc.addActionListener(this);
        printDoc.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_P, InputEvent.CTRL_DOWN_MASK));

        JMenuItem exit = new JMenuItem("Exit");
        exit.addActionListener(this);
        exit.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE, InputEvent.CTRL_DOWN_MASK));

        //Appending menu items to file menu
        file.add(newDoc);
        file.add(openDoc);
        file.add(saveDoc);
        file.add(printDoc);
        file.add(exit);


//         Creating Edit menu
        JMenu edit = new JMenu("Edit");
//        edit.addActionListener(this);
        edit.setFont(new Font("AERIAl",Font.PLAIN,14));

//         Creating Edit menu items and mnemonics
        JMenuItem copy= new JMenuItem("Copy");
        copy.addActionListener(this);
        copy.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_C, InputEvent.CTRL_DOWN_MASK));

        JMenuItem paste = new JMenuItem("Paste");
        paste.addActionListener(this);
        paste.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_V, InputEvent.CTRL_DOWN_MASK));

        JMenuItem cut = new JMenuItem("Cut");
        cut.addActionListener(this);
        cut.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_X, InputEvent.CTRL_DOWN_MASK));

        JMenuItem selectAll = new JMenuItem("Select All");
        selectAll.addActionListener(this);
        selectAll.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_A, InputEvent.CTRL_DOWN_MASK));

//        Appending menu items to edit menu
        edit.add(copy);
        edit.add(paste);
        edit.add(cut);
        edit.add(selectAll);


//         Creating Help menu
        JMenu help = new JMenu("Help");
        help.setFont(new Font("AERIAl",Font.PLAIN,14));

//         Creating Edit menu items and mnemonics
        JMenuItem about= new JMenuItem("About JotEase");
        about.addActionListener(this);
        about.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_H, InputEvent.CTRL_DOWN_MASK));

//        Appending menu items to edit menu
        help.add(about);


//         Appending menus to the menu bar
        menubar.add(file);
        menubar.add(edit);
        menubar.add(help);

//      Add menubar to the screen
        setJMenuBar(menubar);

//         Creating a text area
        textArea = new JTextArea();
        textArea.setFont(new Font("SAN_SERIF", Font.PLAIN, 18));

//        Wrap lines and words
        textArea.setLineWrap(true);
        textArea.setWrapStyleWord(true);

//        Creating a scroll bar
        JScrollPane pane = new JScrollPane(textArea);
        pane.setBorder(BorderFactory.createEmptyBorder());
        add(pane);

        setExtendedState(JFrame.MAXIMIZED_BOTH);// Open window in full-screen
        setVisible(true);
    }

//    Adding Events to listeners
    @Override
    public void actionPerformed(ActionEvent actionEvent){
//        Check for the events
        if(actionEvent.getActionCommand().equals("New")){
            textArea.setText("");
        } else if (actionEvent.getActionCommand().equals("Open")) {
//          Opening a File
//          Use File Chooser and add restrictions
            JFileChooser chooser = new JFileChooser();
            chooser.setAcceptAllFileFilterUsed(false);
            FileNameExtensionFilter restric = new FileNameExtensionFilter("Text Documents","txt");
            chooser.addChoosableFileFilter(restric);

//          Open the file selection window
            int action = chooser.showOpenDialog(this);
//          If the user cancels the process get out
            if (action != JFileChooser.APPROVE_OPTION){
                return;
            }

//          Select the file and read it with BufferedReader
//          and fill the text area with the file contents.
            File file = chooser.getSelectedFile();
            try {
                BufferedReader reader=new BufferedReader(new FileReader(file));
                textArea.read(reader,null);
            }catch (Exception err){
                err.printStackTrace();
            }
        } else if (actionEvent.getActionCommand().equals("Save")) {
//            Saving a File
            JFileChooser saveas = new JFileChooser();
//            change the text on button to 'save'
            saveas.setApproveButtonText("Save");

//          Open the file saving window
            int action = saveas.showOpenDialog(this);
//          If the user cancels the process get out
            if (action != JFileChooser.APPROVE_OPTION){
                return;
            }

//            save the file with a name and the extension .txt
            File filename = new File(saveas.getSelectedFile() + ".txt");
            BufferedWriter outFile = null;

//             Using BufferedWriter and FileWriter write into the file
            try {
                outFile = new BufferedWriter(new FileWriter(filename));
                textArea.write(outFile);
            }catch (Exception err){
                err.printStackTrace();
            }
        } else if (actionEvent.getActionCommand().equals("Print")) {
//            Print a File
            try {
                textArea.print();
            }catch (Exception err){
                err.printStackTrace();
            }
        } else if (actionEvent.getActionCommand().equals("Exit")) {
//            Exit the App
            System.exit(0);
        } else if (actionEvent.getActionCommand().equals("Copy")) {
           text = textArea.getSelectedText();
        } else if(actionEvent.getActionCommand().equals("Paste")){
            textArea.insert(text,textArea.getCaretPosition());
        } else if (actionEvent.getActionCommand().equals("Cut")) {
            text = textArea.getSelectedText();
            textArea.replaceRange("",textArea.getSelectionStart(),textArea.getSelectionEnd());
        } else if (actionEvent.getActionCommand().equals("Select All")) {
            textArea.selectAll();
        } else if (actionEvent.getActionCommand().equals("About JotEase")) {
            new About().setVisible(true);
        }
    }

    public static void main(String[] args) {

        new JotEase();

    }
}
