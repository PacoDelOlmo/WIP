import { useEffect, useState } from 'react'
import styles from './Header_logged_tablero.module.css'
import LogoWip from './../../assets/img/WIP_SinLetra.png'
import { Grip, BellRing, LifeBuoy, UserCircle2, Search, Settings, LogOut, LayoutDashboard, Briefcase } from 'lucide-react'
import { Link, useNavigate } from 'react-router';
import { WorkSpaceService, type WorkSpaceTO } from '../../services/WorkSpaceService';
import { useAuthStore } from '../../store/Auth';


export function Header_logged_tablero() {

    const logout = useAuthStore((state) => state.logout)
    const [menuOpen, setMenuOpen] = useState(false);
    const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
    const [workspaces, setWorkspaces] = useState<WorkSpaceTO[]>([]);
    const user = useAuthStore((state) => state.idUsuario);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const toggleWorkspaceMenu = () => {
        setWorkspaceMenuOpen(!workspaceMenuOpen);
        if (!workspaceMenuOpen) setMenuOpen(false);
    }

    useEffect(() => {
        obtenerWsUser(user);
    }, [user]);

    async function obtenerWsUser(idUser: number){
        try {
            let response = await WorkSpaceService.getWorkSpaces(idUser);
            setWorkspaces(response);
            //console.log(response);
        } catch (e) {
            console.error(e);
        }
    }

    const handleSearch = () => {
        if (searchTerm.trim() !== "") {
            navigate(`/user/resultados?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
        }
    };

    return (
    <>
        <header className={styles.navbar}>
            <nav className={styles.top_nav}>
                <ul>
                    <li className={styles.workspace_menu_wrapper} style={{position: 'relative'}}>
                        <button 
                            onClick={toggleWorkspaceMenu} 
                            style={{background: 'none', border: 'none', cursor: 'pointer', color: 'inherit'}}
                        >
                            <Grip size={30} color='white'/>
                        </button>

                        {workspaceMenuOpen && (
                            <div className={styles.dropdown_menu} style={{left: 0, right: 'auto', width: '250px', top: '120%'}}>
                                <div className={styles.user_info}>
                                    <p className={styles.user_name}>Tus Espacios</p>
                                </div>
                                <hr />
                                <ul className={styles.dropdown_list}>
                                    {workspaces?.length > 0 ? (
                                        workspaces.map((ws, index) => (
                                            <li key={`${ws.nombre}-${index}`}>
                                                <Link to={`/user/workspace/${ws.id}`} onClick={() => setWorkspaceMenuOpen(false)}>
                                                    <Briefcase size={16} style={{marginRight: '8px'}}/> 
                                                    {ws.nombre}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li style={{padding: '0.5rem', fontSize: '0.8rem', color: '#888'}}>
                                            No tienes espacios aún
                                        </li>
                                    )}
                                    </ul>
                            </div>
                        )}
                    </li>
                    <li><Link to={"/user/home"}><img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/></Link></li>
                </ul>
            </nav>
            <div className={styles.search_group}>
                <div className={styles.search_bar}>
                    <Search />
                    <input 
                        type="text" 
                        placeholder="Buscar tableros, tareas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <div className={styles.primary_button}>
                    <button onClick={handleSearch}>
                        Buscar
                    </button>
                </div>
            </div>
            <div className={styles.btn_group}>
                <div className={styles.notification_button}><a href="#"><BellRing/></a></div>
                <div className={styles.help_button}><Link to={"/user/ayuda"}><LifeBuoy/></Link></div>
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
                <Link to={"/user/tableros"} className={styles.nav_item}>
                    <LayoutDashboard size={24} />
                    <span>Tableros</span>
                </Link>
                
                <Link to={"/user/ayuda"} className={styles.nav_item}>
                    <LifeBuoy size={24} />
                    <span>Ayuda</span>
                </Link>

                <Link to="#buscar" className={`${styles.nav_item} ${styles.nav_search}`}>
                    <Search size={28} />
                    <span>Buscar</span>
                </Link>

                <Link to="#notificaciones" className={styles.nav_item}>
                    <BellRing size={24} />
                    <span>Notificaciones</span>
                </Link>

                <Link to={'/user/perfil'} className={styles.nav_item}>
                    <UserCircle2 size={24} />
                    <span>Perfil</span>
                </Link>
            </nav>
        </header>
    </>
    )
}
