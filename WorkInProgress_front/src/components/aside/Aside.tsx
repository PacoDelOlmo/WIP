import React, { useState } from 'react'
import styles from './Aside.module.css'
import {ChevronDown, ChevronUp, Columns4, FolderKanban, House, Settings2, Users2} from 'lucide-react'

export function Aside() {

    const [espaciosDesplegado, setEspaciosDesplegado] = useState(false);

    const toggleEspacios = () => {
        setEspaciosDesplegado(!espaciosDesplegado);
    }


  return (
    <>
    <aside className={styles.aside}>
        <ul>
            <li className={styles.asideElement}><a href=""><Columns4 /> <span>Tableros</span> </a></li>
            <li className={styles.asideElement}><a href=""><House /> <span>Inicio</span> </a></li>
        </ul>
        <hr/>
        <div>
            <div className={styles.dropdown} onClick={toggleEspacios} style={{cursor: 'pointer'}}>
                <a href="#" onClick={(e) => e.preventDefault()}><FolderKanban /> <span>Espacios de trabajo de User</span></a>
                <button>{espaciosDesplegado ? <ChevronDown /> : <ChevronUp/>}</button>
            </div>
            <div className={`${styles.accordion} ${espaciosDesplegado ? styles.accordionOpen : ''}`}>
                <div className={styles.accordionContent}>
                    <ul>
                        <li className={`${styles.asideElement} ${styles.selected}`}>
                            <a href=""><Columns4 /> <span>Tableros</span></a>
                        </li>
                        <li className={styles.asideElement}>
                            <a href=""><Users2 /> <span>Componentes</span></a>
                        </li>
                        <li className={styles.asideElement}>
                            <a href=""><Settings2 /> <span>Ajustes</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </aside>
    </>
  )
}
