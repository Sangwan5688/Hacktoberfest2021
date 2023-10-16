import React, {useEffect, useState} from 'react'
import Main from './Main';
import Header from './components/Header';
import Body from './components/Body';
import Socket from './Socket.js';
import LudoBoard from './LudoBoard';
import ThreeD from './ThreeD';

const App = () => {
  const [count, setCount] = useState(4);
  //const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // useEffect(()=>{
  //   const k = setInterval(()=>{setCount(pre=>pre+2)},[5000]);
  //   return ()=> clearInterval(k);
  // },[count])
  // console.log(count)
  // useEffect(()=>{
  //   function handleResize(){
  //     setScreenWidth(window.innerWidth);
  //   }
  //   window.addEventListener("resize", handleResize);

  //   return ()=> window.removeEventListener("resize", handleResize)
  // },[screenWidth]);
  // console.log(screenWidth)

  const [SVG_SIZE, setSVG_SIZE] = useState(800); // Initial SVG size
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newSize = windowWidth < 600 ? windowWidth - 20 : 800; // Adjust as needed
      setSVG_SIZE(newSize);
    };

    // Initial resize on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(SVG_SIZE);
  return (
    <div
      className="App"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <div>
        {[...Array(34)].map(
          (e, i) =>
            i % 2 === 0 &&
            i >= 4 && (
              <button onClick={() => setCount(i)}>
                <h1>{i}</h1>
              </button>
            )
        )}

        {/* <Header /> */}
        {/* <Body /> */}
        {/* <Socket /> */}
        <LudoBoard playerCount={count} SVG_SIZE={SVG_SIZE} />
      </div>
      {/* <ThreeD /> */}
      <Main />
    </div>
  );
}

export default App;
