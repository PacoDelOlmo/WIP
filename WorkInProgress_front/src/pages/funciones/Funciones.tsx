import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import styles from './Funciones.module.css';

export function Funciones() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.blobShape1}></div>
            <div className={styles.blobShape2}></div>
            
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <h1>El motor de tus proyectos</h1>
                    <p className={styles.leadText}>
                        Work In Progress (WIP) nace con un propósito claro: eliminar el ruido visual 
                        y la fricción en la gestión de tareas. Ya sea para organizar tu día a día personal 
                        o coordinar un equipo de alto rendimiento, WIP se adapta a tu flujo de trabajo.
                    </p>
                </section>

                <section className={styles.featuresList}>
                    {/* FUNCIÓN 1: KANBAN FLUIDO */}
                    <div className={styles.featureRow}>
                        <div className={styles.featureText}>
                            <h2>Tableros Kanban Dinámicos</h2>
                            <p>
                                Visualiza el estado exacto de cada proyecto. Mueve tareas entre listas 
                                con una fluidez absoluta. Diseñado para que la actualización del progreso 
                                sea tan natural como tachar algo en una libreta.
                            </p>
                        </div>
                        <div className={styles.featureVisual}>
                            <div className={styles.animKanban}>
                                <div className={styles.kCol}>
                                    <div className={`${styles.kCard} ${styles.kMove}`}></div>
                                </div>
                                <div className={styles.kCol}>
                                    <div className={styles.kCard}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FUNCIÓN 2: COLABORACIÓN */}
                    <div className={`${styles.featureRow} ${styles.reverse}`}>
                        <div className={styles.featureText}>
                            <h2>Colaboración Sin Barreras</h2>
                            <p>
                                Invita a colaboradores, asigna roles de visualización o edición y 
                                mantén a todo el equipo sincronizado. Los cambios en el espacio de 
                                trabajo se reflejan al instante, rompiendo los silos de información.
                            </p>
                        </div>
                        <div className={styles.featureVisual}>
                            <div className={styles.animColab}>
                                <div className={styles.avatar1}></div>
                                <div className={styles.avatar2}></div>
                                <div className={styles.syncPulse}></div>
                            </div>
                        </div>
                    </div>

                    {/* FUNCIÓN 3: ETIQUETAS */}
                    <div className={styles.featureRow}>
                        <div className={styles.featureText}>
                            <h2>Clasificación Inteligente</h2>
                            <p>
                                No pierdas el tiempo buscando. Utiliza un sistema de etiquetas por colores 
                                personalizadas para filtrar por prioridad, departamento o tipo de tarea. 
                                Encuentra lo que necesitas en milisegundos.
                            </p>
                        </div>
                        <div className={styles.featureVisual}>
                            <div className={styles.animTags}>
                                <div className={styles.tagBase}>
                                    <div className={styles.tagColor1}></div>
                                    <div className={styles.tagColor2}></div>
                                    <div className={styles.tagColor3}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}