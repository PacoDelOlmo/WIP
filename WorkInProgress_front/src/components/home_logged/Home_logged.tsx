import React from 'react'
import styles from './Home_logged.module.css'
import WIP_Logo from "./../../assets/img/WIP_SinLetra.png";
import WIP_Logo_Letra from "./../../assets/img/WIP_Logo.png";
import { LockIcon, UserIcon, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router';



export function Home_logged() {
  return (
    <section className={styles.content_section}>
        <header className={styles.header_content}>
            <div className={styles.responsive_welcome}>
              <img src={WIP_Logo_Letra} alt="Logo usuario" className={styles.welcome_img} />
              <h2>Bienvenido <span>Usuario</span></h2>
            </div>
            <img src={WIP_Logo} alt="Imagen de usuario" className={styles.user_img} />
            <div className={styles.user_info}> 
                <h1><UserIcon className={styles.user_icon} />Espacio de trabajo de &nbsp;<span> USUARIO</span></h1>
                <Link to='' className={styles.header_link}> Tableros <ChevronRight size={'4vw'} /></Link>
            </div>
        </header>

        <article className={styles.boards_section}>
            <div className={styles.user_boards}>
                <div className={styles.board_button_link}>
                    <div className={styles.board_draw}></div>
                    <Link to=''className={styles.board_name}>Nombre del tablero</Link>
                </div>

                <div className={styles.board_button_add}>
                    <Link to=''> + Nuevo tablero</Link>
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
                <Clock className={styles.clock_icon}/>
                <p>Actividad Reciente</p>
            </div>
          </header>

          <div className={styles.recent_activity}>
            <div className={styles.board_button_activity}>
              <div className={styles.board_draw_activity}></div>
              
              <Link to=''className={styles.board_info}>
                <div>
                  <h3 className={styles.board_name}>Nombre del tablero</h3>
                  <h4 className={styles.board_date}>dd/mm/aaaa</h4>
                </div>
                <p className={styles.activity_details}>Has añadido tarea 1 a Nombre Lista</p>
              </Link>
            </div>
          </div>

          <div className={styles.recent_activity}>
            <div className={styles.board_button_activity}>
              <div className={styles.board_draw_activity}></div>
              
              <Link to=''className={styles.board_info}>
                <div>
                  <h3 className={styles.board_name}>Nombre del tablero</h3>
                  <h4 className={styles.board_date}>dd/mm/aaaa</h4>
                </div>
                <p className={styles.activity_details}>Has creado una nueva lista "Nueva Lista"</p>
              </Link>
            </div>
          </div>
        </article>
    </section>
  )
}
