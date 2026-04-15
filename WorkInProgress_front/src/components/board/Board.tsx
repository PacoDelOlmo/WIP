import React, { useEffect, useState } from 'react'
import { Task_Queue } from '../task_queue/Task_Queue'
import styles from './Board.module.css'
import { Nav_tablero } from '../nav_tablero/Nav_tablero'
import {TaskBoardService } from '../../services/TaskBoardService';

import type { BoardTO } from '../../services/TaskBoardService';

export function Board() {

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
    obtenerTablero(1);
  },[]);
  

  return (
    <div className={styles.board}>
        <Nav_tablero />
        <section className={styles.board_lists}>
            <Task_Queue />
            <Task_Queue />
            <Task_Queue />
            <Task_Queue />
            <Task_Queue />
            <Task_Queue />
            <Task_Queue />
            <Task_Queue />
        </section>
    </div>
  )
}
