import { useState } from 'react';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { ChevronDown, HelpCircle } from 'lucide-react';
import styles from './FAQs.module.css';
import { CookieBanner } from '../../components/cookieBanner/CookieBanner';

export function FAQSs() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "¿Qué es WIP y a quién va dirigido?",
            a: "Work In Progress es un gestor de proyectos visual basado en tableros Kanban. Está diseñado tanto para individuos que quieren organizar su día a día, como para equipos que necesitan coordinar tareas y recursos de forma colaborativa."
        },
        {
            q: "¿Es una herramienta gratuita?",
            a: "Actualmente, la versión 1.0 de WIP es totalmente gratuita. Nuestro objetivo es ofrecer valor inmediato a la comunidad. En el futuro, introduciremos funcionalidades premium para grandes organizaciones bajo la agencia Create Studio."
        },
        {
            q: "¿Cómo invito a otras personas a mi tablero?",
            a: "Solo necesitas entrar en los ajustes de tu Espacio de Trabajo e introducir el correo electrónico de la persona. Si ya está registrada, obtendrá acceso al instante y podrá colaborar contigo en tiempo real."
        },
        {
            q: "¿Están seguros mis datos?",
            a: "Sí. Utilizamos infraestructuras modernas en la nube, contraseñas encriptadas y sistemas de validación de roles en el backend para asegurar que nadie sin permisos pueda acceder a tus espacios de trabajo."
        },
        {
            q: "¿Ofrecéis desarrollos a medida para empresas?",
            a: "¡Por supuesto! A través de nuestra agencia Create Studio, adaptamos WIP a tus necesidades corporativas o desarrollamos aplicaciones web, diseño UI/UX y campañas de marketing desde cero para tu negocio."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.blobShape1}></div>
            <div className={styles.blobShape2}></div>
            
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <HelpCircle size={48} className={styles.heroIcon} />
                    <h1>Preguntas Frecuentes</h1>
                    <p className={styles.leadText}>
                        Resolvemos tus dudas para que puedas centrarte en lo que importa: avanzar.
                    </p>
                </section>

                <section className={styles.faqSection}>
                    <div className={styles.accordionContainer}>
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
                            >
                                <button 
                                    className={styles.faqQuestion} 
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown 
                                        className={`${styles.chevron} ${openIndex === index ? styles.rotate : ''}`} 
                                        size={20} 
                                    />
                                </button>
                                
                                {/* El truco CSS del grid-template-rows se aplica a esta capa */}
                                <div className={styles.faqAnswerWrapper}>
                                    <div className={styles.faqAnswerInner}>
                                        <p>{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
}