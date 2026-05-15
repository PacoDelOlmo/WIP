import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    itemName?: string;
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, itemName }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onCancel}>
                    <X size={20} />
                </button>
                
                <div className={styles.header}>
                    <div className={styles.iconContainer}>
                        <AlertTriangle size={28} color="#d9534f" />
                    </div>
                    <h2>{title}</h2>
                </div>
                
                <div className={styles.body}>
                    <p>{message}</p>
                    {itemName && <p className={styles.itemName}>"{itemName}"</p>}
                </div>
                
                <div className={styles.footer}>
                    <button className={styles.cancelBtn} onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className={styles.confirmBtn} onClick={onConfirm}>
                        Sí, eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}