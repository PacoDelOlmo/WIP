import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Cookie } from 'lucide-react';
import styles from './PoliticaCookies.module.css';
import { CookieBanner } from '../../components/cookieBanner/CookieBanner';

export function PoliticaCookies() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.blobShape1}></div>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <Cookie size={48} className={styles.heroIcon} />
                    <h1>Política de Cookies</h1>
                    <span className={styles.lastUpdated}>Última actualización: Mayo 2026</span>
                </section>
                
                <article className={styles.legalText}>
                    <h2>1. ¿Qué son las Cookies?</h2>
                    <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas una página web. Sirven para que la aplicación "recuerde" tus acciones o preferencias.</p>

                    <h2>2. Cómo usamos las Cookies en WIP</h2>
                    <p>Nos tomamos tu privacidad muy en serio. <strong>Solo utilizamos cookies propias y estrictamente necesarias</strong>. No usamos cookies de terceros para rastrear tu actividad ni mostrarte publicidad.</p>
                    <ul>
                        <li><strong>Cookies de sesión:</strong> Mantienen tu sesión abierta de forma segura mientras usas la aplicación.</li>
                        <li><strong>Cookies de preferencias:</strong> Recuerdan configuraciones básicas de la interfaz para mejorar tu experiencia.</li>
                    </ul>

                    <h2>3. Gestión de Cookies</h2>
                    <p>Puedes configurar tu navegador para rechazar todas las cookies. Sin embargo, ten en cuenta que si deshabilitas las cookies de sesión, no podrás iniciar sesión ni utilizar la plataforma WIP correctamente.</p>
                </article>
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
}