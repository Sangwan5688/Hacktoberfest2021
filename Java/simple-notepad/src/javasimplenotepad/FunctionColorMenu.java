/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javasimplenotepad;

import java.awt.Color;
import javax.swing.JTextArea;

/**
 *
 * @author thinkpad
 */
public class FunctionColorMenu {
    
    protected void changeThemeToLight(JTextArea textArea ){
        textArea.setBackground(Color.WHITE);
        textArea.setForeground(Color.BLACK);
        textArea.setCaretColor(Color.BLACK);
    }
    
    protected void changeThemeToDark(JTextArea textArea){
        textArea.setBackground(Color.DARK_GRAY);
        textArea.setForeground(Color.WHITE);
        textArea.setCaretColor(Color.WHITE);
    }
}
