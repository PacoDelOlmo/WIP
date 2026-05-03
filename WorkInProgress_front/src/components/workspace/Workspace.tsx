import styles from "./Workspace.module.css";
import WIP_Logo from "./../../assets/img/WIP_Logo.png";
import { ChevronRight, LockIcon, UserIcon, Check, X } from "lucide-react"; // ✨ Añadidos Check y X
import { Link, useParams } from "react-router";
import type { UserCompleteDTO, WorkspaceType } from "../../pages/home/Home";
import { useEffect, useState } from "react";
import { TaskBoardService } from "../../services/TaskBoardService"; // ✨ Importamos el servicio
import type { newElementTO } from "../../services/TaskQueueService";

interface UserProps {
    usuario: UserCompleteDTO;
}

export function Workspace({ usuario }: UserProps) {
    const [workspace, setWorkspace] = useState<WorkspaceType | null>(null);
    const { id } = useParams();

    const [isAddingBoard, setIsAddingBoard] = useState(false);
    const [newBoardTitle, setNewBoardTitle] = useState("");

    useEffect(() => {
        usuario.workspace?.map((ws, key) => {
            if (id) {
                if (ws.id == parseInt(id)) {
                    setWorkspace(ws);
                }
            }
        });
    }, [usuario]);

    const handleCrearTablero = async () => {
        if (newBoardTitle.trim() === "" || !workspace) return;

        const payload : newElementTO = { tittle: newBoardTitle };

        const idUsuario = usuario.id;

        try {
            // Llamamos al backend
            const tableroCreado = await TaskBoardService.createTablero(payload, idUsuario, workspace.id,);

            
            setWorkspace({
                ...workspace,
                tableros: [...workspace.tableros, tableroCreado],
            });

            setNewBoardTitle("");
            setIsAddingBoard(false);
        } catch (error) {
            console.error("Error al crear el tablero:", error);
        }
    };

    return (
        <section className={styles.content_section}>
            <header className={styles.header_content}>
                <img
                    src={WIP_Logo}
                    alt="Imagen de usuario"
                    className={styles.user_img}
                />
                <div className={styles.user_info}>
                    <h1>
                        Espacio de trabajo de <span>{usuario.username}</span>
                    </h1>
                    <div>
                        <LockIcon />
                        <p>Privado</p>
                    </div>
                </div>
            </header>

            <hr />

            {workspace ? (
                <article
                    key={`${workspace.nombre}-${workspace.id}`}
                    className={styles.boards_section}
                >
                    <header className={styles.boards_article_header}>
                        <div className={styles.boards_article_header_wrapper}>
                            <UserIcon className={styles.user_icon} />
                            <p>{workspace.nombre}</p>
                        </div>

                        <Link to="" className={styles.header_link}>
                            {" "}
                            Tableros <ChevronRight size={"4vw"} />
                        </Link>
                    </header>

                    <div className={styles.user_boards}>
                        {workspace.tableros.length > 0 ? (
                            workspace.tableros.map((tablero, key) => (
                                <div key={key} className={styles.board_button_link}>
                                    <div className={styles.board_draw}></div>
                                    <Link
                                        to={`/taskboard/${tablero.id}`}
                                        className={styles.board_name}
                                    >
                                        {tablero.nombreTablero}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p
                                className={styles.board_name}
                                style={{ padding: "0 1rem", color: "#888" }}
                            >
                                No hay tableros en este espacio
                            </p>
                        )}

                            <div className={styles.board_button_add}>
                              {isAddingBoard ? (
                                <div className={styles.add_board_form}>
                                    <input 
                                        type="text" 
                                        placeholder="Nombre del tablero..." 
                                        className={styles.add_board_input}
                                        value={newBoardTitle}
                                        onChange={(e) => setNewBoardTitle(e.target.value)}
                                        autoFocus
                                        onKeyDown={(e) => e.key === "Enter" && handleCrearTablero()}
                                    />
                                    <div className={styles.form_actions}>
                                        <button 
                                            className={styles.btn_confirm} 
                                            onClick={handleCrearTablero}
                                        >
                                            <Check size={16} /> Añadir
                                        </button>
                                        <button 
                                            className={styles.btn_cancel} 
                                            onClick={() => setIsAddingBoard(false)}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    className={styles.btn_trigger_add} 
                                    onClick={() => setIsAddingBoard(true)}
                                >
                                    + Nuevo tablero
                                </button>
                            )}
                        </div>
                    </div>

                    <footer>
                        <button className={styles.secondary_button}>
                            {" "}
                            Ver los tableros completos
                        </button>
                    </footer>
                </article>
            ) : (
                ""
            )}
        </section>
    );
}
