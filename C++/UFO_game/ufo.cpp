#include <iostream>
#include "ufo_functions.hpp"
#include <string>

int main() {
  
greet();

std::string codeword = "carlitos";
std::string answer = "________";
int misses = 0;
std::vector<char> incorrect;
bool guess = false;
char letter;

  while(answer != codeword && misses < 7){

    display_misses(misses);
    display_status(incorrect, answer);

    std::cout << "\n\n> Ingrese una letra por favor: ";
    std::cin >> letter;

    for (int i = 0; i < codeword.length(); i++) {

    	if (letter == codeword[i]) {

    		answer[i] = letter;
    		guess = true;
    	}
    }

    if (guess) {

    	std::cout << "\n\n\n\n\n\n> ¡Correcto! Ya estás más cerca de descifrar la palabra clave.\n";
    }

    else {

    	std::cout << "\n\n\n\n\n\n> ¡Incorrecto! El rayo tractor empuja a la persona más adentro.\n";
    	incorrect.push_back(letter);
    	misses++;
    }
    
    guess = false;
    
  }
  
  end_game(answer, codeword);
  
}
