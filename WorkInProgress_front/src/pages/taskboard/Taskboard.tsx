import React from 'react'
import { Header_logged_tablero } from '../../components/header_logged_tablero/Header_logged_tablero'
import { Board } from '../../components/board/Board'
import styles from './Taskboard.module.css'

export function Taskboard() {
  return (
    <div className={styles.contenedor_principal}>
        <Header_logged_tablero />
        <Board />
    </div>
  )
}
