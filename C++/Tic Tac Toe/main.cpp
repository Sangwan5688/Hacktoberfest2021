#include <iostream>
#include <vector>
#include <string>
using namespace std;

class TicTacToe
{
public:
    string player1Name;
    string player2Name;

    TicTacToe() : player(1), position(0)
    {
        initializeBoard();
    }

    void playGame()
    {
        getPlayerNames();
        starter();
        while (!isGameOver())
        {
            setPlayerMove();
            updateBoard();
            changePlayer();
            drawBoard();
        }
        endGame();
    }

private:
    vector<string> board;
    int player;
    int position;

    void initializeBoard()
    {
        board = {" ", " ", " ", " ", " ", " ", " ", " ", " "};
    }

    void getPlayerNames()
    {
        cout << "Enter Player 1's name: ";
        cin >> player1Name;
        cout << "Enter Player 2's name: ";
        cin >> player2Name;
    }

    void starter()
    {
        cout << "Press [Enter] to start: ";
        getchar(); // haults the screen
        cout << endl;

        cout << endl;
        cout << "***********" << endl;
        cout << "TIC TAC TOE" << endl;
        cout << "***********" << endl;

        cout << player1Name<<" -> X" << endl;
        cout << player2Name<<" -> O" << endl;
        cout << endl;
        cout << "The 3x3 grid is shown below:" << endl;
        cout << endl;

        cout << "     |     |     " << endl;
        cout << "  1  |  2  |  3  " << endl;
        cout << "_____|_____|_____" << endl;
        cout << "     |     |     " << endl;
        cout << "  4  |  5  |  6  " << endl;
        cout << "_____|_____|_____" << endl;
        cout << "     |     |     " << endl;
        cout << "  7  |  8  |  9  " << endl;
        cout << "     |     |     " << endl;
        cout << endl;
    }

    bool isWinner()
    {
        bool winner = false;
        // checking the rows
        if ((board[0] == board[1]) && (board[1] == board[2]) && board[0] != " ")
        {
            winner = true;
        }
        else if ((board[3] == board[4]) && (board[4] == board[5]) && board[3] != " ")
        {
            winner = true;
        }

        else if ((board[6] == board[7]) && (board[7] == board[8]) && board[6] != " ")
        {
            winner = true;
        }

        // checking the columns

        else if ((board[0] == board[3]) && (board[3] == board[6]) && board[0] != " ")
        {
            winner = true;
        }

        else if ((board[1] == board[4]) && (board[4] == board[7]) && board[1] != " ")
        {
            winner = true;
        }

        else if ((board[2] == board[5]) && (board[5] == board[8]) && board[2] != " ")
        {
            winner = true;
        }

        // checking the diagonals

        else if ((board[0] == board[4]) && (board[4] == board[8]) && board[0] != " ")
        {
            winner = true;
        }

        else if ((board[2] == board[4]) && (board[4] == board[6]) && board[2] != " ")
        {
            winner = true;
        }

        return winner;
    }

    bool filledUp()
    {
        bool filled = true;

        for (int i = 0; i < 9; i++)
        {
            if (board[i] == " ")
            {
                filled = false;
            }
        }

        return filled;
    }

    void drawBoard()
    {
        cout << "     |     |      \n";
        cout << "  " << board[0] << "  |  " << board[1] << "  |  " << board[2] << "\n";
        cout << "_____|_____|_____ \n";
        cout << "     |     |      \n";
        cout << "  " << board[3] << "  |  " << board[4] << "  |  " << board[5] << "\n";
        cout << "_____|_____|_____ \n";
        cout << "  " << board[6] << "  |  " << board[7] << "  |  " << board[8] << "\n";
        cout << "     |     |      \n";
        cout << "\n";
    }

    void setPlayerMove()
    {
        cout << "Player " << player << "'s turn (Enter: 1-9) "; // 1-9 (Enter: (1-9))
        while (!(cin >> position))
        {
            cout << "Please enter a valid number between (1-9) " << endl;
            cin.clear(); // flushing the buffer
            cin.ignore();
        }
        cout << endl;

        while (board[position - 1] != " ")
        {
            cout << "Oops, that position is already filled\nTry again\n";
            cout << "Player " << player << "'s Turn (Enter 1-9): ";
            cin >> position;
            cout << "\n";
        }
    }

    void updateBoard()
    {
        if (player % 2 == 1)
        {
            board[position - 1] = "X"; // 1-9        0-8
        }
        else
        {
            board[position - 1] = "O";
        }
    }

    void changePlayer()
    {
        if (player == 1)
        {
            player++;
        }
        else
        {
            player--;
        }
    }

    bool isGameOver()
    {
        return isWinner() || filledUp();
    }

    void endGame()
    {
        if (isWinner())
        {
            string winnerName = (player == 1) ? player1Name : player2Name;
            cout << "Congratulations, " << winnerName << "! You have won!" << endl;
        }
        else if (filledUp())
        {
            cout << "It's a tie!" << endl;
        }
    }
};

int main()
{
    TicTacToe game;
    game.playGame();
    return 0;
}
