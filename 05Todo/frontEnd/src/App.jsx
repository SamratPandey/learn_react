import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Home from './components/Home.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/signin' element={ <Signin /> }/>
        <Route path='/signup' element={ <Signup /> }/>
      </Routes>

    </Router>
  )
}

export default App
