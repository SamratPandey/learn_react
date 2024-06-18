import { useCallback, useState, useEffect, useRef} from 'react'
import './App.css'

function App() {


    const[password, setPassword] = useState("")
    const[number, setNumber] = useState(false)
    const[count, setCounter] = useState(8)
    const[char, setChar] = useState(false)
    const passwordRef = useRef(null)


    const passwordGenerator = useCallback(()=>{
      let pass=''
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(number) str += "0123456789"
      if(char) str +="!@#$%^&*"

      for(let i=1; i<=count; i++){
          let randNum = Math.floor(Math.random()*str.length+1)
        pass += str.charAt(randNum)
      }
      setPassword(pass)
    },[setPassword, number,count,char])

    useEffect(()=>{
      passwordGenerator()
    },[passwordGenerator])

  const copyHandler = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password]) 
 
  return(
    <div className='w-full h-screen bg-slate-700 text-white'>
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className='text-4xl font-bold'>Password Generator</h1>
        <div className=''>
        <input className='outline-none py-1 px-3 bg-gray-50 border  border-gray-300 rounded-l-xl text-black text-xl' 
        value={password} type='text' readOnly ref={passwordRef} />
        <button className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0 rounded-r-xl text-xl'
        type="button" onClick={copyHandler}>Copy</button>
        </div>
        <div className='flex gap-3'>
          <input type='range' value={count} onChange={(e) =>{
            setCounter(e.target.value)
          }} min='6' max='100' name='length'/> 
          <label>Length:{count}</label>
          <input type='checkbox' defaultChecked={number} id='number' onChange={() => {setNumber((prev)=>!prev)}} name='number'/>
          <label htmlFor='number'>Add Numbers</label>
          <input type='checkbox' defaultChecked={char} id='char' onChange={() => {setChar((prev)=>!prev)}} name='char'/>
          <label htmlFor='char'>Add Special Char</label>
        </div>
      </div>

    </div>

  )
}

export default App
