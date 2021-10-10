/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javasimplenotepad;

import javax.swing.JOptionPane;

/**
 *
 * @author thinkpad
 */
public class FunctionHelpMenu {

    protected void showAbout() {
        String about = "A simple notepad with Java GUI.\n"
                + "\n"
                + "\n"
                + "My Github : oktavianoandy\n"
                + "Created with ❤ by Oktaviano Andy Suryadi.";
        JOptionPane.showMessageDialog(null, about);
    }
}
