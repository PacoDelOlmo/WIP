import {
    SquarePen,
    X,
    Image as ImageIcon,
    MoreHorizontal,
    Tag,
    Calendar,
    MessageSquare,
    User,
    Circle,
} from "lucide-react";
import Styles from "./Task.module.css";
import { useState } from "react";

export interface TaskDTO{
    comentarios: any[];
    completada: boolean;
    creador: object;
    descripcion: String;
    etiquetas: any[];
    titulo: String;
}

interface TaskProps{
    taskData : TaskDTO;
    listaName: String;
}

export function Task({ taskData, listaName }: TaskProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const cardClass = `${Styles.tarea} ${isOpen ? Styles.tareaSeleccionada : ""}`;

    return (
        <>
            <div className={cardClass} onClick={toggleOpen}>
                <div className={Styles.titulo_check}>
                    {taskData.completada ? (
                            <input type="checkbox" checked onClick={(e) => e.stopPropagation()} />
                        ) : (
                            <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                        ) 
                    }
                    
                    <h4>{taskData.titulo}</h4>
                </div>
                <button>
                    <SquarePen />
                </button>
            </div>

            {isOpen && (
                <div className={Styles.modalOverlay} onClick={toggleOpen}>
                    <div className={Styles.modalBox} onClick={(e) => e.stopPropagation()}>
                        <div className={Styles.contenidoExpandido}>
                            <div className={Styles.cardHeader}>
                                <span className={Styles.nombreLista}>{listaName}</span>
                                <div className={Styles.headerActions}>
                                    <button title="Cover">
                                        <ImageIcon size={18} />
                                    </button>
                                    <button title="Menu">
                                        <MoreHorizontal size={18} />
                                    </button>
                                    <button title="Cerrar" onClick={toggleOpen}>
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className={Styles.cardBody}>
                                <div className={Styles.mainColumn}>
                                    <div className={Styles.titleSection}>
                                        <Circle size={24} className={Styles.circleIcon} />
                                        <h2>{taskData.titulo}</h2>
                                    </div>

                                    <div className={Styles.metaActions}>
                                        <button className={Styles.btnAdd}>+ Añadir</button>
                                        {taskData.etiquetas?.map(() => (
                                            <button className={Styles.btnTag}>
                                                <Tag size={14} /> Etiqueta
                                            </button>
                                        ))}
                                    </div>

                                    <div className={Styles.descriptionSection}>
                                        <div className={Styles.descHeader}>
                                            <div className={Styles.descTitle}>
                                                <SquarePen size={20} />
                                                <h3>Descripción</h3>
                                            </div>
                                            <button className={Styles.btnEdit}>Editar</button>
                                        </div>
                                        <p className={Styles.descText}>
                                            {taskData.descripcion}
                                        </p>
                                    </div>
                                </div>

                                <div className={Styles.sidebarColumn}>
                                    <div className={Styles.sidebarHeader}>
                                        <MessageSquare size={18} />
                                        <h3>Comentarios</h3>
                                    </div>

                                    <div className={Styles.commentInputWrapper}>
                                        <input type="text" placeholder="Escribe un comentario..." />
                                    </div>

                                    <div className={Styles.activityLog}>
                                        <div className={Styles.avatar}>
                                            <User size={20} />
                                        </div>
                                        <div className={Styles.activityText}>
                                            <p>
                                                <strong>Usuario</strong> ha añadido esta tarea a{" "}
                                                <strong>Nombre Lista</strong>
                                            </p>
                                            <a href="#" className={Styles.dateLink}>
                                                dd-mm-aaaa
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
