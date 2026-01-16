import styles from './Tableros.module.css'
import WIP_Logo from './../../assets/img/WIP_SinLetra.png'
import WIP_Logo_Letra from './../../assets/img/WIP_Logo.png'
import { Clock, UserIcon, ChevronRight } from 'lucide-react'
import { Link } from 'react-router'


export function Tableros() {
  return (
    <section className={styles.content_section}>
        <header className={styles.recent_activity_header}>
          <div className={styles.responsive_welcome}>
              <h2>Tus tableros</h2>
          </div>
          <div className={styles.recent_activity_header_wrapper}>
              <Clock className={styles.clock_icon}/>
              <p>Tableros usados recientemente</p>
          </div>
        </header>

        <article>
          <div className={styles.recent_activity}>
            <div className={styles.board_button_link}>
              <div className={styles.board_draw}></div>
              <Link to=''className={styles.board_name}>Nombre del tablero</Link>
            </div>
          </div>
        </article>

        <hr className={styles.separator} />

        <article className={styles.boards_section}>
          <header className={styles.header_content}>
            <img src={WIP_Logo} alt="Imagen de usuario" className={styles.user_img} />
            <div className={styles.user_info}> 
                <h1><UserIcon className={styles.user_icon} />Espacio de trabajo de &nbsp;<span> USUARIO</span></h1>
                <Link to='' className={styles.header_link}> Tableros <ChevronRight size={'4vw'} /></Link>
            </div>
          </header>
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

    </section>
  )
}
