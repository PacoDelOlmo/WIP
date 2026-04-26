import React, { useEffect, useState } from 'react'
import { Task_Queue } from '../task_queue/Task_Queue'
import styles from './Board.module.css'
import { Nav_tablero } from '../nav_tablero/Nav_tablero'
import {TaskBoardService } from '../../services/TaskBoardService';
import {useParams} from 'react-router';

import type { BoardTO } from '../../services/TaskBoardService';

export function Board() {

  const {id} = useParams();
  const [board, setBoard] = useState<BoardTO | null >(null);
  const [error, setError] = useState<String | null>();

  async function obtenerTablero (idTablero: number){
    try{
      let response = await TaskBoardService.getTablero(idTablero);
      setBoard(response);
      console.log(response);
    }catch (e) {
      console.error(e);
      setError('Error de conexión con el servidor');
    }
  }

  useEffect(() => {
    console.log(id);
    if (id){
      let idTablero = Number(id);
      obtenerTablero(idTablero); 
    }
  },[]);
  
  return (
    <div className={styles.board}>
        {/* Podrías pasarle el nombre del tablero al Nav_tablero también */}
        <Nav_tablero tittle={board?.nombreTablero} id={board?.id}/> 
        
        <section className={styles.board_lists}>
            
            {board?.listaTareas?.map((lista, index) => (
                <Task_Queue 
                    key={index} 
                    queueData={lista} 
                />
            ))}
            
        </section>
    </div>
  )
}