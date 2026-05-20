import styles from './Nav_Tablero.module.css'
import LogoWip from './../../assets/img/WIP_SinLetra.png'
import { EllipsisVertical, Pencil, XCircle, Share2, Bell, Filter, X, ArrowLeft, Palette } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/Auth';
import { TaskBoardService } from '../../services/TaskBoardService';
import { Link, useNavigate } from 'react-router';
import { ConfirmModal } from '../modalConfirm/ConfirmModal';
import { WorkSpaceService, type WorkSpaceTO } from '../../services/WorkSpaceService';
import { usePageTitle } from '../../hooks/usePageTittle';


const PALETA_COLORES = [
    { hex: '#F4F4F5', nombre: 'Gris Base' },
    { hex: '#D1E0E0', nombre: 'Verde Agua' },
    { hex: '#F5DFD3', nombre: 'Naranja Suave' },
    { hex: '#D7E6ED', nombre: 'Azul Cielo' },
    { hex: '#DDEADA', nombre: 'Verde Menta' },
    { hex: '#F5F2D7', nombre: 'Amarillo Arena' },
    { hex: '#E5D9EB', nombre: 'Lavanda' },
    { hex: '#F2D8DF', nombre: 'Rosa Pálido' },
    { hex: '#E8CDCD', nombre: 'Rojo Pastel' }
];

interface NavTableroProps {
    tittle : string | undefined;
    id : number | undefined;
    idWS: number | undefined;
    colorActual: string | undefined; 
    onUpdateColor: (nuevoColor: string) => void;
}


export function Nav_tablero( {tittle, id, idWS, colorActual, onUpdateColor}: NavTableroProps) {

    const [optionsActive, setOptionsActive] = useState(false);
    const user: number = useAuthStore((state) => state.idUsuario);
    const [currentTitle, setCurrentTitle] = useState(tittle || "");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const navigate = useNavigate();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
    const [workSpace, setWorkspace] = useState<WorkSpaceTO>();
    const [isColorMenuMode, setIsColorMenuMode] = useState(false);
    usePageTitle(`${currentTitle}`);

    const toggleOptionsActive = () => {
        setOptionsActive(!optionsActive);
    }

    const handleEditTitle = async () => {

        if (newTitle.trim() === "" || newTitle === currentTitle) {
            setIsEditingTitle(false);
            setNewTitle(currentTitle);
            return;
        }

        if (!id || !idWS || !user) return;

        try {
            await TaskBoardService.editarNombreTablero({ tittle: newTitle }, user, id, idWS);
            
            setCurrentTitle(newTitle);
            setIsEditingTitle(false);
        } catch (error) {
            console.error("Error al renombrar el tablero:", error);
        }
    };

    const handleDeleteTablero = async () => {
        if (!id) return; 

        try {
            const response = await TaskBoardService.deleteTablero(id);
            console.log(response);
            navigate('/user/home'); 
        } catch (error) {
            console.error("Error al borrar el tablero:", error);
            alert("No se pudo eliminar el tablero. Inténtalo de nuevo.");
        }
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        setIsConfirmModalOpen(true);
        setOptionsActive(false);
    };

    const handleColorChange = async (colorHex: string) => {
        if (!id || !idWS || !user || colorHex === colorActual) return;
        try {
            onUpdateColor(colorHex);
            setOptionsActive(false); 
            await TaskBoardService.editarColorTablero({ tittle: colorHex }, user, id, idWS);
        } catch (error) {
            console.error("Error al cambiar color:", error);
        }
    };

    useEffect(() => {
        const fetchWs= async () => {
            try {
                let workSpace = await WorkSpaceService.getEspacioTrabajo(idWS);
                console.log(workSpace);
                setWorkspace(workSpace);
            } catch (e) {
                console.error("Error cargando usuario:", e)
            }
        };
        
        fetchWs();
    }, [idWS])

    useEffect(() => {
        if (tittle) {
            setCurrentTitle(tittle);
            setNewTitle(tittle);
        }
    }, [tittle]);


    const renderTitulo = () => {
        if (isEditingTitle) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input 
                        type="text"
                        className={styles.edit_title_input}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={handleEditTitle}
                        onKeyDown={(e) => e.key === "Enter" && handleEditTitle()} 
                        autoFocus
                    />
                    <span className={styles.titulo_tablero}>#{id}</span>
                </div>
            );
        }

        return (
            <h3 
                className={`${styles.titulo_tablero} ${styles.editable_title}`}
                onClick={() => setIsEditingTitle(true)}
            >
                {currentTitle}  #{id}
            </h3>
        );
    };

  return (
    <>
        <nav className={styles.navbar}>
            <div className={styles.left_section}>

                <div className={styles.desktop_left_section}>
                    {renderTitulo()}
                    <Link to={`/user/workspace/${idWS}`} className={styles.logo_container}>
                        <img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/>
                    </Link>
                </div>

                <div className={styles.mobile_left_section}>
                    <button className={styles.icon_transparent}>
                        <X size={28} />
                    </button>
                    <div className={styles.mobile_tittles}>
                        {renderTitulo()}
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

                    {optionsActive && (
                        <div className={styles.dropdown_menu}>
                            {!isColorMenuMode ? (
                                <>
                                    <button className={styles.dropdown_item} onClick={() => { setIsEditingTitle(true); setOptionsActive(false); }}>
                                        <Pencil size={18} />
                                        <span>Renombrar</span>
                                    </button>
                                    <button className={styles.dropdown_item} onClick={() => setIsColorMenuMode(true)}>
                                        <Palette size={18} />
                                        <span>Cambiar Color</span>
                                    </button>
                                    
                                    {user === workSpace?.idPropietario && (
                                        <>
                                            <hr className={styles.separator} />
                                            <button className={`${styles.dropdown_item} ${styles.danger}`} onClick={handleDeleteClick}>
                                                <XCircle size={18} />
                                                <span>Borrar tablero</span>
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className={styles.color_palette_view}>
                                    <div className={styles.palette_header}>
                                        <button className={styles.icon_btn_small} onClick={() => setIsColorMenuMode(false)}>
                                            <ArrowLeft size={16} />
                                        </button>
                                        <span>Elige un color</span>
                                    </div>
                                    <div className={styles.color_grid}>
                                        {PALETA_COLORES.map(color => (
                                            <div 
                                                key={color.hex}
                                                className={`${styles.color_swatch} ${colorActual === color.hex ? styles.selected : ''}`}
                                                style={{ backgroundColor: color.hex }}
                                                onClick={() => handleColorChange(color.hex)}
                                                title={color.nombre}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        )}
                </div>
            </div>
        </nav>

        <ConfirmModal 
                isOpen={isConfirmModalOpen}
                title="Eliminar Tablero"
                message="¿Estás seguro de que deseas eliminar este tablero de forma permanente? Esta acción no se puede deshacer."
                itemName={tittle}
                onConfirm={handleDeleteTablero}
                onCancel={() => setIsConfirmModalOpen(false)}
            />
    </>
  )
}
