import { useState } from 'react'
import styles from './Footer.module.css'
import LogoWip from './../../assets/img/WIP_Logo.png'
import { Link } from 'react-router';

export function Footer() {

    const [seccionActive, setSeccionActive] = useState<string | null>(null);

    const handleToggle = (seccion: string) => {
        setSeccionActive(seccionActive === seccion ? null : seccion)
    }

    const anioActual : number = new Date().getFullYear();


  return (
    <>
        <footer className={styles.footer}>
            <section id="info" className={styles.footer_info}>
                <div id="contacto" className={`${styles.columna_footer} ${seccionActive === 'contacto' ? styles.active : ''}`}>
                    <h3 onClick={() => handleToggle('contacto')}>Contáctanos</h3>
                    <ul className={styles.enlaces}>
                        <li><a href="tel:+34666666666">+34 600 012 345</a></li>
                        <li><a href="mailto:contacto@mail.com">contacto@wip.com</a></li>
                        <li>Calle X nºY</li>
                        <li>Región, País</li>
                    </ul>
                </div>
                <div id="servicios" className={`${styles.columna_footer} ${seccionActive === 'servicios' ? styles.active : ''}`}>
                    <h3 onClick={() => handleToggle('servicios')}>Servicios</h3>
                    <ul className={styles.enlaces}>
                        <li><Link to={'/contacto'}>Contacto</Link></li>
                        <li><Link to={'/funciones'}>Funciones</Link></li>
                        <li><Link to={'/recursos'}>Recursos</Link></li>
                        <li><Link to={'/soluciones'}>Soluciones</Link></li>
                        <li><Link to={'/faqs'}>FAQs</Link></li>
                        <li><Link to={'/guia_estilos'}>Guía de Estilos</Link></li>
                    </ul>
                </div>
                <div id="informacion" className={`${styles.columna_footer} ${seccionActive === 'informacion' ? styles.active : ''}`} >
                    <h3 onClick={() => handleToggle('informacion')}>Información</h3>
                    <ul className={styles.enlaces}>
                        <li><Link to={'/guia_estilos'}>¿Que es WIP?</Link></li>
                        <li><Link to={'/trabaja'}>Trabaja con nosotros</Link></li>
                        <li><Link to={'/politica_privacidad'}>Política de privacidad</Link></li>
                        <li><Link to={'/terminos_condiciones'}>Términos y condiciones de uso</Link></li>
                        <li><Link to={'/politica_cookies'}>Politica de cookies</Link></li>
                    </ul>
                </div>
                <div id="autor" className={styles.autor}>
                    <span>Desarrollado por </span>
                    <strong>Create Studio</strong>
                    </div>
            </section>
            <section id="enlacesCopy" className={styles.footer_bottom}>
                <div className={styles.politicas_footer}>
                    <ul>
                        <li><Link to={'/'} className={styles.container_logo_WIP}><img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/></Link></li>
                        <li><Link to={'/terminos_condiciones'}>Términos y condiciones</Link></li>
                        <li><Link to={'/politica_privacidad'}>Política de privacidad</Link></li>
                        <li><Link to={'/politica_cookies'}>Cookies</Link></li>
                    </ul>
                </div>

                <Link to={'/'} className={styles.container_logo_WIP_mobile}><img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/></Link>

                <div className={styles.copy}>
                    © {anioActual} Work In Progress | Todos los derechos reservados
                </div>
            </section>
        </footer>
    </>

    )
}
