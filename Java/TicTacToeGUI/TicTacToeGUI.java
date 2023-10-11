import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class TicTacToeGUI extends JFrame {
    private JButton[][] buttons;
    private char currentPlayer;
    private boolean gameWon;

    public TicTacToeGUI() {
        buttons = new JButton[3][3];
        currentPlayer = 'X';
        gameWon = false;

        setTitle("Tic-Tac-Toe");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new GridLayout(3, 3));

        initializeButtons();
        addButtonsToFrame();

        pack();
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private void initializeButtons() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                buttons[i][j] = new JButton("");
                buttons[i][j].setFont(new Font("Arial", Font.PLAIN, 72));
                buttons[i][j].setFocusPainted(false);

                final int row = i;
                final int col = j;
                buttons[i][j].addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        if (!gameWon && buttons[row][col].getText().equals("")) {
                            buttons[row][col].setText(Character.toString(currentPlayer));
                            buttons[row][col].setEnabled(false);
                            if (checkWin(row, col)) {
                                gameWon = true;
                                showWinner();
                            } else if (isBoardFull()) {
                                gameWon = true;
                                showDraw();
                            } else {
                                currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
                            }
                        }
                    }
                });
            }
        }
    }

    private void addButtonsToFrame() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                add(buttons[i][j]);
            }
        }
    }

    private boolean checkWin(int row, int col) {
        return (checkRow(row) || checkColumn(col) || checkDiagonals(row, col));
    }

    private boolean checkRow(int row) {
        return (buttons[row][0].getText().equals(buttons[row][1].getText()) && buttons[row][0].getText().equals(buttons[row][2].getText()));
    }

    private boolean checkColumn(int col) {
        return (buttons[0][col].getText().equals(buttons[1][col].getText()) && buttons[0][col].getText().equals(buttons[2][col].getText()));
    }

    private boolean checkDiagonals(int row, int col) {
        return (row == col && checkMainDiagonal()) || (row + col == 2 && checkAntiDiagonal());
    }

    private boolean checkMainDiagonal() {
        return (buttons[0][0].getText().equals(buttons[1][1].getText()) && buttons[0][0].getText().equals(buttons[2][2].getText()));
    }

    private boolean checkAntiDiagonal() {
        return (buttons[0][2].getText().equals(buttons[1][1].getText()) && buttons[0][2].getText().equals(buttons[2][0].getText()));
    }

    private boolean isBoardFull() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (buttons[i][j].getText().equals("")) {
                    return false;
                }
            }
        }
        return true;
    }

    private void showWinner() {
        JOptionPane.showMessageDialog(this, "Player " + currentPlayer + " wins!", "Game Over", JOptionPane.INFORMATION_MESSAGE);
    }

    private void showDraw() {
        JOptionPane.showMessageDialog(this, "It's a draw!", "Game Over", JOptionPane.INFORMATION_MESSAGE);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new TicTacToeGUI());
    }
}
