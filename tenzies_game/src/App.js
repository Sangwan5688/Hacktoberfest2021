import React from "react"
import Die from "./components/Die"
import "./style.css"
import {nanoid} from "nanoid"  //nanoid npm package doesn't need installation--this package is for key solution
import Confetti from 'react-confetti'   //this npm package is related to celebration 
import dice1Images from "./images/1.png"
import dice2Images from "./images/2.png"
import dice3Images from "./images/3.png"
import dice4Images from "./images/4.png"
import dice5Images from "./images/5.png"
import dice6Images from "./images/6.png"

const newImage=[]
newImage.push(dice1Images)
newImage.push(dice2Images)
newImage.push(dice3Images)
newImage.push(dice4Images)
newImage.push(dice5Images)
newImage.push(dice6Images)

let interval;

export default function App() {
    //before local storage for saving dices values: 
    const [dice, setDice] = React.useState(allNewDice())
    //after local storage for saving dices values
    // const [dice, setDice] = React.useState(()=> JSON.parse(localStorage.getItem("dice"))|| allNewDice())
    // React.useEffect(()=>{
    //     localStorage.setItem("dice", JSON.stringify(dice))
    // },[dice])

    const [tenzies, setTenzies] = React.useState(false)   //tensiez is set for win/lose
    // const [timer,setTimer] = React.useState(25)   //timer state before local
    // const [intervalId, setIntervalId] = React.useState(null)
    const [timer,setTimer] = React.useState(()=> JSON.parse(localStorage.getItem("timer"))||25) 

    React.useEffect(()=>{
        localStorage.setItem("timer", JSON.stringify(timer))
    },[timer])

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

    function generateNewDie() {
        return {
            // for random numbers line below
            // value: Math.ceil(Math.random() * 6),
            // for random image line below
            value: Math.floor(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
 
    function rollDice() {
      
        if(!tenzies){       //doing the game--if you don't win yet and timer !==0
            if(timer !== 0){    
                setDice(oldDice => oldDice.map(die => {
                    return die.isHeld ? 
                        die :                   //for green buttons--keep the dies as they are
                        generateNewDie()        //for white buttons
                }))
            }
            // lose the game--if you don't win and timer===0
            else{   
                console.log("new game1")
                setDice(allNewDice())
                setTenzies(false)
                setTimer(25)  
               
            }
           
        }

        // else if(tenzies && timer !==0){           //if you win but time is not up
            
        //     interval && clearInterval(timer)
        //       clearInterval(timer); 
        //       console.log("stop the timer")    
        // }

        // else if(tenzies === true && timer !==0){
        //     // if(timer !==0){
        //       console.log("new game2")
        //     //   interval && clearInterval(interval)
        //       clearInterval(interval); 
        //       console.log("stop the timer")
        //     // }

        // }
        // else{
        //     console.log("new game3")
        //     setDice(allNewDice())
        //     setTenzies(false)
        //     setTimer(25)
        // }
        

        else{      //if you win and new game button pushed
            console.log("new game2")
            // interval && clearInterval(interval)
            // console.log(interval)
            // interval && clearInterval(interval)
            // clearInterval(timer); 
            setDice(allNewDice())
            setTenzies(false)
            setTimer(25)    //if we win the timer should work again
        }  
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            // value={die.value}
            value={newImage[die.value]}
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    
    React.useEffect(() => {
        // function callTimer(){
            interval =
            timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
            // console.log(interval)
            // setIntervalId(interval)
            return () => {clearInterval(interval)}
        // } 
        }, [timer]);

        // React.useEffect(() => {
        //     callTimer()
        // }, [timer]);


    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
                // onPress={() => callTimer()}
            >
                {/* {timer === null ? setTimer(25) : timer !== null} */}
                {/* {timer === null && setTimer(25)} */}
                {tenzies ? "New Game" : "Roll"}
            </button>
            <h4 >{timer}</h4>
        </main>
    )
}