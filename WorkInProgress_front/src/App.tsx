import './App.css'
import {Routes, Route} from 'react-router'
import { HomePage } from './pages/homePage/HomePage'
import { Login } from './pages/login/Login'
import { SignUp } from './pages/signUp/SignUp'
import { Home } from './pages/home/Home'
import { Taskboard } from './pages/taskboard/Taskboard'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/user/*' element={<Home />} />
      <Route path='/taskboard' element={<Taskboard />} />
    </Routes>
  )
}

export default App
