import React, { useEffect, useState } from 'react'
import { Task_Queue } from '../task_queue/Task_Queue'
import styles from './Board.module.css'
import { Nav_tablero } from '../nav_tablero/Nav_tablero'
import { TaskBoardService } from '../../services/TaskBoardService';
import { useParams } from 'react-router';
import { Plus, Check, X } from 'lucide-react';
import {TaskQueueService} from '../../services/TaskQueueService';

import type { BoardTO, OrdenListas, OrdenTareas } from '../../services/TaskBoardService';
import type { newElementTO } from '../../services/TaskQueueService';

import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import type { TaskTO } from '../../services/TaskService';
import { ConfirmModal } from '../modalConfirm/ConfirmModal';
import { usePageTitle } from '../../hooks/usePageTittle';


export function Board() {

  const { id } = useParams();
  const [board, setBoard] = useState<BoardTO | null>(null);
  const [error, setError] = useState<String | null>();
  const [idWS, setIdWs] = useState<number>(-1);

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

  async function obtenerIdWorkspace(idTablero: number) {
    try {
      let response = await TaskBoardService.getIdWS(idTablero);
      setIdWs(response);
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
      obtenerIdWorkspace(idTablero);
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

  // FUNCIONALIDAD DRAG & DROP
  const handleDragEnd = async (result: DropResult) => {
    const {source, destination, draggableId, type} = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index){
      return;
    }

    if (!board || !board.listaTareas) return;

    //Modificación Orden de las listas
    if (type === 'LIST'){
      const nuevasListas = Array.from(board.listaTareas);
      
      const [listaMovida] = nuevasListas.splice(source.index, 1);

      nuevasListas.splice(destination.index, 0, listaMovida);

      setBoard({...board, listaTareas: nuevasListas});

      try {
        let ordenListas : number[] = [];
        nuevasListas.map(lista => ordenListas.push(lista.id));
        console.log(ordenListas);

        const nuevoOrden: OrdenListas = { 
          idTablero: Number(id),
          listas: ordenListas
        };

        const ordenActualizado = await TaskBoardService.updateOrdenListas(Number(id), nuevoOrden);
        console.log(ordenActualizado);
      } catch (e) {
        console.error("Error al actualizar el tablero", e);
      }
      return;
    }

    const sourceListId = Number(source.droppableId);
    const destinationListId = Number(destination.droppableId);

    const sourceList = board.listaTareas.find(lista => lista.id === sourceListId);
    const destinationList = board.listaTareas.find(lista => lista.id === destinationListId);

    if (!sourceList || !destinationList) return;

    // Mover dentro de la misma lista
    if (sourceListId === destinationListId){
      const nuevasTareas = Array.from(sourceList.tareas || []);

      const [tareaMovida] = nuevasTareas.splice(source.index, 1);
      
      nuevasTareas.splice(destination.index, 0, tareaMovida);

      const nuevasListas = board.listaTareas.map(lista => {
        if (lista.id === sourceListId) {
          return {...lista, tareas: nuevasTareas}
        }
        return lista;
      });

      setBoard({...board, listaTareas: nuevasListas});

      try {
        let ordenTareasLista : number[] = [];
        nuevasTareas.map(tarea => ordenTareasLista.push(tarea.id));
        console.log(ordenTareasLista);

        const nuevoOrden: OrdenTareas = { 
          idLista: sourceListId,
          tareas: ordenTareasLista,
        };

        const ordenActualizado = await TaskBoardService.updateOrdenTareasLista(Number(id), sourceListId, nuevoOrden);
        console.log(ordenActualizado);
      } catch (e) {
        console.error("Error al actualizar el tablero", e);
      }

      return;
    }

    //Mover entre listas
    if (sourceListId !== destinationListId){
      const sourceTareas = Array.from(sourceList.tareas || []);
      const destinationTareas = Array.from(destinationList.tareas || []);

      const [tareaMovida] = sourceTareas.splice(source.index, 1);
      destinationTareas.splice(destination.index, 0, tareaMovida);

      const nuevasListas = board.listaTareas.map(lista => {
        if (lista.id === sourceListId) {
          return { ...lista, tareas: sourceTareas }; 
        }
        if (lista.id === destinationListId) {
          return { ...lista, tareas: destinationTareas };
        }
        return lista;
      });

      setBoard({...board, listaTareas: nuevasListas});

      // Llamada a la API pasandole el orden nuevo del tablero.
      try {
        let ordenTareasListaOrigen : number[] = [];
        sourceTareas.map(tarea => ordenTareasListaOrigen.push(tarea.id));
        console.log(ordenTareasListaOrigen);

        let ordenTareasListaDestino : number[] = [];
        destinationTareas.map(tarea => ordenTareasListaDestino.push(tarea.id));
        console.log(ordenTareasListaDestino);

        const nuevoOrdenOrigen: OrdenTareas = { 
          idLista: sourceListId,
          tareas: ordenTareasListaOrigen,
        };

        const nuevoOrdenDestino: OrdenTareas = { 
          idLista: destinationListId,
          tareas: ordenTareasListaDestino,
        };
        
        const ordenActualizadoDestino = await TaskBoardService.updateOrdenTareasLista(Number(id), destinationListId, nuevoOrdenDestino);
        console.log(ordenActualizadoDestino);
        const ordenActualizadoOrigen = await TaskBoardService.updateOrdenTareasLista(Number(id), sourceListId, nuevoOrdenOrigen);
        console.log(ordenActualizadoOrigen);
        
      } catch (e) {
        console.error("Error al actualizar el tablero", e);
      }
      return;
    }
  }

  const handleAñadirTareaALista = (idLista: number, nuevaTarea: TaskTO) => {
    if (!board || !board.listaTareas) return;

    const nuevasListas = board.listaTareas.map((lista) => {
      if (lista.id === idLista) {
        return {
          ...lista,
          tareas: [...(lista.tareas || []), nuevaTarea],
        };
      }
      return lista;
    });

    setBoard({ ...board, listaTareas: nuevasListas });
  };

  const updateBoardColor = (nuevoColor: string) => {
    if (board) {
      setBoard({ ...board, color: nuevoColor });
    }
  };

  return (
    <>
      <div className={styles.board} style={{ background: board?.color || 'var(--gris-oscuro)' }}>
        <Nav_tablero 
            tittle={board?.nombreTablero} 
            id={board?.id} 
            idWS={idWS}
            colorActual={board?.color}
            onUpdateColor={updateBoardColor}
        />

        <DragDropContext onDragEnd={handleDragEnd} >
          <section className={styles.board_lists}>
            <Droppable droppableId="board-lists" direction="horizontal" type="LIST">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ display: 'flex', gap: '1rem', height: '100%', alignItems: 'flex-start' }}
                >
                  {board?.listaTareas?.map((lista, index) => (
                    <Draggable key={lista.id} draggableId={`list-${lista.id}`} index={index}>
                      {(providedDraggable) => (
                        <div
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          style={{
                            ...providedDraggable.draggableProps.style,
                            height: 'fit-content' 
                          }}
                        >
                          <Task_Queue
                            queueData={lista}
                            idTablero={board.id}
                            dragHandleProps={providedDraggable.dragHandleProps}
                            onTareaCreada={handleAñadirTareaALista}
                          />
                        </div>
                      )}
                    </Draggable>

                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            

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
        </DragDropContext>
        
      </div>
    </>
  )
}