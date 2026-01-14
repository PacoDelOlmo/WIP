import styles from './Workspace.module.css'
import WIP_Logo from './../../assets/img/WIP_Logo.png'
import { ChevronRight, LockIcon, UserIcon } from 'lucide-react'
import { Link } from 'react-router'

export function Workspace() {
  return (
    <section className={styles.content_section}>
        <header className={styles.header_content}>
            <img src={WIP_Logo} alt="Imagen de usuario" className={styles.user_img} />
            <div className={styles.user_info}>
                <h1>Espacio de trabajo de <span>USUARIO</span></h1>
                <div>
                    <LockIcon />
                    <p>Privado</p>
                </div>
            </div>
        </header>

        <hr />

        <article className={styles.boards_section}>
            <header className={styles.boards_article_header}>
                <div className={styles.boards_article_header_wrapper}>
                    <UserIcon className={styles.user_icon}/>
                    <p>Bienvenido USUARIO</p>
                </div>
                
                <Link to='' className={styles.header_link}> Tableros <ChevronRight size={'4vw'} /></Link>
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
                <button className={styles.secondary_button}> Ver los tableros completos</button>
            </footer>
        </article>
    </section>
  )
}
