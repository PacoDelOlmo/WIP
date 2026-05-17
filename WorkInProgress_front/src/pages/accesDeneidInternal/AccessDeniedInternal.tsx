import { useNavigate } from 'react-router';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import styles from './AccessDeniedInternal.module.css';

interface AccessDeniedProps {
    mensaje?: string;
}

export function AccessDeniedInternal({ mensaje = "No tienes los permisos necesarios para acceder a esta área." }: AccessDeniedProps) {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <div className={styles.pulseRing}></div>
                    <ShieldAlert size={80} className={styles.shieldIcon} />
                </div>
                
                <h1 className={styles.title}>Acceso Denegado</h1>
                
                <p className={styles.message}>
                    {mensaje}
                </p>

                <div className={styles.divider}></div>

                <div className={styles.actions}>
                    <button 
                        className={styles.btnBack} 
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={18} />
                        Volver atrás
                    </button>
                    
                    <button 
                        className={styles.btnHome} 
                        onClick={() => navigate('/user/home')}
                    >
                        <Home size={18} />
                        Ir al inicio
                    </button>
                </div>
            </div>
        </div>
    );
}