import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Cookie, X } from 'lucide-react';
import styles from './CookieBanner.module.css';

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = getCookie('wip_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };

    const setCookie = (name: string, value: string) => {
        const d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 días en milisegundos
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    };


    const handleAccept = (nivel: 'rechazada' | 'basica' | 'completa') => {
        
        setCookie('wip_cookie_consent', nivel);
        if (nivel === 'basica' || nivel === 'completa') {
            setCookie('wip_last_access', new Date().toISOString());
        }

        if (nivel === 'completa') {
            setCookie('wip_analytics_enabled', 'true');
            setCookie('wip_ui_preferences', 'advanced');
        }

        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.bannerOverlay}>
            <div className={styles.cookieModal}>
                <button className={styles.closeBtn} onClick={() => handleAccept('rechazada')}>
                    <X size={20} />
                </button>
                
                <div className={styles.content}>
                    <div className={styles.iconWrapper}>
                        <Cookie size={32} />
                    </div>
                    <div className={styles.textContent}>
                        <h3>Valoramos tu privacidad</h3>
                        <p>
                            Utilizamos cookies propias para el correcto funcionamiento de WIP. 
                            Puedes elegir un nivel de configuración básico (último acceso) o completo 
                            (experiencia mejorada). Conoce más en nuestra <Link to="/politica_cookies">Política de Cookies</Link>.
                        </p>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button 
                        className={styles.btnReject} 
                        onClick={() => handleAccept('rechazada')}
                    >
                        Rechazar
                    </button>
                    <button 
                        className={styles.btnBasic} 
                        onClick={() => handleAccept('basica')}
                    >
                        Solo Básicas
                    </button>
                    <button 
                        className={styles.btnAccept} 
                        onClick={() => handleAccept('completa')}
                    >
                        Aceptar Completas
                    </button>
                </div>
            </div>
        </div>
    );
}