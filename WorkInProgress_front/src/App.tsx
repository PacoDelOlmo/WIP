import './App.css'
import {Routes, Route} from 'react-router'
import { HomePage } from './pages/homePage/HomePage'
import { Login } from './pages/login/Login'
import { SignUp } from './pages/signUp/SignUp'
import { Home } from './pages/home/Home'
import { Taskboard } from './pages/taskboard/Taskboard'
import { Protected_Route } from './components/protected_route/Protected_Route'
import NotFound from './pages/notFound/NotFound'
import { Funciones } from './pages/funciones/Funciones'
import { Recursos } from './pages/recursos/Recursos'
import { Contacto } from './pages/contacto/Contacto'
import { FAQSs } from './pages/faqs/FAQs'
import { Soluciones } from './pages/soluciones/Soluciones'
import { GuiaEstilos } from './pages/guiaEstilos/GuiaEstilos'
import { PoliticaCookies } from './pages/politicaCookies/PoliticaCookies'
import { PoliticaPrivacidad } from './pages/politicaPrivacidad/PoliticaPrivacidad'
import { TerminosCondiciones } from './pages/terminosCondiciones/TerminosCondiciones'
import { Trabaja } from './pages/trabajaConNosotros/Trabaja'

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/funciones' element={<Funciones />}/>
      <Route path='/recursos' element={<Recursos />}/>
      <Route path='/contacto' element={<Contacto />}/>
      <Route path='/faqs' element={<FAQSs />}/>
      <Route path='/soluciones' element={<Soluciones />}/>
      <Route path='/guia_estilos' element={<GuiaEstilos />}/>
      <Route path='/politica_cookies' element={<PoliticaCookies />}/>
      <Route path='/politica_privacidad' element={<PoliticaPrivacidad />}/>
      <Route path='/terminos_condiciones' element={<TerminosCondiciones />}/>
      <Route path='/trabaja_con_nosotros' element={<Trabaja />}/>
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
        <Route path='/*' element={<NotFound />}/>
    </Routes>
  )
}

export default App
