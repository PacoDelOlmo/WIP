
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
import type { WorkSpaceTO } from '../../services/WorkSpaceService'
import NotFoundInternal from '../notFoundInternal/NotFoundInternal'
import { Colaboradores } from '../../components/colaboradores/Colaboradores'
import { AjustesWorkspace } from '../../components/ajustesWorkspace/AjustesWorkspace'
import { ResultadosBusqueda } from '../resultadosBusqueda/ResultadosBusqueda'
import { GuiaAyuda } from '../guiaAyuda/GuiaAyuda'
import { CookieBanner } from '../../components/cookieBanner/CookieBanner'
import { usePageTitle } from '../../hooks/usePageTittle'

export type UserCompleteDTO = {
  id: number,
  username: string,
  mail: string
  workspace: WorkSpaceTO[],
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

  const handleAddWorkspace = (nuevoWorkspace: WorkSpaceTO) => {
    if (!user) return; 

    setUser({
      ...user,
        workspace: [...user.workspace, nuevoWorkspace]
    })
  }

  const handleUpdateWorkspace = (idWs: number, nuevoNombre: string) => {
    if (!user) return;
    const workspacesActualizados = user.workspace.map(ws => 
      ws.id === idWs ? { ...ws, nombre: nuevoNombre } : ws
    );
    setUser({ ...user, workspace: workspacesActualizados });
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let datosUsuario = await LoginService.getUserById(userLogged);
        //console.log(datosUsuario);
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
          <Header_logged usuario={user} onWorkspaceCreated={handleAddWorkspace}/> 
          <main className={styles.body}>
              {user ? <Aside usuario={user}/> : ''}
              <Routes>
                <Route path='/workspace/:id' element={<Workspace usuario={user}/>} />
                <Route path='/home' element={<Home_logged usuario={user} onWorkspaceCreated={handleAddWorkspace} /> }/>
                <Route path='/tableros' element={<Tableros usuario={user} />}/>
                <Route path='/perfil' element={<Ajustes />}/>
                <Route path='/ayuda' element={<GuiaAyuda />}/>
                <Route path='/workspace/:id/colaboradores' element={<Colaboradores usuario={user}/>} />
                <Route 
                    path='/workspace/:id/ajustes' 
                    element={<AjustesWorkspace usuario={user} onUpdateWorkspace={handleUpdateWorkspace}/>} 
                />
                <Route path='/resultados' element={<ResultadosBusqueda />} />
                <Route path= '/*' element={<NotFoundInternal/>} />
              </Routes>
              <CookieBanner />
          </main>
        </> : ''}
    </>
  )
}
