import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { CheckCircle2, Users, Video, Megaphone, PenTool, Code2 } from 'lucide-react';
import styles from './Soluciones.module.css';

export function Soluciones() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.blobShape1}></div>
            <div className={styles.blobShape2}></div>
            
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <h1>Soluciones Globales</h1>
                    <p className={styles.leadText}>
                        Más que una herramienta, un ecosistema. Desde la gestión eficiente 
                        de tus proyectos diarios hasta el desarrollo integral de tu marca.
                    </p>
                </section>

                <section className={styles.appSolutions}>
                    <div className={styles.sectionHeader}>
                        <h2>Soluciones WIP</h2>
                        <div className={styles.divider}></div>
                    </div>
                    
                    <div className={styles.cardsGrid}>
                        <div className={styles.solutionCard}>
                            <div className={styles.iconWrapper}><CheckCircle2 size={32} /></div>
                            <h3>Gestión Personal</h3>
                            <p>Convierte el caos de tu día a día en un flujo de trabajo lineal. Prioriza tareas, establece etiquetas y visualiza tu progreso sin distracciones.</p>
                        </div>
                        <div className={styles.solutionCard}>
                            <div className={styles.iconWrapper}><Users size={32} /></div>
                            <h3>Coordinación de Equipos</h3>
                            <p>Centraliza la comunicación. Espacios colaborativos donde cada miembro del equipo sabe exactamente qué hacer, cuándo y cómo.</p>
                        </div>
                    </div>
                </section>

                <section className={styles.agencySection}>
                    <div className={styles.agencyHeader}>
                        <span className={styles.agencyTag}>La agencia detrás de WIP</span>
                        <h2>Create Studio</h2>
                        <p>
                            Ofrecemos soluciones 360º. Fusionamos la narrativa de la comunicación 
                            audiovisual con el desarrollo de aplicaciones web de vanguardia para 
                            impulsar tu negocio en todos los frentes.
                        </p>
                    </div>

                    <div className={styles.agencyGrid}>
                        <div className={styles.agencyService}>
                            <Video className={styles.serviceIcon} size={28} />
                            <h4>Audiovisual</h4>
                            <p>Producción de vídeo, motion graphics y narrativas visuales que conectan con tu audiencia.</p>
                        </div>
                        <div className={styles.agencyService}>
                            <PenTool className={styles.serviceIcon} size={28} />
                            <h4>Diseño UI/UX</h4>
                            <p>Interfaces atractivas, accesibles y diseñadas para maximizar la conversión y la experiencia de usuario.</p>
                        </div>
                        <div className={styles.agencyService}>
                            <Code2 className={styles.serviceIcon} size={28} />
                            <h4>Desarrollo Web y Apps</h4>
                            <p>Arquitecturas robustas, integraciones API y aplicaciones a medida preparadas para escalar.</p>
                        </div>
                        <div className={styles.agencyService}>
                            <Megaphone className={styles.serviceIcon} size={28} />
                            <h4>Marketing Estratégico</h4>
                            <p>Campañas orientadas a resultados, posicionamiento de marca y estrategias de crecimiento digital.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}