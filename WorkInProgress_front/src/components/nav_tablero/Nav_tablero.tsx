import styles from './Nav_Tablero.module.css'
import LogoWip from './../../assets/img/WIP_SinLetra.png'
import { EllipsisVertical, Pencil, XCircle, Share2, Bell, Filter, X } from 'lucide-react'
import { useState } from 'react'


export function Nav_tablero() {

    const [optionsActive, setOptionsActive] = useState(false);

    const toggleOptionsActive = () => {
        setOptionsActive(!optionsActive);
    }

  return (
    <>
        <nav className={styles.navbar}>
            <div className={styles.left_section}>

                <div className={styles.desktop_left_section}>
                    <h3 className={styles.titulo_tablero}>Nombre del tablero</h3>
                    <a href="" className={styles.logo_container}>
                        <img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/>
                    </a>
                </div>

                <div className={styles.mobile_left_section}>
                    <button className={styles.icon_transparent}>
                        <X size={28} />
                    </button>
                    <div className={styles.mobile_tittles}>
                        <h3 className={styles.titulo_tablero}>Nombre del tablero</h3>
                        <span className={styles.subtitulo_tablero}>Espacio de trabajo de USER</span>
                    </div>
                </div>
            </div>

            <div className={styles.right_section}>
                <div className={styles.mobile_actions}>
                    <button className={styles.icon_transparent}><Filter size={24}/></button>
                    <button className={styles.icon_transparent}><Bell size={24}/></button>
                </div>
                
                <div className={styles.options_container}>
                    <button 
                    className={`${styles.option_button} ${styles.desktop_option_btn}`}
                    onClick={toggleOptionsActive}
                    >
                    <EllipsisVertical/>
                    </button>

                    {optionsActive && ( /* o también optionsActive ? true : false */
                        <div className={styles.dropdown_menu}>
                            <button className={styles.dropdown_item}>
                                <Pencil size={18} />
                                <span>Renombrar</span>
                            </button>

                            <button className={styles.dropdown_item}>
                                <Share2 size={18} />
                                <span>Compartir</span>
                            </button>
                            
                            <hr className={styles.separator} />

                            <button className={`${styles.dropdown_item} ${styles.danger}`}>
                                <XCircle size={18} />
                                <span>Cerrar tablero</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    </>
  )
}
