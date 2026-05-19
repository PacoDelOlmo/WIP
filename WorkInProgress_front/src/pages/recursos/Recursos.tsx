import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Database, Zap, Shield, Server, RefreshCw, HardDrive } from 'lucide-react';
import styles from './Recursos.module.css';
import { CookieBanner } from '../../components/cookieBanner/CookieBanner';
import { usePageTitle } from '../../hooks/usePageTittle';

export function Recursos() {
    usePageTitle(`Recursos`);
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <div className={styles.headerGlow}></div>
                <section className={styles.heroSection}>
                    <h1>Recursos y Capacidades</h1>
                    <p>
                        WIP no es solo una interfaz bonita. Debajo del capó, gestionamos 
                        los recursos de tus proyectos mediante una arquitectura robusta, 
                        preparada para escalar junto a las necesidades de tu equipo.
                    </p>
                </section>

                <div className={styles.gridRecursos}>
                    <div className={styles.recursoCard}>
                        <div className={styles.iconBox}><Database size={32} /></div>
                        <h3>Gestión de Datos Escalable</h3>
                        <p>Almacenamiento estructurado para miles de tareas, comentarios y etiquetas sin comprometer la velocidad de respuesta.</p>
                    </div>

                    <div className={styles.recursoCard}>
                        <div className={styles.iconBox}><Shield size={32} /></div>
                        <h3>Seguridad de Accesos</h3>
                        <p>Sistema de roles cifrado. Protegemos quién puede ver, editar o eliminar los recursos de cada espacio de trabajo colaborativo.</p>
                    </div>

                    <div className={styles.recursoCard}>
                        <div className={styles.iconBox}><Zap size={32} /></div>
                        <h3>Rendimiento Optimizado</h3>
                        <p>Interfaz construida con componentes React de carga perezosa y una API Spring Boot para respuestas en milisegundos.</p>
                    </div>

                    <div className={styles.recursoCard}>
                        <div className={styles.iconBox}><Server size={32} /></div>
                        <h3>Infraestructura en la Nube</h3>
                        <p>Despliegue preparado para entornos cloud, garantizando alta disponibilidad y sincronización en tiempo real en cualquier dispositivo.</p>
                    </div>

                    <div className={styles.recursoCard}>
                        <div className={styles.iconBox}><RefreshCw size={32} /></div>
                        <h3>Sincronización Continua</h3>
                        <p>Tus cambios se reflejan al instante. Eliminamos los conflictos de versiones, garantizando que todo el equipo trabaje sobre la misma información.</p>
                    </div>

                    <div className={styles.recursoCard}>
                        <div className={styles.iconBox}><HardDrive size={32} /></div>
                        <h3>Backups Automatizados</h3>
                        <p>La tranquilidad de tu trabajo es prioritaria. Generamos copias de seguridad incrementales para evitar cualquier pérdida accidental de datos.</p>
                    </div>
                </div>
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
}