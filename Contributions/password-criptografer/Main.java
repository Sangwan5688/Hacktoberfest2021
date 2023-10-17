import java.util.*;
import java.text.Normalizer;
import java.util.regex.Pattern;
/**
 * Escreva uma descrição da classe Main aqui.
 * 
 * @author (seu nome) 
 * @version (um número da versão ou uma data)
 */
public class Main
{
    public static void main (String[] args){
        Scanner teclado = new Scanner(System.in);
        
        String palavra = new String();
        
        System.out.println("\f");   
        System.out.println("Escolha entre [1] criptografar ou [2] descriptografar");
        int escolha = 99;
        escolha = verifica_se_o_numero_e_inteiro();
        
        
        boolean escolha_invalida = verifica_escolha(escolha);
        
        while (escolha_invalida) { 
            System.out.println("Opcao escolhida invalida");
            System.out.println("Escolha entre [1] criptografar ou [2] descriptografar");
            escolha = verifica_se_o_numero_e_inteiro();
            escolha_invalida = verifica_escolha(escolha);
        }
        
        if (escolha == 1) {
           System.out.println("Digite uma palavra para CRIPTOGRAFAR:");
           
           palavra = continua_pedindo_ate_nao_ter_acento();
           
           System.out.println("A palavra criptografada ficou:");
           System.out.println(criptografar(palavra)); 
        }
        
        if (escolha == 2) {
           System.out.println("Digite uma palavra para DESCRIPTOGRAFAR:");
           
           palavra = continua_pedindo_ate_nao_ter_acento();
           
           System.out.println("A palavra descriptografada e:");
           System.out.println(descriptografar(palavra)); 
        }
        
        
    }
    
    public static int verifica_se_o_numero_e_inteiro() {
        Scanner teclado99 = new Scanner(System.in);
        int escolha_escopo = 99;
        try {
            escolha_escopo = teclado99.nextInt();   
        } catch (java.util.InputMismatchException e) {
            while (!(teclado99.hasNextInt())) {
            System.out.println("Erro: digite um numero inteiro");
            System.out.println("Escolha entre [1] criptografar ou [2] descriptografar");
            teclado99.nextLine();

        }
        escolha_escopo = teclado99.nextInt();
        } finally {
            return escolha_escopo;
        }
    }
    
    public static String continua_pedindo_ate_nao_ter_acento() {
        Scanner teclado4 = new Scanner (System.in);
        String palavra_enviada = teclado4.nextLine();
        while (temAcento(palavra_enviada)) {
            System.out.println("Digite uma frase que nao contenha acentos:");
            palavra_enviada = teclado4.nextLine();
        }
        
        return palavra_enviada;
    }
    
    public static boolean temAcento(String texto) {
        String textoSemAcentos = Normalizer.normalize(texto, Normalizer.Form.NFD);
        Pattern padrao = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String frase_sem_acento = padrao.matcher(textoSemAcentos).replaceAll("");
        boolean temAcento = !texto.equals(frase_sem_acento);
        return temAcento;
    }
    
    public static boolean verifica_escolha (int esc) {
        if ((esc == 1) || (esc == 2)) {
            return false;
        }
        return true;
    }
    
    public static int pede_escolha() {
        Scanner teclado3 = new Scanner (System.in);
        int escolha = teclado3.nextInt();
        return escolha;
    }
    
    public static String criptografar(String palavra) {
        palavra = palavra.toLowerCase();
        String palavra_invertida = stringReverse(palavra);
        String palavra_criptografada = criptografiaInversa(palavra_invertida);
        
        return palavra_criptografada;
        
    }
    
    public static String descriptografar(String palavra) {
        palavra = palavra.toLowerCase();
        String palavra_descriptografada = decriptografiaInversa(palavra);
        String palavra_desinvertida = stringReverse(palavra_descriptografada);
        
        return palavra_desinvertida;
    }
    
    public static String stringReverse(String palavra) {
        char[] letras = palavra.toCharArray();
        int i = letras.length - 1, j = 0;
        char[] let = new char[letras.length];
        
        while(i >= 0){
             let[j] = letras[i];
             i--;
             j++;
        }
        
        String fraseRev = new String();
        
        for (char c : let){
             fraseRev = fraseRev + c;
        }
        
        return fraseRev;
    }
    
    public static String criptografiaInversa(String fraseRev) {
       char[] letrasRev = fraseRev.toCharArray();
       char[] letCrip = new char[letrasRev.length];
       
       for(int i = 0; i <= letrasRev.length-1; i++){
           if(Character.isSpaceChar(letrasRev[i]) == true){
               letCrip[i] = ' ';
           }else{
               switch(letrasRev[i]){
                    case 'a': letCrip[i] = '!'; break;
                    case 'e': letCrip[i] = '@';break;
                    case 'i': letCrip[i] = '#'; break;
                    case 'o': letCrip[i] = '$'; break;
                    case 'u': letCrip[i] = '%'; break;
                        
                    case 'b': letCrip[i] = 'e'; break;
                    case 'c': letCrip[i] = 'f'; break;
                    case 'd': letCrip[i] = 'g'; break;
                    case 'f': letCrip[i] = 'i'; break;
                    case 'g': letCrip[i] = 'j'; break;
                    case 'h': letCrip[i] = 'k'; break;
                    case 'j': letCrip[i] = 'm'; break;
                    case 'k': letCrip[i] = 'n'; break;
                    case 'l': letCrip[i] = 'o'; break;
                    case 'm': letCrip[i] = 'p'; break;
                    case 'n': letCrip[i] = 'q'; break;
                    case 'p': letCrip[i] = 's'; break;
                    case 'q': letCrip[i] = 't'; break;
                    case 'r': letCrip[i] = 'u'; break;
                    case 's': letCrip[i] = 'v'; break;
                    case 't': letCrip[i] = 'w'; break;
                    case 'v': letCrip[i] = 'y'; break;
                    case 'w': letCrip[i] = 'z'; break;
                    case 'x': letCrip[i] = 'a'; break;
                    case 'y': letCrip[i] = 'b'; break;
                    case 'z': letCrip[i] = 'c'; break;
                    
                    case ',': letCrip[i] = ';'; break;
                    
                    
               }
           }
       }
       
       String fraseCrip = new String();
       
       for(char c : letCrip){
           fraseCrip = fraseCrip + c;
        }
       return fraseCrip;
    }
    
    
    public static String decriptografiaInversa(String fraseRev) {
       char[] letrasRev = fraseRev.toCharArray();
       char[] letCrip = new char[letrasRev.length];
       
       for(int i = 0; i <= letrasRev.length-1; i++){
           if(Character.isSpaceChar(letrasRev[i]) == true){
               letCrip[i] = ' ';
           }else{
               switch(letrasRev[i]){
                    case '!': letCrip[i] = 'a'; break;
                    case '@': letCrip[i] = 'e';break;
                    case '#': letCrip[i] = 'i'; break;
                    case '$': letCrip[i] = 'o'; break;
                    case '%': letCrip[i] = 'u'; break;
                        
                    case 'e': letCrip[i] = 'b'; break;
                    case 'f': letCrip[i] = 'c'; break;
                    case 'g': letCrip[i] = 'd'; break;
                    case 'i': letCrip[i] = 'f'; break;
                    case 'j': letCrip[i] = 'g'; break;
                    case 'k': letCrip[i] = 'h'; break;
                    case 'm': letCrip[i] = 'j'; break;
                    case 'n': letCrip[i] = 'k'; break;
                    case 'o': letCrip[i] = 'l'; break;
                    case 'p': letCrip[i] = 'm'; break;
                    case 'q': letCrip[i] = 'n'; break;
                    case 's': letCrip[i] = 'p'; break;
                    case 't': letCrip[i] = 'q'; break;
                    case 'u': letCrip[i] = 'r'; break;
                    case 'v': letCrip[i] = 's'; break;
                    case 'w': letCrip[i] = 't'; break;
                    case 'y': letCrip[i] = 'v'; break;
                    case 'z': letCrip[i] = 'w'; break;
                    case 'a': letCrip[i] = 'x'; break;
                    case 'b': letCrip[i] = 'y'; break;
                    case 'c': letCrip[i] = 'z'; break;
                    
                    case ';': letCrip[i] = ','; break;
                    
                    
               }
           }
       }
       
       String fraseCrip = new String();
       
       for(char c : letCrip){
           fraseCrip = fraseCrip + c;
        }
       return fraseCrip;
    }
    
    
}
