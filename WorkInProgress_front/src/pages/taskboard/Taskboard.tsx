import React, { useEffect, useState } from 'react'
import { Header_logged_tablero } from '../../components/header_logged_tablero/Header_logged_tablero'
import { Board } from '../../components/board/Board'
import styles from './Taskboard.module.css'
import { useParams } from 'react-router';
import { TaskBoardService } from '../../services/TaskBoardService';
import { useAuthStore } from '../../store/Auth';
import { type UserCompleteDTO } from '../home/Home';
import { LoginService } from '../../services/LoginService';
import { AccessDeneid } from '../accesDeneid/AccessDenied';

export function Taskboard() {

  const { id } = useParams();
  const idUser = useAuthStore((state) => state.idUsuario);
  const [idWS, setIdWs] = useState<number>(-1);
  const [user, setUser] = useState<UserCompleteDTO>();
  const [hasAccess, setHasAccess] = useState<boolean>(false);

    async function obtenerIdWorkspace(idTablero: number) {
      try {
        let response = await TaskBoardService.getIdWS(idTablero);
        setIdWs(response);
      } catch (e) {
        console.error(e);
      }
    }

    async function obtenerUserCompleto(idUser: number){
      try {
        let datosUsuario = await LoginService.getUserById(idUser);
        setUser(datosUsuario);
      } catch (e) {
        console.error("Error cargando usuario:", e)
      }
    }

  useEffect(() => {
    if (id) {
      let idTablero = Number(id);
      obtenerIdWorkspace(idTablero);
      obtenerUserCompleto(idUser);
    }
  }, [id]);

  if (user?.workspace){
    for (let i: number = 0; i < user?.workspace.length; i++ ){
      for (let j: number = 0; i < user?.workspace[i].tableros.length; j++ ){
          if (user?.workspace[i].tableros[j].id === Number(id)){
            setHasAccess(true);
          }
      }
    }
  }


  if (!hasAccess){
    return <AccessDeneid/>
  }

  return (
    <div className={styles.contenedor_principal}>
        <Header_logged_tablero />
        <Board />
    </div>
  )
}
