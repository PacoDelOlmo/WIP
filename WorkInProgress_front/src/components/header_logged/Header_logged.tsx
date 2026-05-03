import { useState } from 'react'
import styles from './Header_logged.module.css'
import LogoWip from './../../assets/img/WIP_SinLetra.png'
import { 
    Grip, BellRing, LifeBuoy, UserCircle2, Search, Settings, 
    LogOut, LayoutDashboard, Plus, Briefcase, // ✨ Añadimos Plus y Briefcase
    Check,
    X
} from 'lucide-react'
import type { UserCompleteDTO } from '../../pages/home/Home'
import { useAuthStore } from '../../store/Auth'
import { Link } from 'react-router'
import { WorkSpaceService, type WorkSpaceTO } from '../../services/WorkSpaceService'
import type { newElementTO } from '../../services/TaskQueueService'

interface HeaderProps {
    usuario: UserCompleteDTO,
}

export function Header_logged({usuario} : HeaderProps) {

    const logout = useAuthStore((state) => state.logout)
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
      const [isAddingWS, setIsAddingWS] = useState(false);
      const [newWorkSpaceTitle, setNewWorkSpaceTitle] = useState("");
      const [workspaces, setWorkspaces] = useState<WorkSpaceTO[]>(usuario.workspace);

    const toggleWorkspaceMenu = () => {
        setWorkspaceMenuOpen(!workspaceMenuOpen);
        if (!workspaceMenuOpen) setProfileMenuOpen(false);
    }

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
        if (!profileMenuOpen) setWorkspaceMenuOpen(false);
    }

    const handleCrearWorkSpace = async () => {
                if (newWorkSpaceTitle.trim() === "") return;
        
                const payload : newElementTO = { tittle: newWorkSpaceTitle };
        
                const idUsuario = usuario.id;
        
                try {
                    // Llamamos al backend
                    const espacioTrabajoCreado = await WorkSpaceService.createEspacioTrabajo(payload, idUsuario);
                    
                    setWorkspaces([...workspaces, espacioTrabajoCreado]);
        
                    setNewWorkSpaceTitle("");
                    setIsAddingWS(false);
                } catch (error) {
                    console.error("Error al crear el espacio de trabajo:", error);
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
                            <Grip size={30} />
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
                                    
                                    <hr />
                                    
                                    <li className={styles.add_workspace_container}>
                                        {isAddingWS ? (
                                            <div className={styles.add_workspace_form}>
                                                <input 
                                                    type="text" 
                                                    placeholder="Nombre del espacio..." 
                                                    className={styles.add_workspace_input}
                                                    value={newWorkSpaceTitle}
                                                    onChange={(e) => setNewWorkSpaceTitle(e.target.value)}
                                                    autoFocus
                                                    onKeyDown={(e) => e.key === "Enter" && handleCrearWorkSpace()}
                                                />
                                                <div className={styles.form_actions}>
                                                    <button 
                                                        className={styles.btn_confirm} 
                                                        onClick={handleCrearWorkSpace}
                                                    >
                                                        <Check size={16} /> Añadir
                                                    </button>
                                                    <button 
                                                        className={styles.btn_cancel} 
                                                        onClick={() => setIsAddingWS(false)}
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button 
                                                className={styles.btn_trigger_add} 
                                                onClick={() => setIsAddingWS(true)}
                                            >
                                                <Plus size={18} style={{marginRight: '8px'}}/> 
                                                Nuevo Espacio
                                            </button>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>

                    <li>
                        <Link to="/user/workspace" className={styles.WIP_button_container}>
                            <img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/>
                        </Link> 
                        <span className={styles.WIP_text}>WIP</span>
                    </li>
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
                        onClick={toggleProfileMenu}
                    >
                        <UserCircle2/>
                    </button>

                    {profileMenuOpen && (
                        <div className={styles.dropdown_menu}>
                            <div className={styles.user_info}>
                                <p className={styles.user_name}>{usuario.username}</p>
                                <span className={styles.user_role}>{usuario.mail}</span>
                            </div>
                            <hr />
                            <ul className={styles.dropdown_list}>
                                <li>
                                    <Link to='/user/perfil' onClick={() => setProfileMenuOpen(false)}>
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
                    )} 
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