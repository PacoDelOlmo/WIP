import { useState } from 'react'
import styles from './Header_logged.module.css'
import LogoWip from './../../assets/img/WIP_SinLetra.png'
import { Grip, BellRing, LifeBuoy, UserCircle2, Search, Settings, LogOut, LayoutDashboard } from 'lucide-react'


export function Header_logged() {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
    <>
        <header className={styles.navbar}>
            <nav className={styles.top_nav}>
                <ul>
                    <li><Grip size={30}  /></li>
                    <li><a href="" className={styles.WIP_button_container}><img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/></a> <span className={styles.WIP_text}>WIP</span></li>
                </ul>
            </nav>
            <div className={styles.search_group}>
                <div className={styles.search_bar}>
                    <Search />
                    <input type="text" placeholder="Buscar..."/>
                </div>
                <div className={styles.primary_button}><a href="">Buscar</a></div>
            </div>
            <div className={styles.btn_group}>
                <div className={styles.notification_button}><a href="#"><BellRing/></a></div>
                <div className={styles.help_button}><a href="#"><LifeBuoy/></a></div>
                <div className={styles.profile_container}>
                    <button 
                        className={styles.profile_button}
                        onClick={toggleMenu}
                    >
                        <UserCircle2/>
                    </button>

                    {menuOpen ? 
                        <div className={styles.dropdown_menu}>
                            <div className={styles.user_info}>
                                <p className={styles.user_name}>User Usuario</p>
                                <span className={styles.user_role}>user@usuario.us</span>
                            </div>
                            <hr />
                            <ul className={styles.dropdown_list}>
                                <li>
                                    <a href="/perfil">
                                        <Settings size={18} /> Configuración
                                    </a>
                                </li>
                                <li>
                                    <a href="/logout" className={styles.logout_link}>
                                        <LogOut size={18} /> Cerrar Sesión
                                    </a>
                                </li>
                            </ul>
                        </div> 
                        :
                        ''
                    } 
                </div>
            </div>

            <nav className={styles.mobile_bottom_nav}>
                <a href="#tableros" className={styles.nav_item}>
                    <LayoutDashboard size={24} />
                    <span>Tableros</span>
                </a>
                
                <a href="#ayuda" className={styles.nav_item}>
                    <LifeBuoy size={24} />
                    <span>Ayuda</span>
                </a>

                {/* El buscador aquí suele abrir un modal o pantalla nueva */}
                <a href="#buscar" className={`${styles.nav_item} ${styles.nav_search}`}>
                    <Search size={28} />
                    <span>Buscar</span>
                </a>

                <a href="#notificaciones" className={styles.nav_item}>
                    <BellRing size={24} />
                    <span>Notificaciones</span>
                </a>

                <a href="#perfil" className={styles.nav_item}>
                    <UserCircle2 size={24} />
                    <span>Perfil</span>
                </a>
            </nav>
        </header>
    </>
    )
}
