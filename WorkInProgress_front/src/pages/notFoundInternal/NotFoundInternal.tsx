import React from 'react';
import styles from './NotFoundInternal.module.css';
import { Link } from 'react-router'; 
import { Search, AlertCircle, ArrowLeft } from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTittle';

export default function NotFoundInternal() {
      usePageTitle(`404 | Tarjeta perdida`);
  return (
    <section className={styles.internal_error_section}>
      <div className={styles.wrapper}>
        
        <div className={styles.scanner_container}>
          <div className={styles.board_skeleton}>
            <div className={styles.skeleton_column}>
              <div className={styles.skeleton_header}></div>
              <div className={styles.skeleton_card}></div>
            </div>
            <div className={styles.skeleton_column}>
              <div className={styles.skeleton_header}></div>
              <div className={styles.skeleton_card}></div>
              <div className={styles.skeleton_card}></div>
            </div>
          </div>
          
          <div className={styles.animated_magnifier}>
            <Search size={50} className={styles.magnifier_icon} />
          </div>
        </div>

        <div className={styles.badge_error}>
          <AlertCircle size={18} />
          <span>Error 404 interno</span>
        </div>
        
        <h2 className={styles.title}>Espacio no encontrado</h2>
        
        <p className={styles.description}>
          La dirección a la que intentas acceder no corresponde a ningún tablero, pila o ajuste disponible en tu sesión actual. Es posible que el enlace esté roto o no tengas permisos.
        </p>

        <div className={styles.actions}>
          <Link to="/user/home" className={styles.btn_primary}>
            <ArrowLeft size={18} />
            <span>Volver a mi resumen</span>
          </Link>
          <Link to="/user/tableros" className={styles.btn_secondary}>
            Ver mis tableros
          </Link>
        </div>

      </div>
    </section>
  );
}