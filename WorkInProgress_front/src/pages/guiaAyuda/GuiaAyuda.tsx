import { 
    Info, 
    LayoutDashboard, 
    Users, 
    Search, 
    Settings, 
    MousePointer2, 
    CheckCircle2, 
    Zap
} from 'lucide-react';
import styles from './GuiaAyuda.module.css';

export function GuiaAyuda() {
    return (
        <div className={styles.pageWrapper}>
            {/* Fondo con blobs dinámicos */}
            <div className={styles.blob1}></div>
            <div className={styles.blob2}></div>

            <main className={styles.container}>
                <header className={styles.hero}>
                    <div className={styles.badge}>
                        <Info size={16} />
                        Centro de Ayuda
                    </div>
                    <h1>Tu hoja de ruta en <span>WIP</span></h1>
                    <p>
                        Bienvenido a tu panel de control. WIP está diseñado para que tu productividad 
                        no tenga límites. Aquí tienes una guía rápida para dominar cada rincón de tu espacio.
                    </p>
                </header>

                <div className={styles.tourGrid}>
                    
                    <div className={styles.tourCard}>
                        <div className={styles.iconCircle}><LayoutDashboard /></div>
                        <h3>Panel de Inicio</h3>
                        <p>Es tu centro de mando. Desde aquí visualizas tus tableros recientes y tienes acceso directo a la creación de nuevos espacios de trabajo.</p>
                        <div className={styles.tip}>Tip: Usa el buscador superior para saltar entre tareas.</div>
                    </div>

                    <div className={styles.tourCard}>
                        <div className={styles.iconCircle}><Zap /></div>
                        <h3>Workspaces</h3>
                        <p>Los pilares de tu organización. Un Workspace puede ser un cliente, un departamento o un proyecto personal de gran envergadura.</p>
                        <div className={styles.tip}>Separa tu vida personal de la profesional aquí.</div>
                    </div>

                    <div className={styles.tourCard}>
                        <div className={styles.iconCircle} style={{color: '#F27A24'}}><Users /></div>
                        <h3>Colaboradores</h3>
                        <p>Añade equipo a tus espacios mediante su email. Podrás ver quién tiene acceso y qué rol desempeña en cada proyecto.</p>
                        <div className={styles.tip}>Ideal para proyectos B2B o trabajos en grupo.</div>
                    </div>
                    <div className={styles.tourCard}>
                        <div className={styles.iconCircle}><Settings /></div>
                        <h3>Ajustes de Espacio</h3>
                        <p>La zona de administración. Cambia el nombre de tus espacios o revoca accesos de forma segura y permanente.</p>
                        <div className={styles.tip}>Solo los propietarios tienen acceso a esta zona.</div>
                    </div>
                </div>

                <section className={styles.decalogo}>
                    <h2>Decálogo de Uso</h2>
                    <div className={styles.stepsList}>
                        <div className={styles.stepItem}>
                            <span className={styles.stepNumber}>01</span>
                            <div>
                                <h4>Crea con propósito</h4>
                                <p>Antes de empezar, define si tu Workspace será personal o colaborativo.</p>
                            </div>
                        </div>
                        <div className={styles.stepItem}>
                            <span className={styles.stepNumber}>02</span>
                            <div>
                                <h4>Usa el Buscador Global</h4>
                                <p>No navegues a ciegas; si sabes lo que buscas, la barra de búsqueda es tu mejor aliada.</p>
                            </div>
                        </div>
                        <div className={styles.stepItem}>
                            <span className={styles.stepNumber}>03</span>
                            <div>
                                <h4>Mantén tus listas vivas</h4>
                                <p>Mueve las tareas al terminar. Ver el progreso visual reduce la carga cognitiva.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.rolesSection}>
                    <div className={styles.rolesTableWrapper}>
                        <h3>Entendiendo los Permisos</h3>
                        <table className={styles.rolesTable}>
                            <thead>
                                <tr>
                                    <th>Capacidad</th>
                                    <th>Propietario</th>
                                    <th>Colaborador</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Gestionar Usuarios</td>
                                    <td><CheckCircle2 size={18} className={styles.check} /></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Editar Nombre Workspace</td>
                                    <td><CheckCircle2 size={18} className={styles.check} /></td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Crear / Mover Tareas</td>
                                    <td><CheckCircle2 size={18} className={styles.check} /></td>
                                    <td><CheckCircle2 size={18} className={styles.check} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}