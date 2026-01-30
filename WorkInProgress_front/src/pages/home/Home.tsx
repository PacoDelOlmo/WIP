
import { Header_logged } from '../../components/header_logged/Header_logged'
import { Aside } from '../../components/aside/Aside'
import styles from './Home.module.css'
import { Link, Route, Routes } from 'react-router'
import { Workspace } from '../../components/workspace/Workspace'
import { Home_logged } from '../../components/home_logged/Home_logged'
import { Tableros } from '../../components/tableros/Tableros'
import { Ajustes } from '../../components/ajustes/Ajustes'
import { useAuthStore } from '../../store/Auth'
import { useEffect, useState } from 'react'
import { LoginService } from '../../services/LoginService'

export type UserCompleteDTO = {
  id: number,
  username: string,
  mail: string
  workspace: WorkspaceType[],
}
export interface Tarea {
    id: number, 
    titulo: string;
    fecha?: string; 
}
export interface ListaTareas {
    titulo: string;
    tareas: Tarea[];
}
export interface Tablero {
    id : number,
    nombreTablero: string;
    listaTareas: ListaTareas[];
}
export interface WorkspaceType {
    id: number,
    nombre: string;
    tableros: Tablero[];
}

export function Home() {

  const userLogged = useAuthStore((state) => state.idUsuario)
  
  const [user , setUser] = useState<UserCompleteDTO | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let datosUsuario = await LoginService.getUserById(userLogged);
        setUser(datosUsuario);
      } catch (e) {
        console.error("Error cargando usuario:", e)
      }
    };

    fetchUser();

  }, [userLogged]);



  return (
    <>
        {user ? 
        <>
          <Header_logged usuario={user}/> 
          <main className={styles.body}>
              {user ? <Aside usuario={user}/> : ''}
              <Routes>
                <Route path='/workspace/:id' element={<Workspace usuario={user}/>} />
                <Route path='/home' element={<Home_logged usuario={user} /> }/>
                <Route path='/tableros' element={<Tableros usuario={user} />}/>
                <Route path='/perfil' element={<Ajustes />}/>
              </Routes>
          </main>
        </> : ''}
    </>
  )
}
