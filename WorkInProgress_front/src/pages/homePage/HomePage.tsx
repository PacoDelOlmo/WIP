import { Card } from "../../components/card/Card";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import styles from "./HomePage.module.css";

export function HomePage() {
    const heroTittle : string = 'Organiza tu trabajo\nSimplifica tu proceso';
    const heroText : string = 'En Work In Progress\ncada tarea te acerca a tus objetivos\n'
    +'Gestiona tus proyectos con tableros intuitivos\nlistas claras y una experiencia diseñada para fluir';
  return (
    <>
        <Header />
        <main>
            <section className={styles.hero}>
                <h1>{heroTittle}</h1>
                <p>{heroText}</p>
                <div className={styles.primary_button}>
                    <a href="#">Empieza ahora</a>
                </div>
            </section>

            <section className={styles.info}>
                <h4>WIP 1.0</h4>
                <h2>Todo lo que necesitas para avanzar sin complicaciones</h2>
                <h3>Diseñado para que tu productividad fluya con naturalidad</h3>
                <div className={styles.cards_section}>
                    <Card 
                        titulo="Tableros claros, tareas vivas"
                        descripcion="Organiza tus proyectos visualmente con un sistema flexible y fluido."
                        cierre="Mueve, agrupa y prioriza con total libertad."
                    />

                    <Card 
                        titulo="Diseñado para avanzar"
                        descripcion="Cada lista, cada tarjeta, cada movimiento refleja progreso."
                        cierre="WIP te ayuda a concentrarte en lo que importa, avanzar paso a paso."
                    />

                    <Card 
                        titulo="Experiencia moderna y ágil"
                        descripcion="Interfaz limpia, intuitiva y rápida."
                        cierre="Porque tu herramienta de trabajo también debe inspirarte."
                    />
                </div>
            </section>

            <section className={styles.motiv}>
                <h2>El progreso no se mide por lo que terminas,</h2>
                <h2>sino por lo que construyes cada día.</h2>
                <p>Con WIP,</p>
                <p>tu trabajo siempre está en marcha, sin complicaciones, sin fricción y sin distracciones.</p>
                <p>Gestionar tu tiempo nunca había sido tan sencillo</p>
            </section>

            <section className={styles.start}>
                <h2>¿Listo para dar el siguiente paso?</h2>
                <h3>Empieza a construir tu próximo proyecto con WIP</h3>
                <div className={styles.primary_button}>
                    <a href="#">Crea tu primer tablero</a>
                </div>
            </section>
        </main>
        <Footer />
    </>
  );
}
