/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javasimplenotepad;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JTextArea;

/**
 *
 * @author thinkpad
 */
public class FuntionFileMenu {

    private String path = null;
    private String fileName = "Simple Notepad.";

    protected void newFile(JTextArea textArea, JFrame jframe) {
        textArea.setText("");
        path = null;
        fileName = "New File";
        changeAplicationName(jframe);
    }

    protected void doNewFile(JTextArea textArea, JFrame jframe) {
        if (path != null) {
            int result = JOptionPane.showConfirmDialog(null, "Do you want to save changes?", "Creating new file", JOptionPane.YES_NO_OPTION);
            switch (result) {
                case JOptionPane.YES_OPTION:
                    saveFile(textArea, jframe);
                    return;
                case JOptionPane.NO_OPTION:
                    newFile(textArea, jframe);
            }
        } else {
            newFile(textArea, jframe);
        }
    }

    protected void openFile(JTextArea textArea, JFrame jframe) {
        JFileChooser fc = new JFileChooser();
        textArea.setText("");
        int userSelection = fc.showOpenDialog(null);
        if (userSelection == JFileChooser.APPROVE_OPTION) {
            path = fc.getSelectedFile().getPath();
            try {
                String data;
                FileReader fr = new FileReader(path);
                BufferedReader br = new BufferedReader(fr);
                while ((data = br.readLine()) != null){
                    textArea.append(data + "\n");
                }
                br.close();
                fileName = fc.getSelectedFile().getName();
                changeAplicationName(jframe);
            } catch (IOException e) {
                System.out.println(e);
                JOptionPane.showMessageDialog(null, "Open file is failed!");
            }
        }
    }

    protected void doOpen(JTextArea textArea, JFrame jframe) {
        if (path != null) {
            int result = JOptionPane.showConfirmDialog(jframe, "Do you want to save changes?", "Opening file", JOptionPane.YES_NO_OPTION);
            switch (result) {
                case JOptionPane.YES_OPTION:
                    saveFile(textArea, jframe);
                    openFile(textArea, jframe);
                    return;
                case JOptionPane.NO_OPTION:
                    openFile(textArea, jframe);
            }
        } else {
            openFile(textArea, jframe);
        }
    }

    protected void saveFile(JTextArea textArea, JFrame jframe) {
        try {
            FileWriter fw = new FileWriter(path);
            BufferedWriter bw = new BufferedWriter(fw);
            String word = textArea.getText();
            bw.write(word);
            bw.flush();
            bw.close();
            JOptionPane.showMessageDialog(null, "Save success!");
            changeAplicationName(jframe);
        } catch (IOException e) {
            System.out.println(e);
            JOptionPane.showMessageDialog(null, "Save Failed!");
        }
    }

    protected void saveAsFile(JFrame jframe, JTextArea textArea) {
        JFileChooser fc = new JFileChooser();
        fc.setDialogTitle("Specify a file to save");
        int userSelection = fc.showSaveDialog(null);
        if (userSelection == JFileChooser.APPROVE_OPTION) {
            path = fc.getSelectedFile().getPath();
            File fileToSave = fc.getSelectedFile();

            fileName = fc.getSelectedFile().getName();
            changeAplicationName(jframe);

            if (fileToSave.exists()) {
                int result = JOptionPane.showConfirmDialog(null, "The file is already exists, overwrite?", "Existing file", JOptionPane.OK_CANCEL_OPTION);
                switch (result) {
                    case JOptionPane.YES_OPTION:
                        saveFile(textArea, jframe);
                    case JOptionPane.CANCEL_OPTION:
                }
            } else {
                saveFile(textArea, jframe);
            }
        }
    }

    protected void doSave(JTextArea textArea, JFrame jframe) {
        if (path == null) {
            saveAsFile(jframe, textArea);
        } else {
            saveFile(textArea, jframe);
        }
    }

    protected void exit(JFrame jframe, JTextArea textArea) {
        int confirmed = JOptionPane.showConfirmDialog(null,
                "Do you want to save berore exit?", "Exit Program",
                JOptionPane.YES_NO_OPTION);

        if (confirmed == JOptionPane.YES_OPTION) {
            doSave(textArea, jframe);
            jframe.dispose();
        } else {
            jframe.dispose();
        }
    }

    protected void exitWindoListener(JFrame jframe, JTextArea textArea) {
        jframe.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                exit(jframe, textArea);
            }
        });
    }

    protected void changeAplicationName(JFrame jframe) {
        jframe.setTitle(fileName + " - Simple Notepad");
    }
}
