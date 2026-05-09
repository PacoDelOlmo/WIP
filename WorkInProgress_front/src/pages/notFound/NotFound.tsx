import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router"; // O react-router-dom según tu versión
import { Home, FileQuestion, LogIn } from "lucide-react";
import { useAuthStore } from "../../store/Auth";

export default function NotFound() {

    const userLogged = useAuthStore((state) => state.isLoggedIn);

  return (
    <main className={styles.container}>
      <div className={`${styles.floating_task} ${styles.task_1}`}></div>
      <div className={`${styles.floating_task} ${styles.task_2}`}></div>
      <div className={`${styles.floating_task} ${styles.task_3}`}></div>

      <section className={styles.content_wrapper}>
        <div className={styles.error_code}>
          <h1>4</h1>
          <div className={styles.animated_zero}>
            <div className={styles.zero_card}>
              <div className={styles.card_header}></div>
              <FileQuestion size={45} className={styles.question_icon} />
              <div className={styles.card_line}></div>
              <div className={styles.card_line_short}></div>
            </div>
          </div>
          <h1>4</h1>
        </div>

        <h2 className={styles.title}>
          ¡Ups! Esta tarjeta no está en el tablero
        </h2>

        <p className={styles.description}>
          Hemos revisado a fondo todos tus espacios de trabajo y pilas de
          tareas, pero parece que la página que buscas está en el{" "}
          <strong>Backlog del olvido</strong> o ha sido eliminada.
        </p>

        <div className={styles.action_container}>
            {userLogged ? 
                <Link to="/user/home" className={styles.btn_home}>
                    <Home size={20} />
                    <span>Volver a mis espacios</span>
                </Link>
            :
                <Link to="/login" className={styles.btn_home}>
                    <LogIn size={20} />
                    <span>Iniciar Sesión</span>
                </Link>
        
            }
        </div>
      </section>
    </main>
  );
}
