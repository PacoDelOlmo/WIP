import {
    SquarePen,
    X,
    Image as ImageIcon,
    MoreHorizontal,
    Tag,
    Calendar,
    Check,
    MessageSquare,
    User,
    Circle,
    Bug, 
    Zap, 
    Code, 
    Paintbrush,
    Atom,
    FileCode,
    Database,
    Cpu,
    Server,
    Monitor,
    Terminal,
} from "lucide-react";
import Styles from "./Task.module.css";
import { useState } from "react";
import { TaskService, type TaskTO } from "../../services/TaskService";
import { useAuthStore } from "../../store/Auth";

interface TaskProps{
    taskData : TaskTO;
    listaName: string;
    listID: number;
    taskBoardID: number;
}

const obtenerIconoEtiqueta = (nombreEtiqueta: string) => {
    const nombreNormalizado = nombreEtiqueta.toString().toLowerCase();

    switch (nombreNormalizado) {
        // --- CATEGORÍAS GENERALES ---
        case "frontend":
            return <Monitor size={14} />;
        case "backend":
            return <Server size={14} />;
        case "desarrollo":
        case "dev":
            return <Code size={14} />;

        // --- TECNOLOGÍAS ESPECÍFICAS ---
        case "react":
        case "reactjs":
            return <Atom size={14} />;
        case "html":
        case "css":
        case "sass":
        case "tailwind":
            return <FileCode size={14} />;
        case "java":
        case "c#":
        case "python":
        case "cpp":
            return <Cpu size={14} />;
        case "database":
        case "sql":
        case "mysql":
        case "postgre":
        case "mongodb":
            return <Database size={14} />;

        // --- ESTADOS Y TIPOS ---
        case "bug":
        case "error":
            return <Bug size={14} />;
        case "urgente":
        case "prioridad":
            return <Zap size={14} />;
        case "diseño":
        case "ui":
        case "ux":
            return <Paintbrush size={14} />;
            
        default:
            return <Tag size={14} />;
    }
};


export function Task({ taskData, listaName, listID, taskBoardID }: TaskProps) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [comentarios, setComentarios] = useState(taskData.comentarios || []);
    const [nuevaEtiqueta, setNuevaEtiqueta] = useState("");
    const [etiquetas, setEtiquetas] = useState(taskData.etiquetas || []);
    const [isAddingEtiqueta, setIsAddingEtiqueta] = useState(false);
    const idUsuario = useAuthStore((state) => state.idUsuario);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleAddComment = async () => {
        if (nuevoComentario.trim() === "") return;

        try {
            const comentarioCreado = await TaskService.addComment(
                { tittle: nuevoComentario },
                taskBoardID,
                listID,
                taskData.id,
                idUsuario
            );

            setComentarios([...comentarios, comentarioCreado]);
            setNuevoComentario("");
        } catch (error) {
            console.error("Error al añadir el comentario:", error);
        }
    };

    const handleAddEtiqueta = async () => {
        if (nuevaEtiqueta.trim() === "") return;

        try {
            const etiqutaCreada = await TaskService.addEtiqueta(
                { tittle: nuevaEtiqueta },
                taskBoardID,
                listID,
                taskData.id,
                idUsuario
            );

            setEtiquetas([...etiquetas, etiqutaCreada]);
            setNuevaEtiqueta("");
            setIsAddingEtiqueta(false);
        } catch (error) {
            console.error("Error al añadir la etiqueta:", error);
        }
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
                                        
                                        {etiquetas?.map((etiqueta, index) => (
                                            <button key={etiqueta.id || index} className={Styles.btnTag}>
                                                {obtenerIconoEtiqueta(etiqueta.etiqueta)}
                                                {etiqueta.etiqueta}
                                            </button>
                                        ))}

                                        {isAddingEtiqueta ? (
                                            <div className={Styles.addTagForm}>
                                                <input 
                                                    type="text" 
                                                    placeholder="Etiqueta..." 
                                                    className={Styles.addTagInput}
                                                    value={nuevaEtiqueta}
                                                    onChange={(e) => setNuevaEtiqueta(e.target.value)}
                                                    autoFocus
                                                    onKeyDown={(e) => e.key === "Enter" && handleAddEtiqueta()}
                                                />
                                                <button className={Styles.btnConfirmTag} onClick={handleAddEtiqueta}>
                                                    <Check size={14} />
                                                </button>
                                                <button className={Styles.btnCancelTag} onClick={() => setIsAddingEtiqueta(false)}>
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button className={Styles.btnAdd} onClick={() => setIsAddingEtiqueta(true)}>
                                                + Añadir
                                            </button>
                                        )}

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

                                    {comentarios.map((comment) =>(
                                        <div key={comment.id} className={Styles.activityLog}>
                                            <div className={Styles.avatar}>
                                                <User size={20} />
                                            </div>
                                            <div className={Styles.activityText}>
                                                <h6>{comment.user.nickname}</h6>
                                                <p>{comment.contenido}</p>
                                                <a href="#" className={Styles.dateLink}>
                                                    {comment.fecha.split("T")[0]}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                    

                                    <div className={Styles.commentInputWrapper}>
                                        <input 
                                            type="text" 
                                            placeholder="Escribe un comentario..." 
                                            value={nuevoComentario}
                                            onChange={(e) => setNuevoComentario(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                                        />
                                        {/* Añadimos un botón visible (opcional) o confiamos en el "Enter" */}
                                        {nuevoComentario.trim() !== "" && (
                                            <button 
                                                className={Styles.btnSaveComment} 
                                                onClick={handleAddComment}
                                            >
                                                Guardar
                                            </button>
                                        )}
                                    </div>

                                    <div className={Styles.activityLog}>
                                        <div className={Styles.avatar}>
                                            <User size={20} />
                                        </div>
                                        <div className={Styles.activityText}>
                                            <p>
                                                <strong>{taskData.creador.nickname}</strong> ha añadido esta tarea a{" "}
                                                <strong>{listaName}</strong>
                                            </p>
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
