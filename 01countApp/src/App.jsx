import { useState } from 'react';
import './App.css'

function App() {
  let [count,setCounter] = useState(0);

  const addValue = () =>{
    setCounter(count+1);
  }

  
  const removeValue = () =>{
    if(count>0){
      setCounter(count-1);
    }   
  }
    return (
    <div>
     <h1>Counter App</h1>
      <div className='button'>
      <button onClick={removeValue}>-</button>
      <p>{count}</p>
      <button onClick={addValue}>+</button> </div>
    </div>
  )
}

export default App
