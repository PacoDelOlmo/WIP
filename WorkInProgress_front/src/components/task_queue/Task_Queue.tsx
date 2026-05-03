import { Check, EllipsisVertical, Pencil, Plus, Trash, X } from "lucide-react";
import { Task } from "../task/Task";
import styles from "./Task_Queue.module.css";
import { useState } from "react";
import type { TaskQueueTO } from "../../services/TaskQueueService";
import {
  TaskService,
  type TaskTO,
  type newTaskTO,
} from "../../services/TaskService";
import { useAuthStore } from "../../store/Auth";

interface TaskQueueProps {
  queueData: TaskQueueTO;
  idTablero: number;
}

export function Task_Queue({ queueData, idTablero }: TaskQueueProps) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [tareas, setTareas] = useState<TaskTO[]>(queueData.tareas || []);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [nuevaTareaTit, setNuevaTareaTit] = useState<string>("");
  const user: number = useAuthStore((state) => state.idUsuario);

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

      setTareas([...tareas, tareaCreada]);

      setNuevaTareaTit("");
      setIsAdding(false);
    } catch (e) {
      console.error("Error al crear la tarea:", e);
    }
  };

  return (
    <section className={styles.pila_tareas}>
      <div className={styles.titulo_opciones}>
        <h3>{queueData.titulo}</h3>

        <button className={styles.option_button} onClick={toggleOptions}>
          <EllipsisVertical />
        </button>

        {optionsOpen && (
          <div className={styles.dropdown_menu}>
            <button className={styles.dropdown_item}>
              <Pencil size={18} />
              <span>Renombrar</span>
            </button>
            <hr className={styles.separator} />
            <button className={`${styles.dropdown_item} ${styles.danger}`}>
              <Trash size={18} />
              <span>Borrar Lista</span>
            </button>
          </div>
        )}
      </div>

      {tareas?.map((tarea, index) => (
        <Task key={index} taskData={tarea} listaName={queueData.titulo} listID={queueData.id} taskBoardID={idTablero}/>
      ))}

      {/* Lógica condicional de la interfaz (Input vs Botón) */}
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
          {/* Usamos las nuevas clases aquí */}
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
  );
}
