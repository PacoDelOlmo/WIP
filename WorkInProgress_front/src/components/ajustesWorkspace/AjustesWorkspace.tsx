import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Settings, Save, Trash2, ShieldAlert } from 'lucide-react';
import { WorkSpaceService, type UserWorkSpaceTO, type WorkSpaceTO } from '../../services/WorkSpaceService';
import type { UserCompleteDTO } from '../../pages/home/Home';
import styles from './AjustesWorkspace.module.css';
import { ConfirmModal } from '../modalConfirm/ConfirmModal';
import { ToastNotification } from '../toastNotification/ToastNotification';

interface AjustesProps {
    usuario: UserCompleteDTO;
    onUpdateWorkspace: (idWs: number, nuevoNombre: string) => void;
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

    useEffect(() => {
        if (id) cargarDatos(Number(id));
    }, [id]);

    const cargarDatos = async (idWs: number) => {
        try {
            const wsData = await WorkSpaceService.getEspacioTrabajo(idWs);
            setWorkspace(wsData);
            setNuevoNombre(wsData.nombre); // Inicializamos el input
            
            const colabs = await WorkSpaceService.getUsuariosPermisos(idWs);
            setColaboradores(Array.isArray(colabs) ? colabs : [colabs as any]);
        } catch (e) {
            console.error("Error cargando ajustes", e);
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToastConfig({ isVisible: true, message, type });
    };

    const handleRenombrar = async () => {
        if (nuevoNombre.trim() === "" || nuevoNombre === workspace?.nombre) return;
        setIsSaving(true);
        try {
            const exito = await WorkSpaceService.editarNombreWorkSpace(Number(id), usuario.id, { tittle: nuevoNombre });
            if (exito) {
                setWorkspace(prev => prev ? { ...prev, nombre: nuevoNombre } : null);
                onUpdateWorkspace(Number(id), nuevoNombre);
                showToast("Nombre actualizado correctamente", "success");
            }
        } catch (e) {
            console.error("Error al renombrar", e);
            showToast("Error al guardar el nuevo nombre", "error");
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
                    <p className={styles.cardDesc}>Modifica el nombre público de tu espacio de trabajo.</p>
                    
                    <div className={styles.inputGroup}>
                        <label>Nombre del Espacio</label>
                        <input 
                            type="text" 
                            value={nuevoNombre}
                            onChange={(e) => setNuevoNombre(e.target.value)}
                        />
                    </div>
                    <button 
                        className={styles.btnSave} 
                        onClick={handleRenombrar}
                        disabled={isSaving || nuevoNombre === workspace?.nombre}
                    >
                        <Save size={18} /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>

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
