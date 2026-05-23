import { Navigate, useNavigate } from "react-router";
import { Card } from "../../components/card/Card";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { useAuthStore } from "../../store/Auth";
import { Apple, MoreVertical, MousePointer2, Share, Smartphone } from "lucide-react"; 
import styles from "./HomePage.module.css";
import { CookieBanner } from "../../components/cookieBanner/CookieBanner";
import { usePageTitle } from "../../hooks/usePageTittle";
import { useState } from "react";

export function HomePage() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();
    
    const heroTittle : string = 'Organiza tu trabajo\nSimplifica tu proceso';
    const heroText : string = 'En Work In Progress\ncada tarea te acerca a tus objetivos\n'
    +'Gestiona tus proyectos con tableros intuitivos\nlistas claras y una experiencia diseñada para fluir';
    const [pwaTab, setPwaTab] = useState<'android' | 'ios'>('android');

    if (isLoggedIn){
        return <Navigate to="/user/home" replace/>
    }

    usePageTitle(`Work In Progress`);

  return (
    <div className={styles.pageWrapper}>
        <Header />
        <main>
            <section className={styles.hero}>
                <div className={styles.blobShape1}></div>
                <div className={styles.blobShape2}></div>

                <div className={styles.heroContent}>
                    <h1 className={styles.animateFadeInUp}>{heroTittle}</h1>
                    <p className={styles.animateFadeInUpDelay}>{heroText}</p>
                    <div className={`${styles.primary_button} ${styles.animateFadeInUpDelay2}`}>
                        <button onClick={() => navigate('/signup')}>Empieza ahora</button>
                    </div>

                    <div className={`${styles.animatedShowcase} ${styles.animateFadeInUpDelay2}`}>
                        <div className={styles.fakeBoard}>
                            
                            <div className={styles.fakeList}>
                                <div className={styles.fakeListHeader}>Por hacer</div>
                                <div className={styles.fakeTask}></div>
                                <div className={`${styles.fakeTask} ${styles.taskExpand}`}>
                                    <div className={styles.taskLine}></div>
                                    <div className={styles.taskLine}></div>
                                    <div className={styles.taskLineShort}></div>
                                </div>
                                <div className={styles.fakeTask}></div>
                            </div>

                            <div className={styles.fakeList}>
                                <div className={styles.fakeListHeader}>En progreso</div>
                                <div className={styles.fakeTask}></div>
                                <div className={`${styles.fakeTask} ${styles.taskNew}`}></div>
                                
                                <div className={`${styles.fakeTask} ${styles.taskDrag}`}>
                                    <MousePointer2 className={styles.virtualMouse} size={24} fill="black" />
                                </div>
                            </div>

                            <div className={styles.fakeList}>
                                <div className={styles.fakeListHeader}>Terminado</div>
                                <div className={styles.fakeTask}></div>
                                <div className={styles.fakeTask}></div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>

            <section className={styles.info}>
                <div className={styles.infoHeaders}>
                    <h4>WIP 1.0</h4>
                    <h2>Todo lo que necesitas para avanzar sin complicaciones</h2>

                    <h3>Diseñado para que tu productividad fluya con naturalidad</h3>
                </div>
                
                <div className={styles.cards_section}>
                    <div className={styles.cardWrapper1}>
                        <Card 
                            titulo="Tableros claros, tareas vivas"
                            descripcion="Organiza tus proyectos visualmente con un sistema flexible y fluido."
                            cierre="Mueve, agrupa y prioriza con total libertad."
                        />
                    </div>
                    <div className={styles.cardWrapper2}>
                        <Card 
                            titulo="Diseñado para avanzar"
                            descripcion="Cada lista, cada tarjeta, cada movimiento refleja progreso."
                            cierre="WIP te ayuda a concentrarte en lo que importa, avanzar paso a paso."
                        />
                    </div>
                    <div className={styles.cardWrapper3}>
                        <Card 
                            titulo="Experiencia moderna y ágil"
                            descripcion="Interfaz limpia, intuitiva y rápida."
                            cierre="Porque tu herramienta de trabajo también debe inspirarte."
                        />
                    </div>
                </div>
            </section>

            <section className={styles.motiv}>
                <div className={styles.motivContent}>
                    <h2>El progreso no se mide por lo que terminas,</h2>
                    <h2>sino por lo que construyes cada día.</h2>
                    <div className={styles.motivDivider}></div>


                    <div className={`${styles.showcaseDrag} ${styles.animateFadeInUpDelay2}`}>
                        <div className={styles.miniList}>
                            <div className={styles.listTitle}>Por hacer</div>
                            <div className={`${styles.miniTask} ${styles.taskDrag}`}>
                                <MousePointer2 className={styles.virtualMouse} size={20} fill="black" />
                            </div>
                        </div>
                        <div className={styles.miniList}>
                            <div className={styles.listTitle}>En progreso</div>
                            <div className={styles.miniTask}></div>
                        </div>
                    </div>
                    

                    <p>Con WIP,</p>
                    <p>tu trabajo siempre está en marcha, sin complicaciones, sin fricción y sin distracciones.</p>
                    <p><strong>Gestionar tu tiempo nunca había sido tan sencillo</strong></p>
                </div>
            </section>

            <section className={styles.start}>
                <div className={styles.startContent}>
                    <h2>¿Listo para dar el siguiente paso?</h2>
                    <h3>Empieza a construir tu próximo proyecto con WIP</h3>
                    <div className={styles.primary_button}>
                        <button onClick={() => navigate('/signup')}>Crea tu primer tablero</button>
                    </div>
                </div>
            </section>

            <section className={styles.pwaSection}>
                <div className={styles.pwaContent}>
                    <div className={styles.pwaHeader}>
                        <Smartphone className={styles.pwaIcon} size={40} />
                        <h2>Lleva WIP siempre contigo</h2>
                        <p>Instala nuestra aplicación directamente desde tu navegador para tener acceso instantáneo, sin descargas pesadas ni consumir almacenamiento de tu teléfono.</p>
                    </div>

                    <div className={styles.pwaTabsContainer}>
                        <div className={styles.pwaTabs}>
                            <button 
                                className={`${styles.pwaTabBtn} ${pwaTab === 'android' ? styles.activeTab : ''}`}
                                onClick={() => setPwaTab('android')}
                            >
                                Android (Chrome)
                            </button>
                            <button 
                                className={`${styles.pwaTabBtn} ${pwaTab === 'ios' ? styles.activeTab : ''}`}
                                onClick={() => setPwaTab('ios')}
                            >
                                <Apple size={16} /> iOS (Safari)
                            </button>
                        </div>

                        <div className={styles.pwaInstructions}>
                            {pwaTab === 'android' ? (
                                <ol className={styles.pwaList}>
                                    <li>Abre el navegador <strong>Chrome</strong>.</li>
                                    <li>Toca el menú de los tres puntos <MoreVertical size={16} style={{verticalAlign: 'middle'}}/> en la esquina superior derecha.</li>
                                    <li>Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Añadir a la pantalla de inicio"</strong>.</li>
                                    <li>Sigue las instrucciones en pantalla.</li>
                                </ol>
                            ) : (
                                <ol className={styles.pwaList}>
                                    <li>Abre el navegador <strong>Safari</strong>.</li>
                                    <li>Toca el botón Compartir <Share size={16} style={{verticalAlign: 'middle', margin: '0 4px'}}/> en la parte inferior de la pantalla.</li>
                                    <li>Desliza hacia arriba el menú y selecciona <strong>"Añadir a la pantalla de inicio"</strong>.</li>
                                    <li>Toca "Añadir" en la esquina superior derecha.</li>
                                </ol>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        <CookieBanner />
    </div>
  );
}