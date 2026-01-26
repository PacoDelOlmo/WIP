
import { Header_logged } from '../../components/header_logged/Header_logged'
import { Aside } from '../../components/aside/Aside'
import styles from './Home.module.css'
import { Link, Route, Routes } from 'react-router'
import { Workspace } from '../../components/workspace/Workspace'
import { Home_logged } from '../../components/home_logged/Home_logged'
import { Tableros } from '../../components/tableros/Tableros'
import { Ajustes } from '../../components/ajustes/Ajustes'
import { useAuthStore } from '../../store/Auth'

export function Home() {

  const userLogged = useAuthStore((state) => state.idUsuario)
  console.log(userLogged);


  return (
    <>
        <Header_logged />
        <main className={styles.body}>
            <Aside />
            <Routes>
              <Route path='/workspace' element={<Workspace />} />
              <Route path='/home' element={<Home_logged/>}/>
              <Route path='/tableros' element={<Tableros />}/>
              <Route path='/ajustes' element={<Ajustes />}/>
            </Routes>
        </main>
    </>
  )
}
