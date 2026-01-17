import React from 'react'
import { Task_Queue } from '../task_queue/Task_Queue'
import styles from './Board.module.css'
import { Nav_tablero } from '../nav_tablero/Nav_tablero'

export function Board() {
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
