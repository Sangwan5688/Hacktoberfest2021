import React, { useRef } from 'react'
import Top from './Components/Top'
import GamePanel from './Components/Page'
import SideBar from './Components/SideBar'

const App = () => {
  const ref = useRef();
  const showSideBar = () =>{
    ref.current.classList.remove("hidden")
    console.log("Showsidebar clicked");
  }
  return (
    <>
      <Top show={showSideBar} />
      <GamePanel />
      <div ref={ref} className="hidden absolute left-0 top-0">
        <SideBar />
      </div>
    </>
  )
}

export default App
