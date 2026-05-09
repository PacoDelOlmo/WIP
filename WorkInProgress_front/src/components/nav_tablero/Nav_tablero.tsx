import styles from './Nav_Tablero.module.css'
import LogoWip from './../../assets/img/WIP_SinLetra.png'
import { EllipsisVertical, Pencil, XCircle, Share2, Bell, Filter, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/Auth';
import { TaskBoardService } from '../../services/TaskBoardService';
import { useNavigate } from 'react-router';

interface NavTableroProps {
    tittle : string | undefined;
    id : number | undefined;
    idWS: number | undefined;
}


export function Nav_tablero( {tittle, id, idWS}: NavTableroProps) {

    const [optionsActive, setOptionsActive] = useState(false);
    const user: number = useAuthStore((state) => state.idUsuario);
    const [currentTitle, setCurrentTitle] = useState(tittle || "");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const navigate = useNavigate();


    const toggleOptionsActive = () => {
        setOptionsActive(!optionsActive);
    }

    const handleEditTitle = async () => {

        if (newTitle.trim() === "" || newTitle === currentTitle) {
            setIsEditingTitle(false);
            setNewTitle(currentTitle);
            return;
        }

        // Si faltan datos vitales, no hacemos la llamada
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

        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este tablero y todas sus tareas?");
        if (!confirmar) return;

        try {
            const response = await TaskBoardService.deleteTablero(id);
            console.log(response);
            navigate('/user/home'); 
        } catch (error) {
            console.error("Error al borrar el tablero:", error);
            alert("No se pudo eliminar el tablero. Inténtalo de nuevo.");
        }
    };

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
                        onBlur={handleEditTitle} // Guarda al pinchar fuera
                        onKeyDown={(e) => e.key === "Enter" && handleEditTitle()} // Guarda con Enter
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
                {currentTitle} #{id}
            </h3>
        );
    };

  return (
    <>
        <nav className={styles.navbar}>
            <div className={styles.left_section}>

                <div className={styles.desktop_left_section}>
                    {renderTitulo()}
                    <a href="" className={styles.logo_container}>
                        <img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/>
                    </a>
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
                            <button 
                                className={styles.dropdown_item}
                                onClick={() => {
                                    setIsEditingTitle(true);
                                    setOptionsActive(false);
                                }}
                            >
                                <Pencil size={18} />
                                <span>Renombrar</span>
                            </button>

                            <button className={styles.dropdown_item}>
                                <Share2 size={18} />
                                <span>Compartir</span>
                            </button>
                            
                            <hr className={styles.separator} />

                            <button className={`${styles.dropdown_item} ${styles.danger}`} onClick={handleDeleteTablero}>
                                <XCircle size={18} />
                                <span>Borrar tablero</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    </>
  )
}
