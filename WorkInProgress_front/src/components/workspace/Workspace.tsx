import styles from './Workspace.module.css'
import WIP_Logo from './../../assets/img/WIP_Logo.png'
import { ChevronRight, LockIcon, UserIcon } from 'lucide-react'
import { Link, useParams } from 'react-router'
import type { UserCompleteDTO, WorkspaceType } from '../../pages/home/Home'
import { useEffect, useState } from 'react'

interface UserProps {
    usuario: UserCompleteDTO
}

export function Workspace({ usuario }: UserProps) {

    const [workspace, setWorkspace] = useState<WorkspaceType | null>(null)
    const {id} = useParams();

    useEffect(()=>{
        usuario.workspace?.map((ws) => {
        if (id){
            if (ws.id == parseInt(id) ){
                setWorkspace(ws);
            }
        }
    })
    },[usuario])
    

  return (
    <section className={styles.content_section}>
        <header className={styles.header_content}>
            <img src={WIP_Logo} alt="Imagen de usuario" className={styles.user_img} />
            <div className={styles.user_info}>
                <h1>Espacio de trabajo de <span>{usuario.username}</span></h1>
                <div>
                    <LockIcon />
                    <p>Privado</p>
                </div>
            </div>
        </header>

        <hr />

        {workspace ? (
            <article key={`${workspace.nombre}-${workspace.id}`} className={styles.boards_section}>
                
                <header className={styles.boards_article_header}>
                    <div className={styles.boards_article_header_wrapper}>
                        <UserIcon className={styles.user_icon}/>
                        <p>{workspace.nombre}</p>
                    </div>
                    
                    <Link to='' className={styles.header_link}> Tableros <ChevronRight size={'4vw'} /></Link>
                </header>

                <div className={styles.user_boards}>
                    
                    {workspace.tableros.length > 0 ? (
                        workspace.tableros.map((tablero) => (
                            <div key={tablero.id} className={styles.board_button_link}>
                                <div className={styles.board_draw}></div>
                                <Link to={`/user/tablero/${tablero.id}`} className={styles.board_name}>
                                    {tablero.nombreTablero}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className={styles.board_name} style={{padding: '0 1rem', color: '#888'}}>
                            No hay tableros en este espacio
                        </p>
                    )}


                    <div className={styles.board_button_add}>
                        <Link to={`/user/crear-tablero?ws=${workspace.nombre}`}> + Nuevo tablero</Link>
                    </div>
                </div>

                <footer>
                    <button className={styles.secondary_button}> Ver los tableros completos</button>
                </footer>
            </article>
        ) : ''
    }
    </section>
  )
}