import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Github, Code, PenTool, Bug, GitPullRequest } from 'lucide-react';
import styles from './Trabaja.module.css';
import { CookieBanner } from '../../components/cookieBanner/CookieBanner';
import { usePageTitle } from '../../hooks/usePageTittle';

export function Trabaja() {
    usePageTitle(`Trabaja con nosotros`);
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.blobShape1}></div>
            <div className={styles.blobShape2}></div>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <div className={styles.heroBadge}>Open Source</div>
                    <h1>Construyamos el futuro juntos</h1>
                    <p className={styles.leadText}>
                        Work In Progress no es solo una aplicación, es una comunidad. 
                        Creemos en el software libre, transparente y colaborativo. 
                        Tanto si eres desarrollador, diseñador o beta tester, hay un sitio para ti.
                    </p>
                </section>

                <section className={styles.rolesSection}>
                    <h2>¿Cómo puedes colaborar?</h2>
                    <div className={styles.rolesGrid}>
                        <div className={styles.roleCard}>
                            <Code className={styles.roleIcon} size={32} />
                            <h3>Frontend & Backend</h3>
                            <p>Ayúdanos a optimizar componentes en React, crear nuevas vistas o mejorar la arquitectura de nuestra API en Spring Boot.</p>
                        </div>
                        <div className={styles.roleCard}>
                            <PenTool className={styles.roleIcon} size={32} />
                            <h3>UI / UX Design</h3>
                            <p>Propón mejoras visuales, nuevas micro-interacciones o rediseños de componentes para hacer WIP aún más intuitivo.</p>
                        </div>
                        <div className={styles.roleCard}>
                            <Bug className={styles.roleIcon} size={32} />
                            <h3>QA & Testing</h3>
                            <p>Caza bugs, realiza pruebas de estrés y ayúdanos a asegurar que la aplicación funciona a la perfección en todos los navegadores.</p>
                        </div>
                        <div className={styles.roleCard}>
                            <GitPullRequest className={styles.roleIcon} size={32} />
                            <h3>Nuevas Funciones</h3>
                            <p>¿Echas de menos alguna integración? ¿Tienes una idea brillante? Abre una issue, propón tu idea y manda un Pull Request.</p>
                        </div>
                    </div>
                </section>

                <section className={styles.ctaSection}>
                    <div className={styles.ctaBox}>
                        <Github size={64} className={styles.githubLogo} />
                        <h2>Únete al Repositorio</h2>
                        <p>Todo el código está disponible en GitHub. Explora el proyecto, lee nuestras guías de contribución y deja tu estrella.</p>
                        <a href="https://github.com/PacoDelOlmo/WIP" target="_blank" rel="noreferrer" className={styles.githubBtn}>
                            <Github size={20} />
                            Ver en GitHub
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
}