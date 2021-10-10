/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javasimplenotepad;

import javax.swing.JFrame;

/**
 *
 * @author thinkpad
 */
public class MainClass {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        SimpleNotepad notepad = new SimpleNotepad();
        notepad.setVisible(true);
        notepad.setLocationRelativeTo(null);
    }
    
}
