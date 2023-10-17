import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

let historyTable = []; //creation du tableau d'historique (Q/R)

function Button({ answers }) {// on a mis la props answers (tableau de réponse) en paramètres de la fonction Button

    function historyID(id, savedQuestion, savedAnswer) {          //Fonction pour créer l'objet Q/R histroique avec un ID unique (pour le bien REACT ;D)
        this.id = id;
        this.savedQuestion = savedQuestion;
        this.savedAnswer = savedAnswer;
    }

   
    let [question, setQuestion] = useState("");
    let [savedQuestion, setSavedQuestion] = useState("");
    let [compteur, setCompteur] = useState(0);
    let [savedAnswer, setSavedAnswer] = useState("");

  
    const handleRandom = () => { //fonction au click "soumettre"
        const updatedRandom = Math.floor(Math.random() * 14); //génètre un nombre aléatoire 
        const updatedSavedAnswer = answers[updatedRandom].answer; // lis la réponse dans le tableau selon index du chiffre aléatoire
        const compteurnew = compteur+1 //incrémentation d'un compteur pour ID unique 
      
        //Note : on passe par l'étape ci dessus de stocker dans une variable avant de modifier le state avec cette variable pour régler probleme assynchrone

        setSavedQuestion(question); //modification state de la question
        setSavedAnswer(updatedSavedAnswer); //modification state de la "saved question"
        setCompteur(compteurnew) //modification state compteur

        const newitem = new historyID(compteurnew, question, updatedSavedAnswer) // on appel la fonction pour créer un nouvelle objet en lui passant les attributs fraichement généré
        
        if(historyTable.length > 5) {      //condition pour limiter la taille du tableau (on vire le plus ancien index )
            historyTable.splice(0, 1);
        }
        historyTable.push(newitem) // on push le nouvel objet créé (qui contient Q/R) dans le tableau historyTable

        setQuestion("") // on remet l'input (saisie text area) à texte vide
        

    }

    const handleChange = event => {       //fonction récupère le contenu de l'input de saisie dès que on tape un truc dedans ("on change") ==> Note : pourrais désormais être couplé directement dans le on click du boutton soumettre 
        setQuestion(event.target.value); 
    }

    // On appelle la fonction Random au click et la valeur de notre state prend ra valeur retournée par la fonction Randometurn 
    return (
        <>
        <h1>WCS Magic 8 Ball </h1>
        <div className="game">
                     
            <div className="buttonComponent">
                
                {/*  ci dessous la zone de saisie texte et button submit */}
                <div className="submit">    
                    <input onChange={handleChange} name="myInput" value={question} />  
                    <button onClick={handleRandom}> SOUMETTRE </button>
                    
                </div>
                <div className='firstAnswer animationImg'> {/*  l'image de la boule est contenu dans le css du FirstAnswer */}
                    <p>Question : {savedQuestion}</p>
                    <p>Réponse : {savedAnswer}</p>
                    
                </div>
            </div>
            <div className="historyTable"> {/* zone pour l'historique */}
                <h1>Historique des questions posées :</h1>
                <div className="h1boxHalfWidth"></div> {/*  pour gérer la barre de séparation */}
                <div className="table">
                    {historyTable.map((element) => { {/*  on vient lire le tableau historique pour ensuite le display à l'écran */}
                        return (<div className="QR" key={element.id}>
                            <p id="Q">Q : {element.savedQuestion}</p>
                            <p id="R">R : {element.savedAnswer}</p>
                            <div className="boxHalfWidth"></div> {/*  pour gérer la barre de séparation */}
                        </div>
                        )})
                     }
                     
                </div>

            </div>
        </div>
        </>
    )
}

export default Button;