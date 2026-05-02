import { EllipsisVertical, Pencil, Plus, Trash } from "lucide-react";
import { Task, } from "../task/Task";
import styles from './Task_Queue.module.css'
import type { TaskTO } from "../../services/TaskService";
import { useState } from "react";


export interface QueueDTO {
    titulo: string;
    tareas: TaskTO[]; 
}

interface TaskQueueProps {
    queueData: QueueDTO;
}


export function Task_Queue({ queueData }: TaskQueueProps) {

  const [optionsOpen, setOptionsOpen] = useState(false)

  const toggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  }

  return (
    <section className={styles.pila_tareas}>
        <div className={styles.titulo_opciones}>
            
            <h3>{queueData.titulo}</h3>
            
            <button
                  className={styles.option_button} 
                  onClick={toggleOptions}>
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

        {/* NOTA PARA TU PRÓXIMO PASO: 
            Aquí harás exactamente lo mismo: queueData.tareas.map(...) 
            para renderizar las tarjetas dinámicamente */}
        {queueData?.tareas?.map((tarea, index) => (
          <Task
            key={index}
            taskData={tarea}
            listaName={queueData.titulo}
          />
        ))}
        <button className={styles.btn_nueva_tarea}><Plus /><span> Añadir una tarjeta</span></button>
    </section>
  )
}