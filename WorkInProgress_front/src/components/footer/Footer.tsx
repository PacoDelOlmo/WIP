import { useState } from 'react'
import styles from './Footer.module.css'
import LogoWip from './../../assets/img/WIP_Logo.png'

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
                        <li><a href="">Contacto</a></li>
                        <li><a href="">Funciones</a></li>
                        <li><a href="">Recursos</a></li>
                        <li><a href="">Soluciones</a></li>
                        <li><a href="">FAQs</a></li>
                        <li><a href="">Guía de Estilos</a></li>
                    </ul>
                </div>
                <div id="informacion" className={`${styles.columna_footer} ${seccionActive === 'informacion' ? styles.active : ''}`} >
                    <h3 onClick={() => handleToggle('informacion')}>Información</h3>
                    <ul className={styles.enlaces}>
                        <li><a href="">¿Que es WIP?</a></li>
                        <li><a href="">Trabaja con nosotros</a></li>
                        <li><a href="">Política de privacidad</a></li>
                        <li><a href="">Términos y condiciones de uso</a></li>
                        <li><a href="">Politica de cookies</a></li>
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
                        <li><a href="" className={styles.container_logo_WIP}><img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/></a></li>
                        <li><a href="">Términos y condiciones</a></li>
                        <li><a href="">Política de privacidad</a></li>
                        <li><a href="">Cookies</a></li>
                    </ul>
                </div>

                <a href="" className={styles.container_logo_WIP_mobile}><img src={LogoWip} alt="Logotipo WIP" className={styles.WIP_button}/></a>

                <div className={styles.copy}>
                    © {anioActual} Work In Progress | Todos los derechos reservados
                </div>
            </section>
        </footer>
    </>

    )
}
