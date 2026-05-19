import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Scale } from 'lucide-react';
import styles from './TerminosCondiciones.module.css';
import { CookieBanner } from '../../components/cookieBanner/CookieBanner';
import { usePageTitle } from '../../hooks/usePageTittle';

export function TerminosCondiciones() {
    usePageTitle(`Términos y condiciones`);
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.blobShape1}></div>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <Scale size={48} className={styles.heroIcon} />
                    <h1>Términos y Condiciones</h1>
                    <span className={styles.lastUpdated}>Última actualización: Mayo 2026</span>
                </section>
                
                <article className={styles.legalText}>
                    <h2>1. Aceptación de los Términos</h2>
                    <p>Al acceder y utilizar Work In Progress (WIP), aceptas estar sujeto a estos términos. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al servicio.</p>

                    <h2>2. Uso del Servicio</h2>
                    <p>WIP es una herramienta diseñada para la gestión de proyectos y tareas. Te comprometes a no usar la plataforma para fines ilícitos, subir contenido malicioso, o intentar vulnerar la seguridad de la aplicación.</p>

                    <h2>3. Propiedad Intelectual</h2>
                    <p>Todo el contenido original, características y funcionalidad son propiedad exclusiva de WIP y Create Studio. Como proyecto de naturaleza Open Source parcial, ciertas partes del código pueden estar sujetas a licencias MIT de código abierto en nuestro repositorio.</p>

                    <h2>4. Limitación de Responsabilidad</h2>
                    <p>WIP se proporciona "tal cual". No garantizamos que el servicio sea ininterrumpido o libre de errores. En ningún caso WIP será responsable por la pérdida de datos o beneficios derivados del uso de la aplicación.</p>
                </article>
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
}