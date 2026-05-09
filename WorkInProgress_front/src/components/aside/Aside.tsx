import React, { useState } from 'react'
import styles from './Aside.module.css'
import {ChevronDown, ChevronUp, Columns4, FolderKanban, House, Settings2, Users2} from 'lucide-react'
import type { UserCompleteDTO } from '../../pages/home/Home';
import { Link } from 'react-router';

interface HeaderProps {
    usuario: UserCompleteDTO,
}

export function Aside({usuario} : HeaderProps) {

    const [espaciosDesplegado, setEspaciosDesplegado] = useState<Record<number, boolean>>({});
    
    const toggleEspacios = (id: number) => {
        setEspaciosDesplegado(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }


  return (
    <>
    <aside className={styles.aside}>
        <ul>
            <li className={styles.asideElement}><Link to="/user/tableros"><Columns4 /> <span>Tableros</span> </Link></li>
            <li className={styles.asideElement}><Link to="/user/home"><House /> <span>Inicio</span> </Link></li>
        </ul>

        {usuario.workspace.length > 0 ?
            (usuario.workspace.map((ws) => {
                const isOpen = espaciosDesplegado[ws.id] || false;

                return (
                    <React.Fragment key={ws.id}> 
                        <hr />
                        <div>
                            <div 
                                className={styles.dropdown} 
                                onClick={() => toggleEspacios(ws.id)} 
                                style={{ cursor: 'pointer' }}
                            >
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    <FolderKanban /> <span>{ws.nombre}</span>
                                </a>
                                <button>{isOpen ? <ChevronDown /> : <ChevronUp />}</button>
                            </div>
                            
                            <div className={`${styles.accordion} ${isOpen ? styles.accordionOpen : ''}`}>
                                <div className={styles.accordionContent}>
                                    <ul>
                                        <li className={`${styles.asideElement} ${styles.selected}`}>
                                            <Link to={`/user/workspace/${ws.id}`}>
                                                <Columns4 /> <span>Tableros</span>
                                            </Link>
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
                    </React.Fragment>
                );
            }))
            : ''}

    </aside>
    </>
  )
}
