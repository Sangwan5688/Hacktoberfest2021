/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javasimplenotepad;

import javax.swing.JMenuItem;
import javax.swing.JTextArea;

/**
 *
 * @author thinkpad
 */
public class FunctionFormatMenu {

    private boolean lineWrap = false;

    protected void changeWordWrapStatus(JMenuItem menuItem, JTextArea textArea) {
        if (lineWrap == false) {
            menuItem.setText("Word Wrap : enabled");
            textArea.setLineWrap(true);
            lineWrap = true;
        } else {
            menuItem.setText("Word Wrap : disabled");
            textArea.setLineWrap(false);
            lineWrap = false;
        }
    }
}
