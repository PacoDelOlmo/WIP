import styles from './Login.module.css'
import { Chrome, Github, Apple, Mail, Lock, Check } from 'lucide-react'; 
import LogoWip from './../../assets/img/WIP_SinLetra.png';
import { Link } from 'react-router'

export function Login() {
    return (
    <div className={styles.loginPageContainer}>
        
        <main className={styles.login_card}>
            <header className={styles.header}>
                <img src={LogoWip} alt="Logo de WIP" className={styles.logo}/>
                <h1>WIP</h1>
                <p className={styles.subtitle}>Bienvenido de nuevo</p>
            </header>

            <form action={'#'}>
                <div className={styles.input_group}>
                    <label htmlFor="user">Correo electrónico</label>
                    <div className={styles.input_wrapper}>
                        <Mail size={18} className={styles.input_icon} />
                        <input type="email" name='user' id="user" placeholder='ejemplo@correo.com'/>
                    </div>
                </div>

                <div className={styles.input_group}>
                    <label htmlFor='password'>Contraseña</label>
                    <div className={styles.input_wrapper}>
                        <Lock size={18} className={styles.input_icon} />
                        <input type="password" name='password' id="password" placeholder='••••••••'/>
                    </div>
                </div>

                <div className={styles.remember_me_group}>
                    <label className={styles.checkbox_container}>
                        <input type="checkbox" name="remember" id="remember" />
                        <span className={styles.checkmark}>
                            <Check size={12} strokeWidth={4} />
                        </span>
                        <span className={styles.checkbox_text}>Recordarme</span>
                    </label>
                    <Link to="#" className={styles.forgot_link}>¿Olvidaste tu contraseña?</Link>
                </div>

                <button className={styles.primary_button}>Iniciar sesión</button>
            </form>

            <section className={styles.footer_section}>
                <div className={styles.separator}>
                    <span>O continúa con</span>
                </div>
                
                <div className={styles.social_buttons_group}>
                    <button className={styles.social_btn} title="Google"><Chrome size={20}/></button>
                    <button className={styles.social_btn} title="Apple"><Apple size={20}/></button>
                    <button className={styles.social_btn} title="GitHub"><Github size={20}/></button>
                </div>
                
                <div className={styles.links_footer}>
                    <span>¿No tienes cuenta?</span>
                    <Link to="/signup" className={styles.create_account}>Crear Cuenta</Link>
                </div>
            </section>
        </main>
    </div>
    )
}