import React from 'react'
import { useRef } from 'react'

const SideBar = () => {
    const ref = useRef()

    const removeSb = () =>{

        ref.current.classList.add('hidden')
    }
    return (
        <>
            <div ref={ref} className=" bg-green-700 text-white h-screen">
                <div className="top flex items-center justify-between mx-5 p-4 mb-5">
                    <div className="bar  flex items-center justify-center text-lg">Bubbling Game</div> <hr className='text-green-950' />
                    <button onClick={removeSb} className='text-green-400 text-2xl'>X</button>
                </div> <hr className='w-5/6 flex mx-auto' />

                <div className="navs my-7 text-lg font-semibold space-y-1">
                    <div className="scores w-full hover:bg-green-800 py-2 px-14 flex justify-center">Highest Score</div>
                   <ul className="">
                    
                    <div className=""></div>
                   </ul>
                </div>

            </div>


        </>
    )
}

export default SideBar
