import React from 'react'
import styles from './Home_logged.module.css'
import WIP_Logo from "./../../assets/img/WIP_SinLetra.png";
import WIP_Logo_Letra from "./../../assets/img/WIP_Logo.png";
import { LockIcon, UserIcon, ChevronRight, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import type { UserCompleteDTO } from '../../pages/home/Home'

interface UserProps {
    usuario: UserCompleteDTO
}

export function Home_logged({ usuario }: UserProps) {

  const navigate = useNavigate();

    const actividadesRecientes = usuario.workspace.flatMap(ws => 
        ws.tableros.flatMap(tablero => 
            tablero.listaTareas.flatMap(lista => 
                lista.tareas.map(tarea => ({
                    nombreTablero: tablero.nombreTablero,
                    nombreLista: lista.titulo,
                    tituloTarea: tarea.titulo,
                    fecha: new Date().toLocaleDateString() 
                }))
            )
        )
    ).slice(0, 3);

    return (
        <section className={styles.content_section}>
            <header className={styles.header_content}>
                <div className={styles.responsive_welcome}>
                    <img src={WIP_Logo_Letra} alt="Logo usuario" className={styles.welcome_img} />
                    <h2>Bienvenido <span>{usuario.username}</span></h2>
                </div>
                <img src={WIP_Logo} alt="Imagen de usuario" className={styles.user_img} />
                <div className={styles.user_info}>
                    <h1>
                        <UserIcon className={styles.user_icon} />
                        Espacio de trabajo de &nbsp;<span>{usuario.username}</span>
                    </h1>
                    <Link to='/user/tableros' className={styles.header_link}> Tableros <ChevronRight size={'4vw'} /></Link>
                </div>
            </header>

            <article className={styles.boards_section}>
                <div className={styles.user_boards}>
                    
                    {usuario.workspace?.flatMap((ws) => 
                        ws.tableros.map((tablero, index) => (
                            <div key={`${ws.nombre}-${index}`} className={styles.board_button_link}>
                                <div className={styles.board_draw}></div>
                                <Link to='' className={styles.board_name}>
                                    {tablero.nombreTablero}
                                </Link>
                            </div>
                        ))
                    )}

                    <div className={styles.board_button_add}>
                        <button> + Nuevo tablero</button>
                    </div>
                </div>
                <footer>
                    <button className={styles.secondary_button}> Ver todo</button>
                </footer>
            </article>

            <hr className={styles.separator} />

            <article>
                <header className={styles.recent_activity_header}>
                    <div className={styles.recent_activity_header_wrapper}>
                        <Clock className={styles.clock_icon} />
                        <p>Actividad Reciente</p>
                    </div>
                </header>

                {actividadesRecientes.length > 0 ? (
                    actividadesRecientes.map((actividad, index) => (
                        <div key={index} className={styles.recent_activity}>
                            <div className={styles.board_button_activity}>
                                <div className={styles.board_draw_activity}></div>

                                <Link to='' className={styles.board_info}>
                                    <div>
                                        <h3 className={styles.board_name}>{actividad.nombreTablero}</h3>
                                        <h4 className={styles.board_date}>{actividad.fecha}</h4>
                                    </div>
                                    <p className={styles.activity_details}>
                                        En lista "{actividad.nombreLista}": {actividad.tituloTarea}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{textAlign: 'center', padding: '1rem', color: 'gray'}}>
                        No hay actividad reciente
                    </p>
                )}

            </article>
        </section>
    )
}