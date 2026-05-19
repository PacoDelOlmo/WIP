import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Building2, Mail, Globe } from 'lucide-react';
import styles from './Contacto.module.css';
import { CookieBanner } from '../../components/cookieBanner/CookieBanner';
import { usePageTitle } from '../../hooks/usePageTittle';

export function Contacto() {
    usePageTitle('Contacto');

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.mainContent}>
                <div className={styles.contactContainer}>
                    <div className={styles.infoSide}>
                        <h1>Llevemos WIP a tu entorno</h1>
                        <p className={styles.pitch}>
                            Estamos en constante evolución. Si representas a una institución, 
                            empresa tecnológica, o buscas integrar la API de WIP en tu ecosistema, 
                            queremos escucharte.
                        </p>
                        
                        <div className={styles.contactDetails}>
                            <div className={styles.detailItem}>
                                <Building2 className={styles.icon} />
                                <span>Alianzas Estratégicas y B2B</span>
                            </div>
                            <div className={styles.detailItem}>
                                <Globe className={styles.icon} />
                                <span>Integraciones de API Personalizadas</span>
                            </div>
                            <div className={styles.detailItem}>
                                <Mail className={styles.icon} />
                                <span>partners@workinprogress.com</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formSide}>
                        <form className={styles.b2bForm} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label>Nombre y Apellidos</label>
                                    <input type="text" placeholder="Ej. Carlos Ruiz" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Compañía / Institución</label>
                                    <input type="text" placeholder="Tu organización" />
                                </div>
                            </div>
                            
                            <div className={styles.inputGroup}>
                                <label>Correo Corporativo</label>
                                <input type="email" placeholder="email@empresa.com" />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Motivo de la colaboración</label>
                                <select>
                                    <option>Integración de API</option>
                                    <option>Implementación en Empresa</option>
                                    <option>Propuesta de Partnership</option>
                                    <option>Otros</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Cuéntanos tu propuesta</label>
                                <textarea rows={4} placeholder="Detalla cómo podemos colaborar..."></textarea>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Enviar Propuesta
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
}