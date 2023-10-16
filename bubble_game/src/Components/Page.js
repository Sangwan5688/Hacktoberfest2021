import '../index.css';
import React, { useState, useEffect } from 'react';

function GamePanel() {
  const [hit, sethit] = useState(0);
  const [time, settime] = useState(10);
  const [score, setscore] = useState(0);
  const [bubble, setbubble] = useState([]);
  const [gameOver, setgameOver] = useState(false);
  const [dep, setdep] = useState(0);
  const [tick, settick] = useState(false);

  useEffect(() => {
    const createBubbles = () => {
      let clutter = [];
      for (var i = 1; i <= 171; i++) {
        var randNum = Math.floor(Math.random() * 10);
        clutter.push(randNum)
      }
      setbubble(clutter)

    }
    createBubbles()
  }, [dep])

  function handleBubble(e) {
    function ranHit() {
      var randNum = Math.floor(Math.random() * 10);
      sethit(randNum)
    }
    ranHit()
    var value = Number(e.target.textContent);
    if (hit === value) {
      setscore(Number(score) + 10)
    }

    setdep(dep + 1)
  }


  useEffect(() => {
    var interval = setInterval(() => {
      if (time > 0 && tick) {
        settime(time - 1);
      }
      if (time === 0) {
        setgameOver(true)
        clearInterval(interval)
        
      }
    }, 1000);

    if (!tick) settick(!tick)

    return () => {
      clearInterval(interval);
    };

  }, [time, tick])


  function restart() {
    var num = Math.floor(Math.random() * 10)
    sethit(num)
    settime(10)
    setscore(0)
    setgameOver(false)
  }

  


  return (
    <>
      <div className="flex pt-4 justify-center h-screen">
        <div className="w-11/12 h-5/6 overflow-hidden rounded-lg bg-blue-100 max-w-4xl sm:text-xl md:text-2xl font-medium ">
          <div className="w-full h-20 p-8  flex items-center justify-between bg-green-700 text-white sm:px-16">
            <div className="flex items-center gap-1 ">
              <h2>Hit :</h2>
              <div id="hitVal" className="box bg-green-700 text-white px-2 py-2 rounded font-semibold text-lg sm:text-xl md:text-2xl ">{hit}</div>
            </div>
            <div className="flex items-center gap-1 ">
              <h2>Timer :</h2>
              <div className="box bg-green-700 text-white sm:text-lg px-2 py-2 rounded font-semibold text-lg sm:text-xl md:text-2xl " id="timer">{time}</div>
            </div>
            <div className="flex items-center gap-2">
              <h2>Score :</h2>
              <div id="score" className="box bg-green-700 text-white px-2 py-2 rounded font-semibold text-lg sm:text-xl md:text-2xl ">{score}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center h-full px-15 gap-2 pb-10 pt-4" id="p-btm">

            {gameOver ? (
              <button className='bg-green-600 hover:bg-green-500 w-[120px] rounded-lg' onClick={restart}> Game Over </button>
            ) : (
              bubble.map((value, index) => (
                <button key={index} onClick={handleBubble} className="bubble flex items-center justify-center w-8 h-8 md:h-10 md:w-10 bg-green-700 text-white rounded-full font-medium">{value}</button>
              ))
            )}


          </div>
        </div>
      </div>
    </>
  );
}

export default GamePanel;

