import styles from './Login.module.css'
import { Chrome, Github, Apple, Mail, Lock, Check, AlertCircle } from 'lucide-react'; 
import LogoWip from './../../assets/img/WIP_SinLetra.png';
import { useNavigate, Link } from 'react-router'
import { useState, type ReactElement } from 'react';
import { LoginService } from '../../services/LoginService';
import { useAuthStore } from '../../store/Auth';


export function Login() {

    const navigate = useNavigate();
    const loginEnStore = useAuthStore((state) => state.login);

    const [correoUsuario, setCorreoUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState<String | null>();

    const actulizarCorreoUsuario = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setCorreoUsuario(e.target.value);
        setError(null);
    }

    const actualizarContrsena = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setContrasena(e.target.value);
        setError(null);
    }

    async function comprobarLogin (event : React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        try{
            let rs = await LoginService.getCorrectLogin(correoUsuario, contrasena);

            if (rs.correcto){
                console.log("Login correcto, redirigiendo...")
                loginEnStore(rs.idUsuario);
                navigate('/user/home')
            } else {
                setError("Credenciales incorrectas. Intentelo de nuevo");

                setContrasena('');
                setCorreoUsuario('');
            }
        } catch (e){
            console.error(e);
            setError('Error de conexión con el servidor');
        }

    }

    return (
    <div className={styles.loginPageContainer}>
        
        <main className={styles.login_card}>
            <header className={styles.header}>
                <img src={LogoWip} alt="Logo de WIP" className={styles.logo}/>
                <h1>WIP</h1>
                <p className={styles.subtitle}>Bienvenido de nuevo</p>
            </header>

            <form  onSubmit={comprobarLogin}>
                <div className={styles.input_group}>
                    <label htmlFor="user">Correo electrónico</label>
                    <div className={styles.input_wrapper}>
                        <Mail size={18} className={styles.input_icon} />
                        <input
                            type="email" 
                            name='user' 
                            id="user" 
                            placeholder='ejemplo@correo.com'
                            value={correoUsuario}
                            onChange={(e) => actulizarCorreoUsuario(e)}
                            required
                            />
                    </div>
                </div>

                <div className={styles.input_group}>
                    <label htmlFor='password'>Contraseña</label>
                    <div className={styles.input_wrapper}>
                        <Lock size={18} className={styles.input_icon} />
                        <input 
                            type="password" 
                            name='password' 
                            id="password" 
                            placeholder='••••••••'
                            value={contrasena}
                            onChange={(e) => actualizarContrsena(e)}
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className={styles.error_message} style={{ color: 'red', display: 'flex', gap: '5px', fontSize: '0.9rem', marginTop: '10px', alignItems: 'center' }}>
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

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

                <button className={styles.primary_button} type='submit'>Iniciar sesión</button>
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