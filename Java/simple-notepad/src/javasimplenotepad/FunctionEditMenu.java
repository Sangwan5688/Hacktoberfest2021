/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javasimplenotepad;

import javax.swing.JTextArea;
import javax.swing.event.UndoableEditEvent;
import javax.swing.event.UndoableEditListener;
import javax.swing.undo.UndoManager;

/**
 *
 * @author thinkpad
 */
public class FunctionEditMenu {
    
    private UndoManager um = new UndoManager();
    
    protected void undoRedoTextAreaListener(JTextArea textArea) {
        textArea.getDocument().addUndoableEditListener(new UndoableEditListener() {
            @Override
            public void undoableEditHappened(UndoableEditEvent e) {
                um.addEdit(e.getEdit());
            }
        });
    }
    
    protected void undo() {
        if (um.canUndo()) {
            um.undo();
        }
    }
    
    protected void redo() {
        if (um.canRedo()) {
            um.redo();
        }
    }
    
    protected void copy(JTextArea textArea){
        textArea.copy();
    }
    
    protected void cut(JTextArea textArea){
        textArea.cut();
    }
    
    protected void paste(JTextArea textArea){
        textArea.paste();
    }
}
