package com.example.tictactoe;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class GameDisplay extends AppCompatActivity {
    private TicTacToeBoard ticTacToeBoard;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.game_display);

        Button playAgainBTN = findViewById(R.id.play_again);
        Button homeBTN =findViewById(R.id.home_button);
        TextView playerTurn = findViewById(R.id.player_display);
        playAgainBTN.setVisibility(View.GONE);
        homeBTN.setVisibility(View.GONE);
        String[] playerNames = getIntent().getStringArrayExtra("PLAYER_NAMES");
        if (playerNames != null){
            playerTurn.setText(playerNames[0]+" 's Turn");
        }

        ticTacToeBoard = findViewById(R.id.ticTacToeBoard);
        ticTacToeBoard.setUpGame(playAgainBTN,homeBTN,playerTurn,playerNames);
    }
    public void playAgainButtonClick(View view){
        //executes after the tic-toc toe board have been constructed
        ticTacToeBoard.resetGame();
        ticTacToeBoard.invalidate();
    }
    public void homeButtonClick(View view){
        Intent intent = new Intent(this,MainActivity.class);
        startActivity(intent);
    }

}