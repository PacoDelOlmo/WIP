import { useState } from 'react'
import styles from './Header_logged.module.css'
import LogoWip from './../../assets/img/WIP_SinLetra.png'
import { Grip, BellRing, LifeBuoy, UserCircle2, Search, Settings, LogOut, LayoutDashboard } from 'lucide-react'
import type { UserCompleteDTO } from '../../pages/home/Home'
import { useAuthStore } from '../../store/Auth'
import { Link } from 'react-router'

interface HeaderProps {
    usuario: UserCompleteDTO,
}

export function Header_logged({usuario} : HeaderProps) {

    const logout = useAuthStore((state) => state.logout)

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
                    <li><Link to="/user/workspace" className={styles.WIP_button_container}><img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/></Link> <span className={styles.WIP_text}>WIP</span></li>
                </ul>
            </nav>
            <div className={styles.search_group}>
                <div className={styles.search_bar}>
                    <Search />
                    <input type="text" placeholder="Buscar..."/>
                </div>
                <div className={styles.primary_button}><Link to="">Buscar</Link></div>
            </div>
            <div className={styles.btn_group}>
                <div className={styles.notification_button}><Link to="#"><BellRing/></Link></div>
                <div className={styles.help_button}><Link to="#"><LifeBuoy/></Link></div>
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
                                <p className={styles.user_name}>{usuario.username}</p>
                                <span className={styles.user_role}>{usuario.mail}</span>
                            </div>
                            <hr />
                            <ul className={styles.dropdown_list}>
                                <li>
                                    <Link to='/user/perfil'>
                                        <Settings size={18} /> Configuración
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={logout} className={styles.logout_link}>
                                        <LogOut size={18} /> Cerrar Sesión
                                    </button>
                                </li>
                            </ul>
                        </div> 
                        :
                        ''
                    } 
                </div>
            </div>

            <nav className={styles.mobile_bottom_nav}>
                <Link to="/user/tableros" className={styles.nav_item}>
                    <LayoutDashboard size={24} />
                    <span>Tableros</span>
                </Link>
                
                <Link to="/ayuda" className={styles.nav_item}>
                    <LifeBuoy size={24} />
                    <span>Ayuda</span>
                </Link>

                <Link to="#buscar" className={`${styles.nav_item} ${styles.nav_search}`}>
                    <Search size={28} />
                    <span>Buscar</span>
                </Link>

                <Link to="/notificaciones" className={styles.nav_item}>
                    <BellRing size={24} />
                    <span>Notificaciones</span>
                </Link>

                <Link to="/user/perfil" className={styles.nav_item}>
                    <UserCircle2 size={24} />
                    <span>Perfil</span>
                </Link>
            </nav>
        </header>
    </>
    )
}
