import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Settings, Save, Trash2, ShieldAlert, ChevronDown } from 'lucide-react';
import { WorkSpaceService, type UserWorkSpaceTO, type WorkSpaceTO } from '../../services/WorkSpaceService';
import type { UserCompleteDTO } from '../../pages/home/Home';
import styles from './AjustesWorkspace.module.css';
import { ConfirmModal } from '../modalConfirm/ConfirmModal';
import { ToastNotification } from '../toastNotification/ToastNotification';
import { useAuthStore } from '../../store/Auth';
import { AccessDeniedInternal } from '../../pages/accesDeneidInternal/AccessDeniedInternal';
import { usePageTitle } from '../../hooks/usePageTittle';

const PALETA_COLORES = [
    { hex: '#EAEAEA', nombre: 'Gris Base' },
    { hex: '#A8D1D5', nombre: 'Verde Agua' },
    { hex: '#FBD5B9', nombre: 'Naranja Suave' },
    { hex: '#B3E5FC', nombre: 'Azul Cielo' },
    { hex: '#C8E6C9', nombre: 'Verde Menta' },
    { hex: '#FFF9C4', nombre: 'Amarillo Arena' },
    { hex: '#E1BEE7', nombre: 'Lavanda' },
    { hex: '#F8BBD0', nombre: 'Rosa Pálido' },
    { hex: '#E6B3B3', nombre: 'Rojo Pastel' } 
];

interface AjustesProps {
    usuario: UserCompleteDTO;
    onUpdateWorkspace: (idWs: number, nuevoNombre: string, nuevoColor: string) => void;
}

export function AjustesWorkspace({ usuario, onUpdateWorkspace }: AjustesProps) {
    const { id } = useParams();
    const [workspace, setWorkspace] = useState<WorkSpaceTO | null>(null);
    const [colaboradores, setColaboradores] = useState<UserWorkSpaceTO[]>([]);
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [userToRemove, setUserToRemove] = useState<{ id: number; nombre: string } | null>(null);
    const [toastConfig, setToastConfig] = useState<{ isVisible: boolean; message: string; type: 'success' | 'error' }>({
        isVisible: false,
        message: "",
        type: "success"
    });
    const usuarioLogged = useAuthStore((state)=> state.idUsuario);
    const [isPropietaio, setIsPropietario] = useState<boolean>(false);
    const [nuevoColor, setNuevoColor] = useState("#EAEAEA");
    const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);


    useEffect(() => {
        if (id) cargarDatos(Number(id));
    }, [id]);

    usePageTitle(`${workspace?.nombre} | Ajustes`);

    const cargarDatos = async (idWs: number) => {
        try {
            const wsData = await WorkSpaceService.getEspacioTrabajo(idWs);
            setWorkspace(wsData);
            setNuevoNombre(wsData.nombre);
            setIsPropietario(wsData.idPropietario === usuarioLogged);
            const colabs = await WorkSpaceService.getUsuariosPermisos(idWs);
            setColaboradores(Array.isArray(colabs) ? colabs : [colabs as any]);
        } catch (e) {
            console.error("Error cargando ajustes", e);
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToastConfig({ isVisible: true, message, type });
    };

    const handleGuardarCambios = async () => {
        if (!workspace) return;
        
        const haCambiadoNombre = nuevoNombre.trim() !== "" && nuevoNombre !== workspace.nombre;
        const haCambiadoColor = nuevoColor !== workspace.color;

        if (!haCambiadoNombre && !haCambiadoColor) return; // No hay nada que guardar

        setIsSaving(true);
        try {
            const peticiones = [];

            if (haCambiadoNombre) {
                peticiones.push(WorkSpaceService.editarNombreWorkSpace(Number(id), usuario.id, { tittle: nuevoNombre }));
            }
            if (haCambiadoColor) {
                peticiones.push(WorkSpaceService.editarColorWorkSpace(Number(id), usuario.id, { tittle: nuevoColor }));
            }

            await Promise.all(peticiones);

            const nombreFinal = haCambiadoNombre ? nuevoNombre : workspace.nombre;
            const colorFinal = haCambiadoColor ? nuevoColor : workspace.color;

            setWorkspace(prev => prev ? { ...prev, nombre: nuevoNombre, color: nuevoColor } : null);
            
            onUpdateWorkspace(Number(id), nombreFinal, colorFinal);
            
            showToast("Cambios guardados correctamente", "success");
            setIsColorMenuOpen(false); 
        } catch (e) {
            console.error("Error al guardar", e);
            showToast("Error al guardar los cambios", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const triggerEliminarColaborador = (idUserAEliminar: number, nombreUser: string) => {
        if(idUserAEliminar === usuario.id) {
            showToast("No puedes eliminarte a ti mismo desde aquí.", "error");
            return;
        }
        setUserToRemove({ id: idUserAEliminar, nombre: nombreUser });
        setIsConfirmModalOpen(true);
    };

    const executeEliminarColaborador = async () => {
        if (!userToRemove) return;

        try {
            const exito = await WorkSpaceService.deleteQuitarPermisos(Number(id), userToRemove.id);
            if (exito) {
                setColaboradores(prev => prev.filter(c => c.usuario.id !== userToRemove.id));
                showToast("Colaborador eliminado correctamente", "success");
            }
        } catch (e) {
            console.error("Error al eliminar colaborador", e);
            showToast("Error al eliminar el colaborador", "error");
        } finally {
            setIsConfirmModalOpen(false);
            setUserToRemove(null);
        }
    };

    if(!isPropietaio){
        return <AccessDeniedInternal mensaje="Solo los propietarios del espacio pueden acceder a los ajustes y gestión de accesos." />;
    }

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <Settings className={styles.iconTitle} size={32} />
                    <h2>Ajustes del Espacio</h2>
                </div>
            </header>

            <div className={styles.gridContent}>
                <div className={styles.ajusteCard}>
                    <h3 className={styles.cardTitle}>Detalles del Espacio</h3>
                    <p className={styles.cardDesc}>Modifica el nombre público y el color de identificación de tu espacio de trabajo.</p>
                    
                    <div className={styles.inputsRow}>
                        <div className={styles.inputGroup}>
                            <label>Nombre del Espacio</label>
                            <input 
                                type="text" 
                                value={nuevoNombre}
                                onChange={(e) => setNuevoNombre(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Color de Identificación</label>
                            <div className={styles.colorPickerContainer}>
                                <button 
                                    type="button"
                                    className={styles.colorSelectTrigger} 
                                    onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
                                >
                                    <div className={styles.colorTriggerContent}>
                                        <div className={styles.colorCircle} style={{ backgroundColor: nuevoColor }}></div>
                                        <span>{PALETA_COLORES.find(c => c.hex === nuevoColor)?.nombre || 'Personalizado'}</span>
                                    </div>
                                    <ChevronDown size={18} style={{ transform: isColorMenuOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                                </button>

                                {isColorMenuOpen && (
                                    <div className={styles.colorDropdown}>
                                        {PALETA_COLORES.map(color => (
                                            <div 
                                                key={color.hex}
                                                className={`${styles.colorSwatch} ${nuevoColor === color.hex ? styles.selected : ''}`}
                                                style={{ backgroundColor: color.hex }}
                                                onClick={() => {
                                                    setNuevoColor(color.hex);
                                                    setIsColorMenuOpen(false);
                                                }}
                                                title={color.nombre}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <button 
                        className={styles.btnSave} 
                        onClick={handleGuardarCambios}
                        disabled={isSaving || (nuevoNombre === workspace?.nombre && nuevoColor === workspace?.color)}
                    >
                        <Save size={18} /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>

                {/* ... (El resto del componente sigue exactamente igual: Gestión de accesos, Modales, Toasts) ... */}
                <div className={styles.ajusteCard}>
                    <div className={styles.cardHeaderWithIcon}>
                        <ShieldAlert className={styles.dangerIcon} />
                        <div>
                            <h3 className={styles.cardTitle}>Gestión de Accesos</h3>
                            <p className={styles.cardDesc}>Revoca permisos a los colaboradores actuales.</p>
                        </div>
                    </div>

                    <div className={styles.dangerList}>
                        {colaboradores.map((colab, index) => (
                            <div key={colab.usuario?.id || index} className={styles.dangerListItem}>
                                <div className={styles.userInfo}>
                                    <strong>{colab.usuario?.nombre}</strong>
                                    <span>{colab.usuario?.nickname}</span>
                                </div>
                                {colab.rol !== 'Propietario' ? (
                                    <button 
                                        className={styles.btnRemove}
                                        onClick={() => triggerEliminarColaborador(colab.usuario.id, colab.usuario.nombre)}
                                        title="Quitar acceso"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                ) : (
                                    <span className={styles.propietarioLabel}>Propietario</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ConfirmModal 
                isOpen={isConfirmModalOpen}
                title="Revocar acceso"
                message="¿Estás seguro de que deseas eliminar a este colaborador del espacio de trabajo? Perderá el acceso a todos los tableros."
                itemName={userToRemove?.nombre}
                onConfirm={executeEliminarColaborador}
                onCancel={() => {
                    setIsConfirmModalOpen(false);
                    setUserToRemove(null);
                }}
            />

            <ToastNotification 
                isVisible={toastConfig.isVisible}
                message={toastConfig.message}
                type={toastConfig.type}
                onClose={() => setToastConfig({ ...toastConfig, isVisible: false })}
            />
        </section>
    );
}