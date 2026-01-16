import styles from './Ajustes.module.css'
import { Mail, Lock, User, Save } from 'lucide-react'

export function Ajustes() {
  return (
    <section className={styles.settings_container}>
      <header className={styles.settings_header}>
        <h1 className={styles.main_title}>Configuración del perfil</h1>
        <div className={styles.main_separator}></div>
      </header>

      <article className={styles.setting_block}>
        <h2 className={styles.block_title}>Cambio de correo electrónico</h2>
        
        <div className={styles.form_content}>
            <div className={styles.input_group}>
                <label htmlFor="new_email">Nuevo correo electrónico</label>
                <div className={styles.input_wrapper}>
                    <Mail size={18} className={styles.input_icon} />
                    <input 
                        type="email" 
                        id="new_email" 
                        placeholder="ejemplo@nuevo.com" 
                    />
                </div>
            </div>
            
            <div className={styles.action_row}>
                <button className={styles.save_button}>
                    <Save size={16} /> <span>Guardar</span>
                </button>
            </div>
        </div>
      </article>

      <hr className={styles.divider} />

      <article className={styles.setting_block}>
        <h2 className={styles.block_title}>Cambio de contraseña</h2>
        
        <div className={styles.form_content}>
            <div className={styles.input_group}>
                <label htmlFor="new_pass">Nueva contraseña</label>
                <div className={styles.input_wrapper}>
                    <Lock size={18} className={styles.input_icon} />
                    <input 
                        type="password" 
                        id="new_pass" 
                        placeholder="••••••••" 
                    />
                </div>
            </div>

            <div className={styles.input_group}>
                <label htmlFor="confirm_pass">Repita la nueva contraseña</label>
                <div className={styles.input_wrapper}>
                    <Lock size={18} className={styles.input_icon} />
                    <input 
                        type="password" 
                        id="confirm_pass" 
                        placeholder="••••••••" 
                    />
                </div>
            </div>

            <div className={styles.action_row}>
                <button className={styles.save_button}>
                    <Save size={16} /> <span>Guardar</span>
                </button>
            </div>
        </div>
      </article>

      <hr className={styles.divider} />

      <article className={`${styles.setting_block} ${styles.last}`}>
        <h2 className={styles.block_title}>Cambio de nombre de usuario</h2>
        
        <div className={styles.form_content}>
            <div className={styles.input_group}>
                <label htmlFor="new_username">Nuevo nombre de usuario</label>
                <div className={styles.input_wrapper}>
                    <User size={18} className={styles.input_icon} />
                    <input 
                        type="text" 
                        id="new_username" 
                        placeholder="NombreUsuario" 
                    />
                </div>
            </div>

            <div className={styles.action_row}>
                <button className={styles.save_button}>
                    <Save size={16} /> <span>Guardar</span>
                </button>
            </div>
        </div>
      </article>

    </section>
  )
}