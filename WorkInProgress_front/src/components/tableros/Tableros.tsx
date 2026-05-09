import React, { useEffect, useState } from "react";
import styles from "./Tableros.module.css";
import WIP_Logo from "./../../assets/img/WIP_SinLetra.png";
import { Clock, UserIcon, ChevronRight, Check, X } from "lucide-react";
import { Link } from "react-router";
import type { UserCompleteDTO, WorkspaceType } from "../../pages/home/Home";
import type { newElementTO } from "../../services/TaskQueueService";
import { TaskBoardService } from "../../services/TaskBoardService";

interface UserProps {
  usuario: UserCompleteDTO;
}

export function Tableros({ usuario }: UserProps) {
  const tablerosRecientes =
    usuario.workspace?.flatMap((ws) => ws.tableros).slice(0, 2) || [];
  const [workspace, setWorkspace] = useState<WorkspaceType | null>(null);
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  useEffect(() => {
    usuario.workspace?.map((ws, key) => {
      if (ws.id == usuario.id) {
        setWorkspace(ws);
      }
    });
  }, [usuario]);

  const handleCrearTablero = async () => {
    if (newBoardTitle.trim() === "" || !workspace) return;

    const payload: newElementTO = { tittle: newBoardTitle };

    const idUsuario = usuario.id;

    try {
      const tableroCreado = await TaskBoardService.createTablero(
        payload,
        idUsuario,
        workspace.id,
      );

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
      <header className={styles.recent_activity_header}>
        <div className={styles.responsive_welcome}>
          <h2>Tus tableros</h2>
        </div>
        <div className={styles.recent_activity_header_wrapper}>
          <Clock className={styles.clock_icon} />
          <p>Tableros creados recientemente</p>
        </div>
      </header>

      <div className={styles.recent_activity_wrapper}>
        {tablerosRecientes.length > 0 ? (
          tablerosRecientes.map((tablero) => (
            <div
              key={`recent-${tablero.nombreTablero}`}
              className={styles.board_button_link}
            >
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
          <p className={styles.board_name} style={{ paddingLeft: "1rem" }}>
            No hay tableros recientes
          </p>
        )}
      </div>

      <hr className={styles.separator} />

      {usuario.workspace?.map((ws, index) => (
        <article key={ws.nombre + index} className={styles.boards_section}>
          <header className={styles.header_content}>
            <img
              src={WIP_Logo}
              alt="Imagen de usuario"
              className={styles.user_img}
            />
            <div className={styles.user_info}>
              <h1>
                <UserIcon className={styles.user_icon} />
                Espacio de trabajo&nbsp;<span>{ws.nombre}</span>
              </h1>
              <Link to="/user/tableros" className={styles.header_link}>
                {" "}
                Tableros <ChevronRight size={"4vw"} />
              </Link>
            </div>
          </header>

          <div className={styles.user_boards}>
            {ws.tableros.map((tablero) => (
              <div key={tablero.id} className={styles.board_button_link}>
                <div className={styles.board_draw}></div>
                <Link
                  to={`/taskboard/${tablero.id}`}
                  className={styles.board_name}
                >
                  {tablero.nombreTablero}
                </Link>
              </div>
            ))}

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
            <button className={styles.secondary_button}> Ver todo</button>
          </footer>
        </article>
      ))}
    </section>
  );
}
