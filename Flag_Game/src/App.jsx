import { useState } from 'react'
import { Question, Options } from './components/Index.js'

function App() {
  const [index0, setindex0] = useState(0)
  const [index1, setindex1] = useState(0)
  const [index2, setindex2] = useState(1)
  const [index3, setindex3] = useState(2)
  const [index4, setindex4] = useState(3)
  const [bgColor1, setbgColor1] = useState('bg-gray-600')
  const [bgColor2, setbgColor2] = useState('bg-gray-600')
  const [bgColor3, setbgColor3] = useState('bg-gray-600')
  const [bgColor4, setbgColor4] = useState('bg-gray-600')

  const [score, setScore] = useState(0)
  const [lives, setlives] = useState(3)

  function check(e){
    if(e==index0){
      setScore((prev) => prev+1);
      if(e==index1){
        setbgColor1('bg-green-500');
      }else if(e==index2){
        setbgColor2('bg-green-500');
      }else if(e==index3){
        setbgColor3('bg-green-500');
      }else{
        setbgColor4('bg-green-500');
      }
      next();
    }else{
      if(lives==1){
        alert("Game Over");
        setlives(3);
        setScore(0);
        next();
      }else{
        setlives((prev)=>prev-1);
        if(e==index1){
          setbgColor1('bg-red-700');
        }else if(e==index2){
          setbgColor2('bg-red-700');
        }else if(e==index3){
          setbgColor3('bg-red-700');
        }else{
          setbgColor4('bg-red-700');
        }
      }
    }
  }

  const next = () => {
    const random = [
      Math.floor(Math.random() * 248),
      Math.floor(Math.random() * 248),
      Math.floor(Math.random() * 248),
      Math.floor(Math.random() * 248),
      (Math.floor(Math.random()*4))
    ]
    setTimeout(() => {
      setindex0(random[random[4]]);
    }, 600);
    setTimeout(() => {
      setindex1(random[0]);
      setindex2(random[1]);
      setindex3(random[2]);
      setindex4(random[3]);
      setbgColor1('bg-gray-600');
      setbgColor2('bg-gray-600');
      setbgColor3('bg-gray-600');
      setbgColor4('bg-gray-600');
    }, 800);
  }

  return (
    <div className='h-screen w-full flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-gray-800'>
      <div className='w-1/2 h-screen flex flex-col bg-gray-600 rounded-lg border-2'>
        <div className='h-1/6 w-full flex justify-center items-center'>
          <Question
            countryCodeIdx={index0}
          />
        </div>
        <div className='h-4/5 w-full flex flex-wrap'>
          <Options
            countryCodeIdx={index1}
            onCodeChange={(e) => check(e)}
            classadd={bgColor1}
          />
          <Options
            countryCodeIdx={index2}
            onCodeChange={(e) => check(e)}
            classadd={bgColor2}
          />
          <Options
            countryCodeIdx={index3}
            onCodeChange={(e) => check(e)}
            classadd={bgColor3}
          />
          <Options
            countryCodeIdx={index4}
            onCodeChange={(e) => check(e)}
            classadd={bgColor4}
          />
        </div>
        <div className='flex items-center justify-evenly my-3'>
          <label className='font-bold text-3xl' htmlFor="">
            SCORE : {score}
          </label>
          {/* <button
            className='font-bold text-2xl text-white border-2 px-2 mb-1 rounded-2xl mt-1'
            onClick={next}
          >
            NEXT
          </button> */}
          <label className='font-bold text-3xl' htmlFor="">
            LIVES : {lives}
          </label>
        </div>
      </div>
    </div>
  )
}

export default App
