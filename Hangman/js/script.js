// Array de palabras
let posiblesPalabras = [
  ["amarillo", "Un color"],
  ["atlantico", "Un océano"],
  ["ordenador", "Una gran herramienta  ;)"],
  ["laurel", "Un árbol"],
  ["plaza", "Espacio público"],
  ["avenida", "Espacio público"],
  ["calle", "Espacio público"],
  ["desarrolador", "Una profesión"],
  ["rueda", "Gran invento"],
  ["cereza", "Una fruta"],
  ["petanca", "Un juego"],
  ["pintor", "Una profesión"],
  ["naranjo", "Un árbol"],
  ["higuera", "Un árbol"],
  ["everest", "Un monte"],
  ["relampago", "Antecede al trueno"],
  ["jirafa", "Un animal"],
  ["nogal", "Un árbol"],
  ["tigre", "Un animal"],
  ["elefante", "Un animal"],
  ["mosquito", "Un insecto"],
  ["caballo", "Un animal"],
  ["rinoceronte", "Un animal"],
  ["portugal", "Un país"],
  ["españa", "Un país"],
  ["noruega", "Un país"],
  ["italia", "Un país"],
  ["rusia", "Un país"],
  ["uruguay", "Un país"],
  ["ilustracion", "Representación gráfica"],
  ["tarta", "De la pastelería"],
  ["pepito", "De la pastelería"],
  ["excursion", "Actividad en la naturaleza"],
  ["empanadilla", "De la panadería"],
  ["pastel", "De la pastelería"],
  ["colegio", "Lugar para estudiar"],
  ["carrera", "Competición"],
  ["mermelada", "Confitura"],
];

let abecedario = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];


// Para mostrar el estado de aciertos
let palabra = document.getElementById("palabra");


// Botón para volver a iniciar el juego
let inicio = document.getElementById("inicio");

let botonera = document.getElementById("botonera");
let botones = document.getElementById("botones");
let intentos = document.getElementById("intentos");
let imagen = document.getElementById("imagen");
let pista = document.getElementById("pista");
let clue = document.getElementById("clue");

//********************************************************************************************************************** */
//********************************************************************************************************************** */

//FUNCTIONS

/**
 * function to generate button to choose letter
 */

const generateButtons = () => {
  /* CREATE A FRAGMENT TO STORAGE ALL BUTTON */
  fragmentButtons = document.createDocumentFragment()
  /* FOR EACH TO CREATE A BUTTON FROM ABECEDARIO ARRAY ELEMENTS */
  abecedario.forEach(letter => {
    let button = document.createElement('SPAN')
    /* ASSIGN TEXTCONTENT BY ELEMENT ON THE ARRAY */
    button.textContent = letter
    /* ASSIGN DIFERENTS CLASSES */
    button.classList.add('tamanio-botones', 'btn', 'btn-outline-success', 'm-1', 'font-weight-bold')
    /* INSERT BUTTON ELEMENT INTO FRAGEMENTBUTTONS */
    fragmentButtons.appendChild(button)
  });
  /* OUTSIDE FOREACH FUNCTION INSERT FRAGMENTBUTTONS INTO BOTONERA */
  botonera.appendChild(fragmentButtons)
}
/**
 * function to choose randomly word to guess and its clue to help you
 * 
 * @returns string
 */
const chooseWord = () => {
  /* CHOOSE A RANDOM WORD FROM POSIBLESPALABRAS ARRAY  BY MATH.RANDOM FUNCTION*/
  return posiblesPalabras[Math.floor(Math.random() * posiblesPalabras.length)]
}
let choice = chooseWord()
/**
 * function to generate a hidden word made of as many '_' as hidden word has
 * 
 * @param {string} word 
 */
const generateScripts = (word) => {
  let scripts = ''
  /* FOR LOOP TO CREATE SCRIPTS ELEMENT BASED ON WORD LENGTH */
  for (let i = 0; i < word.length; i++) {
    /* SET ITS VALUE AS '-' */
    scripts += '_'
  }
  palabra.textContent = scripts
}
/**
 * function to generate element by calling diferent functions
 */
const generateElements = () => {
  /* FUNCTION TO GENRATE ALL BUTTONS FOR EACH LETTER */
  generateButtons()
  /* FUNCTION TO CREATE SCRIPTS BASED ON CHOICE[0] LENGHT */
  generateScripts(choice[0])

}
/**
 * function to show value pista
 * 
 * @param {string} word 
 */
const setClue = (word) => {
  clue.textContent = word
}
/**
 * function to set letter into scripts value into corresponding iterator
 * 
 * @param {strin} letter letter on click
 * @param {number} i iterator of loop for 
 */
const setLetter = (letter, i) => {
  palabra.textContent = palabra.textContent.substring(0, i) + letter + palabra.textContent.substring(i + 1)

}
/**
 * function to change script values on palabra.children for concurrences of letter on hidden
 * 
 * @param {string} letter 
 * @param {string} hidden 
 */
const changeScripts = (letter, hidden) => {
  letter = letter.toLowerCase()
  hidden = hidden.toLowerCase()
  //hay qu hacer un bucle para cambiar los guiones por la letra cuando coincida en la pasada
  for (let i = 0; i < hidden.length; i++) {
    if (letter == hidden[i])
      setLetter(letter, i)
  }
}
/**
 * function to change hagnman image  dependending of number in intentos
 */
const putImage = () => {
  imagen.src = 'imagenes/ahorcado_' + intentos.textContent + '.png'
}
/**
 * function to decrease value of intentos by one
 */
const decreaseChances = (letter) => {
  if (!letter.classList.contains('wrong'))
    intentos.textContent = parseInt(intentos.textContent) - 1
}
/**
 * function to check way how game ended or it continues
 * 
 * @returns win or lose
 */
const isOver = () => {
  if (!palabra.textContent.includes('_'))
    return 'win'
  if (intentos.textContent == '0')
    return 'lose'
  return 'keepPlaying'
}
/**
 * function to end the game 
 * 
 * @param {string} tipe determinates how game ended
 */
const endGame = (tipe) => {
  botonera.innerHTML = ''
  if (tipe == 'win')
    botonera.textContent = 'HAS GANADO LA PALABRA ES CORRECTA'
  else
    botonera.textContent = 'HAS PERDIDO LA PALABRA ERA ' + choice[0].toUpperCase()
}

/**
 * function to end game or not depending parameters value
 * 
 * @param {string} tipe 
 */

const gameOver = (tipe) => {
  if (tipe != 'keepPlaying')
    endGame(tipe)
}

/**
 * function to check if letter given as parameter is on hidden by using function some()
 * 
 * @param {string} letter 
 * @param {string} hidden 
 * @returns true or false
 */
const isOnHidden = (letter, hidden) => {
  return Array.from(hidden).some((element) => element == letter.toLowerCase())
}
/**
 * function to check letter on click and calling diferents function to process
 * 
 * @param {event} event 
 */
const checkLetter = (event) => {
  e = event.target
  /* CEHCK TARGET IS OR NOT A SPAN TAG */
  if (e.tagName == 'SPAN') {
    /* FUNCTION TO VERIFY IS TARGET LETTER IS ON HIDDEN */
    if (isOnHidden(e.textContent, choice[0])) {
      changeScripts(e.textContent, choice[0])
      e.classList.add('success')
    } else {
      decreaseChances(e)
      putImage()
      e.classList.add('wrong')
    }
  }
  gameOver(isOver())

}

/**
 * function to check which button is on click
 * 
 * @param {event} event 
 */
const checkButton = (event) => {
  const e = event.target
  if (e.id == 'inicio')
    location.reload()
  else if (e.id == 'pista')
    setClue(choice[1])
}

//***************************************************************************************************************************************** */ 
//***************************************************************************************************************************************** */ 

/* EVENTS */

/* EVENT WHEN PAGE LOADS */

document.addEventListener('DOMContentLoaded', generateElements)

/* EVENT WHEN CLICK ON LETTER */

botonera.addEventListener('click', checkLetter)

/* EVENT TO CLICK ON BUTTONS */

botones.addEventListener('click', checkButton)