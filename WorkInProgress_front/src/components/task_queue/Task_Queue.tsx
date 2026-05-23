import { ArrowLeft, Check, EllipsisVertical, Palette, Pencil, Plus, Trash, X } from "lucide-react";
import { Task } from "../task/Task";
import styles from "./Task_Queue.module.css";
import { useEffect, useState } from "react";
import  { TaskQueueService, type TaskQueueTO } from "../../services/TaskQueueService";
import {
  TaskService,
  type TaskTO,
  type newTaskTO,
} from "../../services/TaskService";
import { useAuthStore } from "../../store/Auth";
import { Droppable } from "@hello-pangea/dnd";
import { ConfirmModal } from "../modalConfirm/ConfirmModal";

const PALETA_COLORES = [
    { hex: '#EAEAEA', nombre: 'Gris Base' },
    { hex: '#A8D1D5', nombre: 'Verde Agua' },
    { hex: '#FBD5B9', nombre: 'Naranja Suave' },
    { hex: '#B3E5FC', nombre: 'Azul Cielo' },
    { hex: '#C8E6C9', nombre: 'Verde Menta' },
    { hex: '#FFF9C4', nombre: 'Amarillo Arena' },
    { hex: '#E1BEE7', nombre: 'Lavanda' },
    { hex: '#F8BBD0', nombre: 'Rosa Pálido' },
    { hex: '#E6B3B3', nombre: 'Rojo Pastel' }
];

interface TaskQueueProps {
  queueData: TaskQueueTO;
  idTablero: number;
  dragHandleProps?: any;
  onTareaCreada: (idLista: number, nuevaTarea: TaskTO) => void;
}

export function Task_Queue({ queueData, idTablero, dragHandleProps, onTareaCreada }: TaskQueueProps) {

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [tareas, setTareas] = useState<TaskTO[]>(queueData.tareas || []);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [nuevaTareaTit, setNuevaTareaTit] = useState<string>("");
  const user: number = useAuthStore((state) => state.idUsuario);
  const [currentTitle, setCurrentTitle] = useState(queueData.titulo);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isColorMenuMode, setIsColorMenuMode] = useState(false);
  const [currentColor, setCurrentColor] = useState(queueData.color || '#EAEAEA');

  const toggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };

  const handleCrearTarea = async () => {
    if (nuevaTareaTit.trim() === "") return;

    const nuevaTareaPayLoad: newTaskTO = {
      titulo: nuevaTareaTit,
      creador: user,
    };
    console.log(nuevaTareaPayLoad);
    try {
      const tareaCreada = await TaskService.createTask(nuevaTareaPayLoad,idTablero,queueData.id,);
      console.log(tareaCreada);

      onTareaCreada(queueData.id, tareaCreada);

      setNuevaTareaTit("");
      setIsAdding(false);
    } catch (e) {
      console.error("Error al crear la tarea:", e);
    }
  };

  const handleEditTitle = async () => {
    if (newTitle.trim() === "" || newTitle === currentTitle) {
      setIsEditingTitle(false);
      setNewTitle(currentTitle);
      return;
    }

    try {
      await TaskQueueService.editarNombreLista({ tittle: newTitle }, idTablero, queueData.id);
      
      setCurrentTitle(newTitle);
      setIsEditingTitle(false);
    } catch (error) {
      console.error("Error al renombrar la lista:", error);
    }
  };

  const handleDeleteLista = async () => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar la lista "${currentTitle}" y todas las tarjetas que contiene?`);
    if (!confirmar) return;

    try {
      await TaskQueueService.deleteLista(idTablero, queueData.id);

      setIsConfirmModalOpen(false);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error al borrar la lista:", error);
      alert("No se pudo eliminar la lista. Comprueba tu conexión.");
    }
  };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        setIsConfirmModalOpen(true);
        setOptionsOpen(false);
    };

    const handleColorChange = async (colorHex: string) => {
      if (colorHex === currentColor) return;
      
      setCurrentColor(colorHex);
      setOptionsOpen(false); 
      
      try {
          await TaskQueueService.editarColorLista({ tittle: colorHex }, idTablero, queueData.id);
      } catch (error) {
          console.error("Error al cambiar color de la lista:", error);
      }
  };

  useEffect(() => {
    setTareas(queueData.tareas || []);
  }, [queueData.tareas])

  if (isDeleted){
    return null;
  }

  return (
    <>
      <section className={styles.pila_tareas} style={{ background: currentColor || 'var(--gris-oscuro)' }}>
        <div className={styles.titulo_opciones} {...dragHandleProps}>
          {isEditingTitle ? (
              <input 
                  type="text"
                  className={styles.edit_title_input}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={handleEditTitle} 
                  onKeyDown={(e) => e.key === "Enter" && handleEditTitle()} 
                  autoFocus
              />
          ) : (
              <h3 
                  className={styles.editable_title} 
                  onClick={() => setIsEditingTitle(true)}
              >
                  {currentTitle}
              </h3>
          )}

          <button className={styles.option_button} onClick={toggleOptions}>
            <EllipsisVertical />
          </button>

          {optionsOpen && (
            <div className={styles.dropdown_menu}>
                {!isColorMenuMode ? (
                    <>
                        <button 
                            className={styles.dropdown_item} 
                            onClick={() => {
                                setIsEditingTitle(true);
                                setOptionsOpen(false);
                            }}
                        >
                            <Pencil size={18} />
                            <span>Renombrar</span>
                        </button>

                        <button className={styles.dropdown_item} onClick={() => setIsColorMenuMode(true)}>
                            <Palette size={18} />
                            <span>Cambiar Color</span>
                        </button>

                        <hr className={styles.separator} />

                        <button className={`${styles.dropdown_item} ${styles.danger}`} onClick={handleDeleteClick}>
                            <Trash size={18} />
                            <span>Borrar Lista</span>
                        </button>
                    </>
                ) : (
                    <div className={styles.color_palette_view}>
                        <div className={styles.palette_header}>
                            <button className={styles.icon_btn_small} onClick={() => setIsColorMenuMode(false)}>
                                <ArrowLeft size={16} />
                            </button>
                            <span>Color de lista</span>
                        </div>
                        <div className={styles.color_grid}>
                            {PALETA_COLORES.map(color => (
                                <div 
                                    key={color.hex}
                                    className={`${styles.color_swatch} ${currentColor === color.hex ? styles.selected : ''}`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => handleColorChange(color.hex)}
                                    title={color.nombre}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
          )}
        </div>

        <Droppable droppableId={String(queueData.id)} type="TASK">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.lista_scrollable}
            >
              {queueData.tareas?.map((tarea, index) => (
                <Task 
                  key={tarea.id || index} 
                  taskData={tarea} 
                  listaName={currentTitle} 
                  listID={queueData.id} 
                  taskBoardID={idTablero}
                  index={index}
                />
              ))}
              
              {provided.placeholder} 
            </div>
          )}
        </Droppable>


        {isAdding ? (
          <div className={styles.add_task_form}>
            <input
              type="text"
              placeholder="Introduce el título de la tarea..."
              value={nuevaTareaTit}
              onChange={(e) => setNuevaTareaTit(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleCrearTarea()}
            />

            <div className={styles.form_actions}>
              <button className={styles.btn_confirm} onClick={handleCrearTarea}>
                <Check size={18} />
              </button>
              <button
                className={styles.btn_cancel}
                onClick={() => setIsAdding(false)}
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <button
            className={styles.btn_nueva_tarea}
            onClick={() => setIsAdding(true)}
          >
            <Plus />
            <span> Añadir una tarjeta</span>
          </button>
        )}
      </section>
    
      <ConfirmModal 
                    isOpen={isConfirmModalOpen}
                    title="Eliminar Lista"
                    message="¿Estás seguro de que deseas eliminar esta lista de forma permanente? Esta acción no se puede deshacer."
                    itemName={queueData.titulo}
                    onConfirm={handleDeleteLista}
                    onCancel={() => setIsConfirmModalOpen(false)}
                />
    </>
  );
}
