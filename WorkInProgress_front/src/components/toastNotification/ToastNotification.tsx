import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import styles from './ToastNotification.module.css';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
}

export function ToastNotification({ message, type, isVisible, onClose }: ToastProps) {
    
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            <div className={styles.icon}>
                {type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            </div>
            <p className={styles.message}>{message}</p>
            <button className={styles.closeBtn} onClick={onClose}>
                <X size={16} />
            </button>
        </div>
    );
}