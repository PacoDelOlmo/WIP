import React, { useState } from 'react'
import styles from './Aside.module.css'
import {ChevronDown, ChevronUp, Columns4, FolderKanban, House, Settings2, Users2} from 'lucide-react'
import type { UserCompleteDTO } from '../../pages/home/Home';
import { Link } from 'react-router';

interface HeaderProps {
    usuario: UserCompleteDTO,
}

export function Aside({usuario} : HeaderProps) {

    const [espaciosDesplegado, setEspaciosDesplegado] = useState(false);

    const toggleEspacios = () => {
        setEspaciosDesplegado(!espaciosDesplegado);
    }


  return (
    <>
    <aside className={styles.aside}>
        <ul>
            <li className={styles.asideElement}><Link to="/user/tableros"><Columns4 /> <span>Tableros</span> </Link></li>
            <li className={styles.asideElement}><Link to="/user/home"><House /> <span>Inicio</span> </Link></li>
        </ul>
        <hr/>
        <div>
            <div className={styles.dropdown} onClick={toggleEspacios} style={{cursor: 'pointer'}}>
                <a href="#" onClick={(e) => e.preventDefault()}><FolderKanban /> <span>Espacios de trabajo de {usuario.username}</span></a>
                <button>{espaciosDesplegado ? <ChevronDown /> : <ChevronUp/>}</button>
            </div>
            <div className={`${styles.accordion} ${espaciosDesplegado ? styles.accordionOpen : ''}`}>
                <div className={styles.accordionContent}>
                    <ul>
                        <li className={`${styles.asideElement} ${styles.selected}`}>
                            <Link to='/user/tableros'><Columns4 /> <span>Tableros</span></Link>
                        </li>
                        <li className={styles.asideElement}>
                            <Link to=''><Users2 /> <span>Componentes</span></Link>
                        </li>
                        <li className={styles.asideElement}>
                            <Link to='/user/perfil'><Settings2 /> <span>Ajustes</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </aside>
    </>
  )
}
