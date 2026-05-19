import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Check, Mail, Plus, User, Users, X } from 'lucide-react';
import { WorkSpaceService, type UserWorkSpaceTO, type WorkSpaceTO } from '../../services/WorkSpaceService';
import type { UserCompleteDTO } from '../../pages/home/Home';
import styles from './Colaboradores.module.css';
import { ToastNotification } from '../toastNotification/ToastNotification';
import { AccessDeniedInternal } from '../../pages/accesDeneidInternal/AccessDeniedInternal';
import { useAuthStore } from '../../store/Auth';
import { usePageTitle } from '../../hooks/usePageTittle';

interface ColaboradoresProps {
    usuario: UserCompleteDTO;
}

export function Colaboradores({ usuario }: ColaboradoresProps) {

    const { id } = useParams();
    const [workspace, setWorkspace] = useState<WorkSpaceTO | null>(null);
    const [colaboradores, setColaboradores] = useState<UserWorkSpaceTO[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [toastConfig, setToastConfig] = useState<{ isVisible: boolean; message: string; type: 'success' | 'error' }>({
        isVisible: false,
        message: "",
        type: "success"
    });
    const usuarioLogged = useAuthStore((state)=> state.idUsuario);
    const [isPropietaio, setIsPropietario] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            cargarDatos(Number(id));
        }
    }, [id]);

    usePageTitle(`${workspace?.nombre} | Colaboradores`);

    const cargarDatos = async (idWs: number) => {
        try {
            const wsData = await WorkSpaceService.getEspacioTrabajo(idWs);
            setWorkspace(wsData);
            setIsPropietario(wsData.idPropietario === usuarioLogged);
            const colabs = await WorkSpaceService.getUsuariosPermisos(idWs);
            setColaboradores(Array.isArray(colabs) ? colabs : [colabs as any]);
        } catch (e) {
            console.error("Error cargando colaboradores", e);
        }
    };

    const handleAddColaborador = async () => {
        if (newEmail.trim() === "") return;
        setError(null);

        try {
            const exito = await WorkSpaceService.addPermisos(Number(id), newEmail);
            if (exito) {
                await cargarDatos(Number(id)); 
                setNewEmail("");
                setIsAdding(false);
                showToast("Colaborador añadido correctamente", "success")
            } else {
                showToast("No se pudo añadir al usuario. Verifica el correo.", "error");
            }
        } catch (e) {
            console.error("Error al añadir colaborador:", e);
            showToast("El usuario no existe o ya está en el espacio.", "error");
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToastConfig({ isVisible: true, message, type });
    };

    if(!isPropietaio){
        return <AccessDeniedInternal mensaje="Solo los propietarios del espacio pueden acceder a los ajustes y gestión de accesos." />;
    }

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleGroup}>
                    <Users className={styles.iconTitle} size={32} />
                    <div>
                        <h2>Colaboradores</h2>
                        <p className={styles.subtitle}>
                            Espacio: <strong>{workspace?.nombre || 'Cargando...'}</strong>
                        </p>
                    </div>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.listContainer}>
                    {colaboradores.map((colab, index) => (
                        <div key={colab.usuario?.id || index} className={styles.colabCard}>
                            <div className={styles.avatar}>
                                <User size={20} />
                            </div>
                            <div className={styles.colabInfo}>
                                <p className={styles.colabName}>{colab.usuario?.nombre || 'Usuario'}</p>
                                <p className={styles.colabEmail}>{colab.usuario?.nickname}</p>
                            </div>
                            <div className={styles.colabRole}>
                                <span className={colab.rol === 'Propietario' ? styles.badgePropietario : styles.badgeColaborador}>
                                    {colab.rol}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.addSection}>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    
                    {isAdding ? (
                        <div className={styles.addForm}>
                            <div className={styles.inputWrapper}>
                                <Mail size={18} className={styles.inputIcon} />
                                <input
                                    type="email"
                                    placeholder="Correo electrónico del colaborador..."
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    autoFocus
                                    onKeyDown={(e) => e.key === "Enter" && handleAddColaborador()}
                                />
                            </div>
                            <div className={styles.formActions}>
                                <button className={styles.btnConfirm} onClick={handleAddColaborador}>
                                    <Check size={18} /> Añadir
                                </button>
                                <button className={styles.btnCancel} onClick={() => { setIsAdding(false); setError(null); }}>
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className={styles.btnTriggerAdd} onClick={() => setIsAdding(true)}>
                            <Plus size={20} /> Añadir nuevo colaborador
                        </button>
                    )}
                </div>
            </div>

            <ToastNotification 
                isVisible={toastConfig.isVisible}
                message={toastConfig.message}
                type={toastConfig.type}
                onClose={() => setToastConfig({ ...toastConfig, isVisible: false })}
            />
        </section>
    );
}
