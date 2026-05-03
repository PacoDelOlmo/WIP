import React, { useEffect, useState } from 'react'
import { Task_Queue } from '../task_queue/Task_Queue'
import styles from './Board.module.css'
import { Nav_tablero } from '../nav_tablero/Nav_tablero'
import { TaskBoardService } from '../../services/TaskBoardService';
import { useParams } from 'react-router';
import { Plus, Check, X } from 'lucide-react';
import {TaskQueueService} from '../../services/TaskQueueService';

import type { BoardTO } from '../../services/TaskBoardService';
import type { newElementTO } from '../../services/TaskQueueService';


export function Board() {

  const { id } = useParams();
  const [board, setBoard] = useState<BoardTO | null>(null);
  const [error, setError] = useState<String | null>();

  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  async function obtenerTablero(idTablero: number) {
    try {
      let response = await TaskBoardService.getTablero(idTablero);
      setBoard(response);
      console.log(response);
    } catch (e) {
      console.error(e);
      setError('Error de conexión con el servidor');
    }
  }

  useEffect(() => {
    if (id) {
      let idTablero = Number(id);
      obtenerTablero(idTablero);
    }
  }, [id]);

  const handleCrearLista = async () => {
    if (newListTitle.trim() === "") return;
    if (!board) return;

    try {
      const listaCreada: newElementTO = { 
        tittle: newListTitle,
      };

      const nuevaLista = await TaskQueueService.createTaskQueue(listaCreada, Number(id));

      setBoard({
        ...board,
        listaTareas: [...(board.listaTareas || []), nuevaLista]
      });

      setNewListTitle("");
      setIsAddingList(false);
    } catch (e) {
      console.error("Error al crear la lista:", e);
    }
  };

  return (
    <div className={styles.board}>
      <Nav_tablero tittle={board?.nombreTablero} id={board?.id} />

      <section className={styles.board_lists}>

        {board?.listaTareas?.map((lista, index) => (
          <Task_Queue
            key={lista.id || index} 
            queueData={lista}
            idTablero={board.id}
          />
        ))}

        <div className={styles.add_list_container}>
          {isAddingList ? (
            <div className={styles.add_list_form}>
              <input
                type="text"
                placeholder="Introduzca el título de la lista..."
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleCrearLista()}
              />
              <div className={styles.form_actions}>
                <button className={styles.btn_confirm} onClick={handleCrearLista}>
                  <Check size={18} /> Añadir lista
                </button>
                <button className={styles.btn_cancel} onClick={() => setIsAddingList(false)}>
                  <X size={18} />
                </button>
              </div>
            </div>
          ) : (
            <button className={styles.btn_add_list} onClick={() => setIsAddingList(true)}>
              <Plus size={20} /> Añadir otra lista
            </button>
          )}
        </div>

      </section>
    </div>
  )
}