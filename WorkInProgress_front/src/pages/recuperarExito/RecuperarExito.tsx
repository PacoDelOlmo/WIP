import { Link } from 'react-router';
import { CheckCircle } from 'lucide-react';
import styles from './RecuperarExito.module.css'
import { usePageTitle } from '../../hooks/usePageTittle';

export function RecuperarExito() {

    usePageTitle('Recuperación correcta de contraseña');

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.blobShape1}></div>
            <div className={styles.blobShape2}></div>

            <main className={styles.container}>
                <div className={styles.successCard}>
                    
                    <div className={styles.iconWrapper}>
                        <div className={styles.pulseRing}></div>
                        <div className={styles.iconBackground}>
                            <CheckCircle size={48} className={styles.checkIcon} />
                        </div>
                    </div>
                    
                    <h1 className={styles.title}>
                        ¡Contraseña Restablecida!
                    </h1>
                    
                    <p className={styles.message}>
                        Tu contraseña ha sido actualizada con éxito. 
                        Ya puedes volver al inicio de sesión y acceder a tu cuenta de Work In Progress con tus nuevas credenciales.
                    </p>

                    <Link to="/login" className={styles.linkContainer}>
                        <button className={styles.primaryButton}>
                            Ir a Iniciar Sesión
                        </button>
                    </Link>
                    
                </div>
            </main>
        </div>
    );
}