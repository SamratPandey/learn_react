import { useState } from 'react';
import './App.css'


function App() {
  const[color, setColor] = useState("black");
  return (
    <>
      <div className='w-full h-screen duration-200' style={{backgroundColor:color}}>
        <div className='flex flex-wrap justify-center bg-white inset-x-0'>
          <button className='bg-red-500 px-4 py-2 m-2 rounded-xl' onClick={function(){setColor('red')}}>Red</button>
          <button className='bg-purple-500 px-4 py-2 m-2 rounded-xl text-white' onClick={()=>{setColor('purple')}}>Purple</button>
          <button className='bg-green-500 px-4 py-2 m-2 rounded-xl' onClick={function(){setColor('green')}}>Green</button>
          <button className='bg-yellow-500 px-4 py-2 m-2 rounded-xl' onClick={function(){setColor('yellow')}}>Yellow</button>
          <button className='bg-lime-500 px-4 py-2 m-2 rounded-xl' onClick={function(){setColor('lime')}}>Lime</button>
        </div>
      </div>
    </>
  )
}

export default App
