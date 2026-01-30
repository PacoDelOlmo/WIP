import './App.css'
import {Routes, Route} from 'react-router'
import { HomePage } from './pages/homePage/HomePage'
import { Login } from './pages/login/Login'
import { SignUp } from './pages/signUp/SignUp'
import { Home } from './pages/home/Home'
import { Taskboard } from './pages/taskboard/Taskboard'
import { Protected_Route } from './components/protected_route/Protected_Route'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/user/*' element={
          <Protected_Route>
            <Home />
          </Protected_Route>
        } />
      <Route path='/taskboard/:id' element={
        <Protected_Route>
          <Taskboard />
        </Protected_Route>
        } />
    </Routes>
  )
}

export default App
