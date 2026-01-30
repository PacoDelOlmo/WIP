import React from 'react'
import styles from './Tableros.module.css'
import WIP_Logo from './../../assets/img/WIP_SinLetra.png'
import { Clock, UserIcon, ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import type { UserCompleteDTO } from '../../pages/home/Home'

interface UserProps {
    usuario: UserCompleteDTO
}

export function Tableros({ usuario }: UserProps) {

  const tablerosRecientes = usuario.workspace?.flatMap(ws => ws.tableros).slice(0, 2) || [];

  return (
    <section className={styles.content_section}>
        <header className={styles.recent_activity_header}>
          <div className={styles.responsive_welcome}>
              <h2>Tus tableros</h2>
          </div>
          <div className={styles.recent_activity_header_wrapper}>
              <Clock className={styles.clock_icon}/>
              <p>Tableros creados recientemente</p>
          </div>
        </header>

        <div className={styles.recent_activity_wrapper}>
          {tablerosRecientes.length > 0 ? (
            tablerosRecientes.map((tablero) => (
                <div key={`recent-${tablero.nombreTablero}`} className={styles.board_button_link}>
                  <div className={styles.board_draw}></div>
                  <Link to={`/user/tablero/${tablero.id}`} className={styles.board_name}>
                    {tablero.nombreTablero}
                  </Link>
                </div>
            ))
          ) : (
             <p className={styles.board_name} style={{paddingLeft: '1rem'}}>No hay tableros recientes</p>
          )}
        </div>
          


        <hr className={styles.separator} />

        {usuario.workspace?.map((ws, index) => (
          <article key={ws.nombre + index} className={styles.boards_section}>
            
            <header className={styles.header_content}>
              <img src={WIP_Logo} alt="Imagen de usuario" className={styles.user_img} />
              <div className={styles.user_info}> 
                  <h1>
                    <UserIcon className={styles.user_icon} />
                    Espacio de trabajo&nbsp;<span>{ws.nombre}</span>
                  </h1>
                  <Link to='/user/tableros' className={styles.header_link}> Tableros <ChevronRight size={'4vw'} /></Link>
              </div>
            </header>

              <div className={styles.user_boards}>
                  {ws.tableros.map((tablero) => (
                    <div key={tablero.id} className={styles.board_button_link}>
                        <div className={styles.board_draw}></div>
                        <Link to={`/user/tablero/${tablero.id}`} className={styles.board_name}>
                          {tablero.nombreTablero}
                        </Link>
                    </div>
                  ))}

                  <div className={styles.board_button_add}>
                      <Link to={`/user/crear-tablero?ws=${ws.nombre}`}> + Nuevo tablero</Link>
                  </div>
              </div>
              <footer>
                  <button className={styles.secondary_button}> Ver todo</button>
              </footer>
          </article>
        ))}

    </section>
  )
}