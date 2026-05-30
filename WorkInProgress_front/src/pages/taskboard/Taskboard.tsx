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
import { Loader } from '../../components/loader/Loader';

export function Taskboard() {

  const { id } = useParams();
  const idUser = useAuthStore((state) => state.idUsuario);
  const [idWS, setIdWs] = useState<number>(-1);
  const [user, setUser] = useState<UserCompleteDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function cargarDatosGenerales() {
      if (!id) return;
      
      setIsLoading(true);
      try {
        let idTablero = Number(id);
        
        const [wsIdResponse, datosUsuario] = await Promise.all([
            TaskBoardService.getIdWS(idTablero),
            LoginService.getUserById(idUser)
        ]);

        setIdWs(wsIdResponse);
        setUser(datosUsuario);
      } catch (e) {
        console.error("Error cargando datos del tablero:", e);
      } finally {
        setIsLoading(false);
      }
    }

    cargarDatosGenerales();
  }, [id, idUser]);

  if (isLoading) {
      return (
          <main className={styles.body}>
              <Loader />
          </main>
      );
  }

  const hasAccess = user?.workspace?.some(ws => 
    ws.tableros.some(tablero => tablero.id === Number(id))
  ) ?? false;

  if (!hasAccess){
    return <AccessDeneid />
  }

  return (
    <div className={styles.contenedor_principal}>
        <Header_logged_tablero />
        <Board />
    </div>
  )
}