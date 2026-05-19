import { useNavigate } from 'react-router';
import { 
    Map, 
    Home, 
    LayoutDashboard, 
    UserCircle, 
    Compass, 
    AlertOctagon
} from 'lucide-react';
import styles from './AccessDenied.module.css';
import { usePageTitle } from '../../hooks/usePageTittle';

export function AccessDeneid() {
    const navigate = useNavigate();
    usePageTitle('Acceso denegado');
    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainWrapper}>
                
                {/* COLUMNA IZQUIERDA: Arte y Dinamismo */}
                <div className={styles.visualColumn}>
                    <div className={styles.glitchContainer}>
                        <h1 className={styles.hugeNumber}>403</h1>
                        <h1 className={styles.hugeNumberGlow}>403</h1>
                    </div>
                    <div className={styles.floatingIcon}>
                        <Compass size={120} strokeWidth={1} />
                    </div>
                    <div className={styles.visualText}>
                        <h2>¡Fuera del mapa!</h2>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Copy elaborado y Tarjetas */}
                <div className={styles.contentColumn}>
                    <div className={styles.header}>
                        <AlertOctagon className={styles.warningIcon} size={28} />
                        <h3>Ruta restringida</h3>
                    </div>
                    
                    <p className={styles.elaborateCopy}>
                        Parece que has intentado acceder a un tablero al que <strong>no tienes los permisos necesarios</strong> para husmear por aquí.
                    </p>

                    <div className={styles.reasonsBox}>
                        <p className={styles.reasonsTitle}>¿Qué ha podido pasar?</p>
                        <ul className={styles.reasonsList}>
                            <li>El espacio de trabajo ha sido eliminado.</li>
                            <li>Has intentado forzar una ruta privada sin ser propietario.</li>
                            <li>Un error tipográfico en la barra de direcciones.</li>
                        </ul>
                    </div>

                    <p className={styles.suggestionsTitle}>Te sugerimos volver a una zona segura:</p>
                    
                    <div className={styles.cardsGrid}>
                        <button className={styles.navCard} onClick={() => navigate('/user/home')}>
                            <div className={styles.cardIconWrapper}><Home size={24} /></div>
                            <div className={styles.cardText}>
                                <h4>Inicio</h4>
                                <span>Tu panel principal</span>
                            </div>
                        </button>

                        <button className={styles.navCard} onClick={() => navigate('/user/tableros')}>
                            <div className={styles.cardIconWrapper}><LayoutDashboard size={24} /></div>
                            <div className={styles.cardText}>
                                <h4>Tableros</h4>
                                <span>Todos tus proyectos</span>
                            </div>
                        </button>

                        <button className={styles.navCard} onClick={() => navigate('/user/perfil')}>
                            <div className={styles.cardIconWrapper}><UserCircle size={24} /></div>
                            <div className={styles.cardText}>
                                <h4>Tu Perfil</h4>
                                <span>Ajustes de cuenta</span>
                            </div>
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}