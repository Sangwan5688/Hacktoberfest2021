import React, { useState,useEffect } from "react";
import moveSound from './assets/move.wav'
import playerMoveSound from './assets/playerMove.mp3';
import diceThrowAudio from './assets/diceThrow.mp3';
import BlinkSound from './assets/BlinkSound.wav';
import gotiOpenSound from './assets/gotiOpen.wav';

const gotiPoints = [
  [
    ["35.5%", "10%"], ["44.5%", "10%"], ["40%", "14%"], ["40%", "19%"]
  ],
  [
    ["62.5%", "20%"], ["67.5%", "26%"], ["62%", "25%"], ["57%", "27%"]
  ],
  [
    ["67.5%", "46%"], ["62%", "52.5%"], ["61.5%", "47%"], ["56%", "45%"]
  ],
  [
    ["35.5%", "64%"], ["43.5%", "64%"], ["39.5%", "60%"], ["39.7%", "55%"]
  ],
  [
    ["11.5%", "46%"], ["16.5%", "53%"], ["17.5%", "47%"], ["23%", "45%"]
  ],
  [
    ["17%", "20%"], ["12.5%", "26.5%"], ["18%", "25%"], ["23%", "27%"]
  ]
]

const points = [
  // 1st row
  "250,250 272,233 252,205 232,222",
  "232,222 252,205 232,177 210,195",
  "210,195 232,177 214,152 192,169",
  "192,169 214,152 195,125 173,140",
  "173,140 195,125 175,95 152,112",
  "152,112 175,95 153,64 130,80",

  // 2nd row
  "153,64 175,50 195,80 175,95",
  "175,95 195,80 216,110 195,125",
  "195,125 216,110 234,137 214,152",
  "214,152 234,137 252,162 232,177",
  "232,177 252,162 273,190 252,205",
  "252,205 273,190 295,218 272,233",

  //3rd row
  "175,50 195,35 218,65 195,80",
  "195,80 218,65 245,90 216,110",
  "216,110 245,90 258,120 234,137",
  "234,137 258,120 278,144 252,162",
  "252,162 278,144 298,173 273,190",
  "273,190 298,173 318,200 295,218",

  //4th row
  "320,200 345,217 363,190 338,173",
  "338,173 363,190 380,165 355,148",
  "355,148 380,165 397,140 370,120",
  "370,120 397,140 418,110 390,90",
  "390,90 418,110 438,82 415,65",
  "415,65 438,82 458,52 435,35",

  //5th row
  "458,52 477,64 457,95 438,82",
  "438,82 457,95 438,124 418,110",
  "418,110 438,124 417,155 397,140",
  "397,140 417,155 400,180 380,165",
  "380,165 400,180 383,205 363,190",
  "363,190 383,205 366,232 345,217",

  //6th row
  "477,64 499,81 480,110 457,95",
  "457,95 480,110 461,139 438,124",
  "438,124 461,139 442,170 417,155",
  "417,155 442,170 425,197 400,180",
  "400,180 425,197 407,222 383,205",
  "383,205 407,222 392,251 366,232",

  //7th row
  "392,251 432,251 432,277.67 392,277.67",
  "432,251 472,251 472,277.67 432,277.67",
  "472,251 512,251 512,277.67 472,277.67",
  "512,251 552,251 552,277.67 512,277.67",
  "552,251 592,251 592,277.67 552,277.67",
  "592,251 630,251 630,277.67 592,277.67",

  //8th row
  "592,277.67 630,277.67 630,304.34 592,304.34",
  "552,277.67 592,277.67 592,304.34 552,304.34",
  "512,277.67 552,277.67 552,304.34 512,304.34",
  "472,277.67 512,277.67 512,304.34 472,304.34",
  "432,277.67 472,277.67 472,304.34 432,304.34",
  "392,277.67 432,277.67 432,304.34 392,304.34",

  //9th row
  "592,304.34 630,304.34 630,330.01 592,330.01",
  "552,304.34 592,304.34 592,330.01 552,330.01",
  "512,304.34 552,304.34 552,330.01 512,330.01",
  "472,304.34 512,304.34 512,330.01 472,330.01",
  "432,304.34 472,304.34 472,330.01 432,330.01",
  "392,304.34 432,304.34 432,330.01 392,330.01",

  //10th row
  "392,330 368,345 387,375 410,360",
  "410,360 387,375 406,405 429,390",
  "429,390 406,405 425,435 448,420",
  "448,420 425,435 445,465 470,448",
  "470,448 445,465 462,490 482,473",
  "482,473 462,490 480,517 500,498",

  //11th row
  "480,517 460,538 438,507 462,490",
  "462,490 438,507 420,480 445,465",
  "445,465 420,480 402,450 425,435",
  "425,435 402,450 383,420 406,405",
  "406,405 383,420 365,390 387,375",
  "387,375 365,390 347,362 368,345",

  //12th row
  "460,538 435,559 413,525 438,507",
  "438,507 413,525 392,497 420,480",
  "420,480 392,497 373,470 402,450",
  "402,450 373,470 352,440 383,420",
  "383,420 352,440 330,413 365,390",
  "365,390 330,413 320,380 347,362",

  //13th row
  "320,380 297,365 280,389 310,410",
  "310,410 280,389 260,418 290,440",
  "290,440 260,418 240,448 270,470",
  "270,470 240,448 220,478 250,500",
  "250,500 220,478 200,508 230,530",
  "230,530 200,507 175,540 195,560",

  //14th row
  "175,540 155,523 177,490 200,507",
  "200,507 177,490 197,463 220,478",
  "220,478 197,463 217,433 240,448",
  "240,448 217,433 237,403 260,418",
  "260,418 237,403 257,376 280,389",
  "280,389 257,376 277,348 297,365",

  //15th row
  "155,523 130,500 150,470 177,490",
  "177,490 150,470 170,440 197,463",
  "197,463 170,440 190,410 217,433",
  "217,433 190,410 210,380 237,403",
  "237,403 210,380 230,355 257,376",
  "257,376 230,355 250,330 277,348",

  //16th row
  "250,330 210,330 210,304.67 250,304.67",
  "210,330 170,330 170,304.67 210,304.67",
  "170,330 130,330 130,304.67 170,304.67",
  "130,330 90,330 90,304.67 130,304.67",
  "90,330 50,330 50,304.67 90,304.67",
  "50,330 10,330 10,304.67 50,304.67",

  //17th row
  "10,304.67 50,304.67 50,278.67 10,278.67",
  "50,304.67 90,304.67 90,278.67 50,278.67",
  "90,304.67 130,304.67 130,278.67 90,278.67",
  "130,304.67 170,304.67 170,278.67 130,278.67",
  "170,304.67 210,304.67 210,278.67 170,278.67",
  "250,304.67 210,304.67 210,278.67 250,278.67",

  //18th row
  "10,278.67 50,278.67 50,250 10,250",
  "50,278.67 90,278.67 90,250 50,250",
  "90,278.67 130,278.67 130,250 90,250",
  "130,278.67 170,278.67 170,250 130,250",
  "170,278.67 210,278.67 210,250 170,250",
  "250,278.67 210,278.67 210,250 250,250",
  
];

const trianglePoints = [
  "195,35 435,35 320,200",
  "390,250 630,250 500,80",
  "500,500 630,330 390,330",
  "195,560 435,560 320,380",
  "10,330 130,500 250,330",
  "10,250 250,250, 130,80"
]

const starPoints = [
  "191,160 186,136 205,150 182,147 197,137",
  "382,120 402,104 401,127 390,108 408,115",
  "530,254 542,273 517,260 544,261 520,273",
  "445,455 441,428 462,450 432,437 455,435",
  "225,475 246,459 245,480 233,463 252,469",
  "98,327 110,308 120,327 96,315 122,315",
];

const gotiMovePoints = [
  //1st
  ["31.5%", "28.6%"],
  ["29%", "25%"],
  ["26.5%", "21.5%"],
  ["24.3%", "18.4%"],
  ["21.8%", "14.8%"],
  ["19.1%", "10.9%"],
  //2nd
  ["21.8%", "9%"],
  ["24.55%", "13%"],
  ["26.85%", "16.4%"],
  ["29.17%", "19.7%"],
  ["31.57%", "23%"],
  ["34.15%", "26.5%"],
  //3rd
  ["24.5%", "7.3%"],
  ["27.25%", "11.2%"],
  ["29.6%", "14.5%"],
  ["31.9%", "17.7%"],
  ["34.4%", "21%"],
  ["36.9%", "24.3%"],
  //4th row
  ["42.8%", "24.4%"],
  ["45%", "21.2%"],
  ["47.2%", "18%"],
  ["49.5%", "14.6%"],
  ["52%", "11%"],
  ["54.6%", "7.3%"],
  //5th row
  ["57.1%", "9.3%"],
  ["54.7%", "12.9%"],
  ["52.15%", "16.6%"],
  ["49.8%", "20%"],
  ["47.65%", "23.2%"],
  ["45.57%", "26.3%"],
  //6th row
  ["59.8%", "10.9%"],
  ["57.37%", "14.6%"],
  ["54.9%", "18.4%"],
  ["52.6%", "21.9%"],
  ["50.4%", "25.1%"],
  ["48.4%", "28.3%"],
  //7th row
  ["51.3%", "33.05%"],
  ["56.3%", "33.05%"],
  ["61.5%", "33.05%"],
  ["66.5%", "33.05%"],
  ["71.5%", "33.05%"],
  ["76.4%", "33.05%"],
  //8th row
  ["76.4%", "36.4%"],
  ["71.5%", "36.4%"],
  ["66.5%", "36.4%"],
  ["61.5%", "36.4%"],
  ["56.3%", "36.4%"],
  ["51.3%", "36.4%"],
  //9th row
  ["76.4%", "39.63%"],
  ["71.5%", "39.63%"],
  ["66.5%", "39.63%"],
  ["61.5%", "39.63%"],
  ["56.3%", "39.63%"],
  ["51.3%", "39.63%"],
  //10th row
  ["48.6%", "44.2%"],
  ["50.9%", "47.8%"],
  ["53.35%", "51.6%"],
  ["55.75%", "55.3%"],
  ["57.97%", "58.7%"],
  ["60.1%", "61.85%"],
  //11th row
  ["57.5%", "64.1%"],
  ["55.2%", "60.7%"],
  ["52.9%", "57.2%"],
  ["50.55%", "53.5%"],
  ["48.15%", "49.7%"],
  ["45.9%", "46.1%"],
  //12th row
  ["54.4%", "66.4%"],
  ["52.1%", "62.7%"],
  ["49.8%", "59.2%"],
  ["47.45%", "55.4%"],
  ["45.1%", "51.7%"],
  ["42.8%", "48.1%"],
  //13th row
  ["37.5%", "48%"],
  ["35.1%", "51.5%"],
  ["32.6%", "55.1%"],
  ["30.1%", "58.8%"],
  ["27.57%", "62.5%"],
  ["24.85%", "66.3%"],
  //14th row
  ["22.12%", "64.33%"],
  ["24.8%", "60.65%"],
  ["27.3%", "57%"],
  ["29.75%", "53.3%"],
  ["32.3%", "49.6%"],
  ["34.7%", "46.2%"],
  //15th row
  ["19.2%", "62%"],
  ["21.8%", "58.3%"],
  ["24.3%", "54.6%"],
  ["26.9%", "51%"],
  ["29.4%", "47.4%"],
  ["31.7%", "44.2%"],
  //16th row
  ["28.8%", "39.64%"],
  ["23.7%", "39.64%"],
  ["18.8%", "39.64%"],
  ["13.8%", "39.64%"],
  ["8.75%", "39.64%"],
  ["3.8%", "39.64%"],
  //17th row
  ["3.8%", "36.45%"],
  ["8.75%", "36.45%"],
  ["13.8%", "36.45%"],
  ["18.8%", "36.45%"],
  ["23.7%", "36.45%"],
  ["28.8%", "36.45%"],
  //18th row
  ["3.8%", "33.1%"],
  ["8.75%", "33.1%"],
  ["13.8%", "33.1%"],
  ["18.8%", "33.1%"],
  ["23.7%", "33.1%"],
  ["28.8%", "33.1%"],
];

const extraGotiMovePoints = [
  [],
  [],
  [],
  [],
  [],
  []
];

const starCellGotiObj = {
  0 : [],
  1 : [],
  2 : [],
  3 : [],
  4 : [],
  5 : []
}

const starCell = [3,21,39,57,75,93];

const diceDots = [
  [["39.67%", "36%"]],
  [
    ["37.5%", "34.5%"],
    ["41.8%", "38%"],
  ],
  [
    ["37.3%", "38.3%"],
    ["39.8%", "36.3%"],
    ["42.3%", "34.3%"],
  ],
  [
    ["37.8%", "34.5%"],
    ["41.75%", "34.5%"],
    ["37.8%", "38%"],
    ["41.75%", "38%"],
  ],
  [
    ["37.8%", "34.5%"],
    ["41.75%", "34.5%"],
    ["39.67%", "36%"],
    ["37.8%", "38%"],
    ["41.75%", "38%"],
  ],
  [
    ["37.3%", "35%"],
    ["39.75%", "35%"],
    ["42.3%", "35%"],
    ["37.3%", "37.5%"],
    ["39.75%", "37.5%"],
    ["42.3%", "37.5%"],
  ],
];

let diceCopy;
let eatPlayer;
const avoidMoveCopy = [6, 24, 42, 60, 78, 96];
const diceExceptionForEat = [7,8,9,10,11,25,26,27,28,29,43,44,45,46,47,61,62,63,64,65,79,80,81,82,83,97,98,99,100,101];
const delMove = [12, 30, 48, 66, 84, 102];
let eatFlag = false;
let eatAnimationFlag = false;
let retainFlag = false;
let afterAutoupdateGotiFlag = false;
let preventDoubleClickMove = false;
let playerGotiState = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
];


const TriangleSVG = () => {
  const [changeId, setChangeId] = useState({});
  const [avoidMove, setAvoidMove] = useState();
  const [dice, setDice] = useState(4);
  const [colorArray, setColorArray] = useState(["red", "green", "orange", "blue", "yellow", "purple"])
  const [currentGoti, setCurrentGoti] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [flag, setFlag] = useState(false);
  const [delGotiFlag, setDelGotiFlag] = useState(false);
  const [animaFlag, setAnimaFlag] = useState(true);
  const [currentDiceMove, setCurrentDiceMove] = useState(6);
  const [showDice, setShowDice]= useState(5);
  const [showDiceFlag, setShowDiceFlag] = useState(false);
  const [checkDicebeforeMove, setCheckDiceBeforeMove] = useState(false);
  const [dice6Flag, setDice6Flag] = useState(false);
  const [intialStageHideDiceFlag, setIntialStatgeHideDiceFlag] = useState(true);
  const [currentPlayerCount, setCurrentPlayerCount] = useState([0,0,0,0,0,0]);
  const [tempChangeId, setTempChangeId] = useState({});
  const [gotiMoveBlinkTimer, setgotiMoveBlinkTimer] = useState(50);
  const [gotiMoveBlinkcounter, setgotiMoveBlinkcounter] = useState(0);
  const [copyChangeId, setCopyChangeId] = useState({});

  let k = null;
  let kk = null;
  let showDiceInterval = null;
  let gotiMoveAnimationInterval = null;
  let gotiEatInterval = null;

  // audio functions
  function playSound(){
    new Audio(moveSound).play();
  }
  function nextPlayerSound(){
    new Audio(playerMoveSound).play();
  }
  function diceThrowSound(){
    new Audio(diceThrowAudio).play();
  }
  function gotiMoveAlertBlinkSound(){
    new Audio(BlinkSound).play();
  }
  function gotiOpenSoundPlay(){
    new Audio(gotiOpenSound).play();
  }


  //checking index based on Color
  function checkIndexColor(colorStr){
    switch (colorStr) {
      case "red":
        return 0;
      case "green":
        return 1;
      case "orange":
        return 2;
      case "blue":
        return 3;
      case "yellow":
        return 4;
      default :
        return 5;
    }
  }

  //dice Click
  function diceClick(){
    if (checkDicebeforeMove) return;

    //managing current starcell
    let temp = {...changeId};
    for (let key in starCellGotiObj) {
      if (starCellGotiObj[parseInt(key)].includes(checkCurrentColor())) {
        temp[starCell[parseInt(key)]] = checkCurrentColor();
      }
    }
    setChangeId({...temp});

    setTempChangeId({});
    diceThrowSound();
    setColorArray(["red", "green", "orange", "blue", "yellow", "purple"]);
    setIntialStatgeHideDiceFlag(true);
    let newDice = Math.floor(Math.random() * 6) + 1;
    diceCopy = newDice;
    setDice(newDice);

    setShowDiceFlag(true);
    setTimeout(() => {
      setShowDiceFlag(false);
    }, 1000);
    setCurrentDiceMove(newDice);

    //if player turn but no possible move or player turn remain same
    if (newDice === 6) {
      if (currentPlayerCount[currentPlayer - 1] === 0) {
        setTimeout(() => {
          autoUpdateGoti();
        }, 1200);
      } else {
        afterAutoupdateGotiFlag = false;
        setCheckDiceBeforeMove(true);
      }
      setDice6Flag(true);
    } else {
      setDice6Flag(false);
      if (currentPlayerCount[currentPlayer - 1] === 0) {
        setCheckDiceBeforeMove(false);
        setTimeout(() => {
          setCurrentPlayer(currentPlayer === 6 ? 1 : currentPlayer + 1);
          nextPlayerSound();
          setIntialStatgeHideDiceFlag(false);
        }, 1500);
      } else {
        setDice6Flag(false);

        // if in the board there is only one goti for current player, goti should move automaticaly
        if (currentPlayerCount[currentPlayer - 1] === 1) {
          setCheckDiceBeforeMove(true);
          setTimeout(() => {
            moveClick();
          }, 1000);
          console.log("1");
        } else {
          setCheckDiceBeforeMove(true);
          setTimeout(() => {
            setAnimaFlag(false);
          }, 1000);
        }
      }
      afterAutoupdateGotiFlag = false;
    }
  }
  
  //opening goti
  function handleClick(e){
    if (!checkDicebeforeMove || !dice6Flag) return;

    let idArray = e.target.id.split("-");
    let idArrayRow = parseInt(idArray[0]);
    let idArrayCol = parseInt(idArray[1]);

    //checking for wrong player click
    if(idArrayRow!==currentPlayer-1) return;

    //checking for correct player but wrong goti open move
    if(playerGotiState[idArrayRow][idArrayCol]===true) return;

    // changing the state to true of the goti
    playerGotiState[idArrayRow][idArrayCol] = true;

    setAnimaFlag(false);
    
    if(currentPlayerCount[currentPlayer-1]==4) return;
    currentPlayerCount[currentPlayer-1]++;
    
    gotiOpenSoundPlay();

    let idx = currentPlayer * 18 - 5;
    setChangeId({ ...changeId, [idx]: checkCurrentColor() });
    setCheckDiceBeforeMove(false);

    afterAutoupdateGotiFlag = true;
    setIntialStatgeHideDiceFlag(false);
    //testing
    // let ok =false;
    // for(let i=0; i<currentPlayerCount.length; i++){
    //   if(currentPlayerCount[i]!=1) {
      //     ok =true;
      //     break;
      //   }
      // }
      //moveClick(currentPlayer*18-5);
  }
  
  //goti move
  function moveClick(e){
    if(afterAutoupdateGotiFlag) return;
    
    //for preventing doubleclick
    if(preventDoubleClickMove) return;
    preventDoubleClickMove = true;

    //setting all the changId state to prevoius if any changes happen
    // let temChangeId = {...changeId};
    // for(let key in temChangeId){
    //   if(temChangeId[key]==="black"){
    //     temChangeId[key] = checkCurrentColor();
    //   }
    // }
    // setChangeId({...temChangeId});
    
    let flag = false;
    let id;
    if(currentPlayerCount[currentPlayer-1]===1){
      for(let key in starCellGotiObj){
        if(starCellGotiObj[key].includes(checkCurrentColor())){
          id = (parseInt(key)*18)+3;
          flag = true;
          break;
        }
      }
      for(let key in changeId){
        if(changeId[key]===checkCurrentColor()){
          id = parseInt(key);
        }
      }
      
    }else{
      id = parseInt(e.target.id);
    }
    console.log("jhdfjdhfjdhjfh", id);

    if (!changeId.hasOwnProperty(id) || changeId[id] !== checkCurrentColor()) {
      if(!flag)return;
    }

    //reseting goti blink state
    setgotiMoveBlinkTimer(50);
    setgotiMoveBlinkcounter(0);
    
    //checking eating moves
    let checkDiceIndexafterMove = id + diceCopy;
    if(diceExceptionForEat.includes(checkDiceIndexafterMove)){
      checkDiceIndexafterMove += 5;
    }else if(checkDiceIndexafterMove >107){
      checkDiceIndexafterMove -= 108;
    }

    if (delMove.includes(checkDiceIndexafterMove)) {
      setDelGotiFlag(true);
    }
    //pushing the radius value for overlapping goti in star mark cell
    if(starCell.includes(id) && starCellGotiObj[starCell.indexOf(id)].includes(checkCurrentColor())){
      let delIndex = starCellGotiObj[starCell.indexOf(id)].indexOf(checkCurrentColor());
      starCellGotiObj[starCell.indexOf(id)].splice(delIndex,1);
      for(let i=0; i<extraGotiMovePoints[starCell.indexOf(id)].length;i++){
        if(extraGotiMovePoints[starCell.indexOf(id)][i][1]===checkCurrentColor()){
          extraGotiMovePoints[starCell.indexOf(id)].splice(i,1);
        }
      }
      let radius = 11.5;
      for(let i=0; i<extraGotiMovePoints[starCell.indexOf(id)].length; i++){
        extraGotiMovePoints[starCell.indexOf(id)][i][0] = radius;
        radius = radius - 3.5;
      }
    }
    else if(starCell.includes(checkDiceIndexafterMove)){
      let indexofExtragoti = starCell.indexOf(checkDiceIndexafterMove);
      let newRadiusValue = 11.5 - (extraGotiMovePoints[indexofExtragoti].length*3)
      extraGotiMovePoints[indexofExtragoti].push([newRadiusValue,checkCurrentColor()]);
      starCellGotiObj[starCell.indexOf(checkDiceIndexafterMove)].push(checkCurrentColor());
    }
    else if (changeId.hasOwnProperty(checkDiceIndexafterMove)) {
      if (changeId[checkDiceIndexafterMove] !== checkCurrentColor()) {
        setCopyChangeId({...changeId});
        setCopyChangeId(pre=>(delete pre[checkDiceIndexafterMove],delete pre[id],{...pre,[checkDiceIndexafterMove]:checkCurrentColor()}));

        eatFlag = true;
        eatPlayer = checkIndexColor(changeId[checkDiceIndexafterMove]);

        let temp = [...currentPlayerCount];
        temp[checkIndexColor(changeId[checkDiceIndexafterMove])]--;
        setCurrentPlayerCount([...temp]);
        
        let timer;
        let timerCount = ((checkIndexColor(changeId[checkDiceIndexafterMove]))+1)*18-5;
        if(timerCount > checkDiceIndexafterMove){
          timer = 102-timerCount + checkDiceIndexafterMove;
        }else{
          timer = checkDiceIndexafterMove - timerCount;
        }

        setTimeout(() => {
          let findIndex = playerGotiState[checkIndexColor(changeId[checkDiceIndexafterMove])].indexOf(true);
          playerGotiState[checkIndexColor(changeId[checkDiceIndexafterMove])][findIndex] = false;
        }, (timer+1)*50);
      } else {
        retainFlag = true;
      }
    } else {
      eatFlag = false;
      retainFlag = false;
    }
    
    setCurrentGoti(id);
    setFlag(true);

    //removing last entry checkpoint to enter for the current player
    let temp = [...avoidMoveCopy];
    temp.splice(currentPlayer - 1, 1);
    setAvoidMove(temp);
    setAnimaFlag(false);
    setColorArray(["red", "green", "orange", "blue", "yellow", "purple"]);
  }

  //auto goti on board
  function autoUpdateGoti(){
    gotiOpenSoundPlay();

    // changing the state to true of the goti
    playerGotiState[currentPlayer-1][0] = true;

    currentPlayerCount[currentPlayer - 1]++;
    let idx = currentPlayer * 18 - 5;
    setChangeId({ ...changeId, [idx]: checkCurrentColor() });

    afterAutoupdateGotiFlag = true;
    setIntialStatgeHideDiceFlag(false);
  }

  useEffect(()=>{
    if(showDiceFlag){
      showDiceInterval = setInterval(()=>{
        let rollDice = Math.floor(Math.random() * 6) + 1;
        setShowDice(pre => pre=rollDice);
      },50)
    }else{
      clearInterval(showDiceInterval);
    }

    return ()=>clearInterval(showDiceInterval);
  },[showDiceFlag, showDice])

  function checkCurrentColor(){
    switch (currentPlayer) {
      case 1:
        return "red";
      case 2:
        return "green";
      case 3:
        return "orange";
      case 4:
        return "blue";
      case 5:
        return "yellow";
      default :
        return "purple"
    }
  }

  function numberWiseColor(numberColor) {
    switch (numberColor) {
      case 0:
        return "red";
      case 1:
        return "green";
      case 2:
        return "orange";
      case 3:
        return "blue";
      case 4:
        return "yellow";
      default:
        return "purple";
    }
  }


  useEffect(() => {
    if (flag) {
      let currentColor = changeId[currentGoti];
      // for check of last move inside the last row 
      if(changeId.hasOwnProperty(avoidMove.includes(currentGoti) ? currentGoti+6 : currentGoti===107 ? 0 : currentGoti+1)){
        setTempChangeId({
          [avoidMove.includes(currentGoti)
            ? currentGoti + 6
            : currentGoti === 107
            ? 0
            : currentGoti + 1]:
            changeId[
              avoidMove.includes(currentGoti)
                ? currentGoti + 6
                : currentGoti === 107
                ? 0
                : currentGoti + 1
            ],
        });
      }

      kk = setInterval(() => {
        playSound();
        setChangeId(
          (pre) => (
            delete pre[currentGoti],
            {
              ...tempChangeId,
              ...pre,
              [avoidMove.includes(currentGoti)
                ?
                  currentGoti + 6
                :
                  delGotiFlag && delMove.includes(currentGoti+1) 
                  ?
                  currentColor
                  :
                  currentGoti ===107 ? 0 : currentGoti+1
              ]
              : 
              delGotiFlag && delMove.includes(currentGoti+1) 
                ? pre[currentColor]+1
                : currentColor,
            }
          )
        );
        
        // incrementing for move
        setCurrentGoti(pre =>pre = avoidMove.includes(pre) ? pre+6 : pre===107 ? 0 : pre+1);
        //decrementing dice
        setDice(pre => pre-1);
      }, 200);


      if (dice === 0) {
        preventDoubleClickMove = false;
        setCheckDiceBeforeMove(false);
        setIntialStatgeHideDiceFlag(false);
        setFlag(false);
        setAnimaFlag(true);
        setTimeout(() => {
          nextPlayerSound();
        }, 300);
        if (!dice6Flag)
          setCurrentPlayer(currentPlayer === 6 ? 1 : currentPlayer + 1);
        if (eatFlag) {
          eatAnimationFlag = true;
          setCurrentGoti(
            avoidMoveCopy.includes(currentGoti)
              ? currentGoti - 6
              : currentGoti === 107
              ? 0
              : currentGoti - 1
          );
        } else eatAnimationFlag = false;

        if (starCell.includes(currentGoti)) {
          setChangeId((pre) => (delete pre[currentGoti], { ...pre }));
        }

        //deleting the current starcell goti
        let temp = { ...changeId };
        for (let key in temp) {
          if (starCell.includes(parseInt(key))) {
            delete temp[key];
          }
        }
        setChangeId((pre)=>(pre={...temp}));

        // console.log("after change", changeId);
        //testing purpuse
        //handleClick();
        // let arr = [];
        // for(let key in changeId){
        //   if(changeId[key]===checkCurrentColor()){
        //     arr.push(key);
        //   }
        // }
        // let key = Math.floor(Math.random()*arr.length);
        // moveClick(key);
      }
    } else {
      clearInterval(kk);
    }
    
    if(animaFlag && !checkDicebeforeMove){
      k = setInterval(() => {  
        let temp = [...colorArray];  
        temp[currentPlayer-1] =temp[currentPlayer-1] === "black" ? temp[currentPlayer-1]=checkCurrentColor() : temp[currentPlayer-1]="black";
        setColorArray(pre=>pre=[...temp]);
      }, 300);
      
    }else{
      clearInterval(k);
    }

    if(!animaFlag && !flag && checkDicebeforeMove){
      gotiMoveAnimationInterval = setInterval(()=>{
        gotiMoveAlertBlinkSound();
        let temp = {};
        for (let key in changeId){
          if(changeId[key]===checkCurrentColor()){
            temp[key] = "black";
          }else if(changeId[key]==="black"){
            temp[key] = checkCurrentColor();
          }
        }
        setChangeId(pre=>pre = {...pre, ...temp});
        setgotiMoveBlinkcounter(pre=>pre+1);
        if(gotiMoveBlinkcounter===5){
          setgotiMoveBlinkTimer(pre=>pre=1500);
          setgotiMoveBlinkcounter(pre=>pre=0);
        }else{
          setgotiMoveBlinkTimer(pre=>pre=50);
        }
      },gotiMoveBlinkTimer)
    }else {
      clearInterval(gotiMoveAnimationInterval);
    }

    if(eatAnimationFlag){
      if(changeId.hasOwnProperty(avoidMove.includes(currentGoti-6) ? currentGoti-6 : currentGoti===0 ? 107 : currentGoti-1)){
        setTempChangeId({
          [avoidMoveCopy.includes(currentGoti-6)
            ? currentGoti - 6
            : currentGoti === 0
            ? 107
            : currentGoti - 1]:
            changeId[
              avoidMoveCopy.includes(currentGoti-6)
                ? currentGoti - 6
                : currentGoti === 0
                ? 107
                : currentGoti - 1
            ],
        });
      }

      gotiEatInterval = setInterval(()=>{
        playSound();
        setChangeId(
          (pre) => (
            delete pre[currentGoti],
            {
              ...tempChangeId,
              ...pre,
              [avoidMoveCopy.includes(currentGoti-6)
                ?
                currentGoti - 6
                :
                currentGoti ===0 ? 107 : currentGoti-1
              ]
              :  
              numberWiseColor(eatPlayer)
            }
          )
        );

        // decrementing for move
        setCurrentGoti(pre =>pre= avoidMoveCopy.includes(pre-6) ? pre-6 : pre===0 ? 107 : pre-1);
      },50)
      if(currentGoti===(eatPlayer+1)*18 - 4){
        eatAnimationFlag = false;
        eatFlag = false;
        setChangeId(pre=>(
          delete pre[currentGoti],
          {...tempChangeId,...pre}
        ))
        setTempChangeId(pre=>pre={});
        setChangeId(pre=>pre={...copyChangeId});
        setCurrentPlayer(currentPlayer == 1 ? 6 : currentPlayer - 1);
      }
    }else{
      clearInterval(gotiEatInterval);
    }
    return () => {
      clearInterval(kk);
      clearInterval(k);
      clearInterval(gotiMoveAnimationInterval);
      clearInterval(gotiEatInterval);
    }
  }, [dice, changeId, flag, currentPlayer, delGotiFlag, animaFlag, colorArray, currentDiceMove, checkDicebeforeMove]);
  
  console.log(changeId, avoidMove, delMove, currentGoti, currentPlayerCount);
  console.log("cp", currentPlayer);
  console.log("dice", dice);
  console.log("dice6Flag", dice6Flag);
  console.log("cdbm", checkDicebeforeMove);
  console.log(tempChangeId);
  console.log(starCellGotiObj);
  console.log(extraGotiMovePoints);


  return (
    <div>
      <svg width="800" height="800">
        <style>
          {`
          .triangle {
            fill: none;
            stroke: black;
            stroke-width: 2;
          }
          
          .purple {
            fill: purple;
          }
          .red {
            fill: red;
          }
          .green {
            fill: green;
          }
          .blue {
            fill: blue;
          }
          .yellow {
            fill: yellow;
          }
          .orange {
            fill: orange;
          }
          .white {
            fill: white;
          }
          .cell {
            cursor:pointer;
          }
        `}
        </style>

        {/* dice */}
        <polygon
          points="285,260, 350,260, 350,320, 285,320"
          onClick={diceClick}
          style={{
            stroke: "black",
            strokeWidth: 1,
            fill: "white",
            cursor: "pointer",
          }}
        />

        {/* columns for move */}
        {[...Array(108)].map((_, col) => (
          <polygon
            key={col}
            points={points[col]}
            style={{
              stroke: "#000",
              strokeWidth: 1,
              cursor: "pointer",
              fill:
                col > Math.floor((col + 1) / 18) * 18 + 6 &&
                col < Math.floor((col + 1) / 18) * 18 + 12
                  ? numberWiseColor(Math.floor((col + 1) / 18))
                  : "white",
            }}
          />
        ))}

        {/* triangle for every cell */}
        {[...Array(6)].map((_, col) => (
          <polygon
            key={col * 1000}
            points={trianglePoints[col]}
            className="triangle red"
            style={{
              fill: colorArray[col],
            }}
          />
        ))}

        {/* dice dots */}
        {(checkDicebeforeMove || intialStageHideDiceFlag) &&
          [...Array(showDiceFlag ? showDice : currentDiceMove)].map(
            (_, col) => (
              <circle
                key={"" + col + "-" + col + "-" + col + col}
                className="cell"
                cx={diceDots[(showDiceFlag ? showDice : currentDiceMove) - 1][col][0]}
                cy={diceDots[(showDiceFlag ? showDice : currentDiceMove) - 1][col][1]}
                r="7"
                style={{
                  stroke: "black",
                  strokeWidth: 1,
                  fill: checkCurrentColor(),
                }}
              />
            )
          )}

        {/* star cell goti*/}
        {extraGotiMovePoints.map((_, row) =>
          extraGotiMovePoints[row].map((_, col) => (
            <circle
              key={"" + col + "-" + col + "-" + col + col}
              cx={gotiMovePoints[row*18+3][0]}
              cy={gotiMovePoints[row*18+3][1]}
              r={extraGotiMovePoints[row][col][0]}
              style={{
                stroke: "black",
                strokeWidth: 0.5,
                fill: extraGotiMovePoints[row][col][1],
              }}
            />
          ))
        )}

        {/* goti move */}
        {[...Array(108)].map((_, col) => (
          <circle
            key={"" + col + "-" + col + "-" + col}
            className="cell"
            id={col}
            onClick={moveClick}
            cx={gotiMovePoints[col][0]}
            cy={gotiMovePoints[col][1]}
            r="11.5"
            style={{
              stroke: changeId.hasOwnProperty(col) ? "black" : "none",
              strokeWidth: 0.7,
              fill: changeId.hasOwnProperty(col)
                ? changeId[col]
                : col > Math.floor((col + 1) / 18) * 18 + 6 &&
                  col < Math.floor((col + 1) / 18) * 18 + 12
                ? numberWiseColor(Math.floor((col + 1) / 18))
                : "white",
            }}
          />
        ))}

        {/* red */}
        <polygon className="triangle white" points="250,60 390,60, 320,200" />
        <polygon className="triangle" points="320,200 390,250 500,80 435,35" />
        <polygon
          className="triangle red"
          points="250,250 275,257 315,230 320,200"
        />

        {/* green */}

        <polygon className="triangle white" points="500,120 590,230, 390,250" />
        <polygon className="triangle" points="10,250 10,330 250,330 250,250" />
        <polygon
          className="triangle green"
          points="320,200 315,230 365,260 390,250"
        />

        {/* orange */}

        <polygon className="triangle white" points="500,460 585,350, 390,330" />
        <polygon
          className="triangle"
          points="435,560 500,500 390,330 320,380"
        />
        <polygon
          className="triangle orange"
          points="390,250 365,260 365,315 390,330"
        />

        {/* blue */}

        <polygon className="triangle white" points="245,535 385,535, 320,380" />
        <polygon
          className="triangle"
          points="130,500 195,560 320,380 250,330"
        />
        <polygon
          className="triangle blue"
          points="390,330 365,315 320,350 320,380"
        />

        {/* Yellow */}

        <polygon className="triangle white" points="50,350 130,460, 250,330" />
        <polygon
          className="triangle"
          points="390,250 390,330 630,330 630,250"
        />
        <polygon
          className="triangle yellow"
          points="320,380 320,350 275,320 250,330"
        />

        {/* purple */}
        <polygon className="triangle white" points="60,230 250,250, 130,125" />
        <polygon className="triangle" points="250,250 320,200 195,35 130,80" />
        <polygon
          className="triangle purple"
          points="250,330 273,320 273,257 250,250"
        />

        {/* individual gotis */}
        {[...Array(6)].map((_, row) =>
          [...Array(4)].map((_, col) => (
            <circle
              key={"" + row + "-" + col}
              id={row + "-" + col}
              onClick={handleClick}
              cx={gotiPoints[row][col][0]}
              cy={gotiPoints[row][col][1]}
              r="11.5"
              style={{
                stroke: "#000",
                strokeWidth: 1,
                cursor: "pointer",
                fill: playerGotiState[row][col]
                  ? "white"
                  : !animaFlag &&
                    !flag &&
                    checkDicebeforeMove &&
                    dice6Flag &&
                    currentPlayer - 1 === row
                  ? "black"
                  : numberWiseColor(row),
              }}
            />
          ))
        )}

        {/* star marks cells */}
        {[...Array(6)].map((_, col) => (
          <polygon
            key={"" + col * 10000}
            points={starPoints[col]}
            style={{
              stroke: "#000",
              fill: "none",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default TriangleSVG;
