import { EllipsisVertical, Pencil, Plus, Trash } from "lucide-react";
import { Task } from "../task/Task";
import styles from './Task_Queue.module.css'
import { useState } from "react";


export function Task_Queue() {

  const [optionsOpen, setOptionsOpen] = useState(false)

  const toggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  }

  return (
    <section className={styles.pila_tareas}>
        <div className={styles.titulo_opciones}>
            <h3>Nombre de la lista</h3>
            <button
                  className={styles.option_button} 
                  onClick={toggleOptions}>
              <EllipsisVertical />
            </button>
            
            {optionsOpen && ( /* o también optionsActive ? true : false */
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

        <Task/>
        <Task/>
        <Task/>
        <button className={styles.btn_nueva_tarea}><Plus /><span> Añadir una tarjeta</span></button>
    </section>
  )
}
