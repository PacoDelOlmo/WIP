import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { ShieldAlert } from 'lucide-react';
import styles from './PoliticaPrivacidad.module.css';
import { CookieBanner } from '../../components/cookieBanner/CookieBanner';
import { usePageTitle } from '../../hooks/usePageTittle';

export function PoliticaPrivacidad() {
    usePageTitle(`Política de Privacidad`);
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.blobShape1}></div>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <ShieldAlert size={48} className={styles.heroIcon} />
                    <h1>Política de Privacidad</h1>
                    <span className={styles.lastUpdated}>Última actualización: Mayo 2026</span>
                </section>
                
                <article className={styles.legalText}>
                    <h2>1. Información que Recopilamos</h2>
                    <p>En WIP creemos en el minimalismo de datos. Solo recopilamos la información estrictamente necesaria para que la aplicación funcione:</p>
                    <ul>
                        <li>Tu nombre de usuario o apodo.</li>
                        <li>Tu dirección de correo electrónico (para registro y notificaciones).</li>
                        <li>El contenido que tú mismo creas (tableros, tareas, etiquetas).</li>
                    </ul>

                    <h2>2. Uso de la Información</h2>
                    <p>Utilizamos tus datos exclusivamente para proveer y mantener nuestro servicio, notificarte sobre cambios en la plataforma y proveer soporte al usuario. Nunca venderemos tus datos a terceros.</p>

                    <h2>3. Tus Derechos</h2>
                    <p>Tienes derecho a acceder, actualizar o eliminar la información que tenemos sobre ti. Puedes gestionar todo esto desde la sección de 'Ajustes de Perfil' o solicitando la eliminación completa de la cuenta.</p>
                </article>
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
}