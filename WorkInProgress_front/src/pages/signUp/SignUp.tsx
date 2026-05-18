import styles from './SignUp.module.css'
import { Chrome, Github, Apple, User, Mail, Lock, Check, AlertCircle } from 'lucide-react'; 
import LogoWip from './../../assets/img/WIP_SinLetra.png';
import { Link, useNavigate } from 'react-router'
import { useState, useRef } from 'react';
import { RegisterService } from '../../services/RegisterService';
import type { RegisterUser } from '../../services/RegisterService';
import { useAuthStore } from '../../store/Auth';
import { ToastNotification } from '../../components/toastNotification/ToastNotification';

import ReCAPTCHA from "react-google-recaptcha";

export function SignUp() {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [repContrasena, setRepContrasena] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [condiciones, setCondiciones] = useState(false);
    
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    
    const navigate = useNavigate();
    const loginEnStore = useAuthStore((state) => state.login);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


    const recogerCorreo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(e.target.value);
        if (emailError) setEmailError('');
    }

    const recogerContrasena = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContrasena(e.target.value);
        if (passwordError) setPasswordError('');
    }

    const recogerRepContrasena = (e: React.ChangeEvent<HTMLInputElement>) => setRepContrasena(e.target.value);
    const recogerNombre = (e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value);
    const recogerApellido = (e: React.ChangeEvent<HTMLInputElement>) => setApellido(e.target.value);
    const recogerUsuario = (e: React.ChangeEvent<HTMLInputElement>) => setUsuario(e.target.value);
    const toggleCondiciones = () => setCondiciones(!condiciones);

    const onCaptchaChange = (token: string | null) => {
        setCaptchaToken(token);
        if (error === 'Por favor, completa el CAPTCHA') setError('');
    };

    const [toastConfig, setToastConfig] = useState<{ isVisible: boolean; message: string; type: 'success' | 'error' }>({
        isVisible: false,
        message: "",
        type: "success"
    });

    async function register(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        setEmailError('');
        setPasswordError('');

        if (!emailRegex.test(correo)) {
            setEmailError('Introduce un correo electrónico válido.');
            return;
        }

        if (!passwordRegex.test(contrasena)) {
            setPasswordError('Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.');
            return;
        }

        if (contrasena !== repContrasena) {
            setPasswordError('Las contraseñas no coinciden.');
            return;
        }

        if (!condiciones) {
            setError('Debes aceptar los términos y condiciones.');
            return;
        }

        if (!captchaToken) {
            setError('Por favor, completa el CAPTCHA');
            return;
        }

        const registerData: RegisterUser = {
            nombre: nombre,
            apellido: apellido,
            nombreUsuario: usuario,
            correo: correo,
            contrasena: contrasena
        }

        try {
            let registerResponse = await RegisterService.postRegister(registerData);

            if (registerResponse.correct) {
                loginEnStore(registerResponse.id);
                navigate('/user/home');
            } else {
                setError("Credenciales incorrectas. Inténtelo de nuevo.");
                setContrasena('');
                setRepContrasena('');
                recaptchaRef.current?.reset();
                setCaptchaToken(null);
            }
        } catch (e) {
            console.error(e);
            setError('Error de conexión con el servidor');
            recaptchaRef.current?.reset();
            setCaptchaToken(null);
        }
    }

    const showToast = (message: string, type: 'success' | 'error') => {
        setToastConfig({ isVisible: true, message, type });
    };

    return (
    <div className={styles.signupPageContainer}>
        
        <main className={styles.signup_card}>
            <header className={styles.header}>
                <img src={LogoWip} alt="Logo de WIP" className={styles.logo}/>
                <h1>Crear Cuenta</h1>
                <p className={styles.subtitle}>Únete a WIP y organiza tu trabajo</p>
            </header>

            {error && (
                <div className={styles.error_general}>
                    <AlertCircle size={18} /> {error}
                </div>
            )}

            <form onSubmit={register}>
                <div className={styles.form_row}>
                    <div className={styles.input_group}>
                        <label htmlFor="name">Nombre</label>
                        <div className={styles.input_wrapper}>
                            <User size={18} className={styles.input_icon} />
                            <input type="text" id="name" placeholder='Tu nombre' value={nombre} onChange={recogerNombre} required />
                        </div>
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="surname">Apellido</label>
                        <div className={styles.input_wrapper}>
                            <User size={18} className={styles.input_icon} />
                            <input type="text" id="surname" placeholder='Tu apellido' value={apellido} onChange={recogerApellido} required />
                        </div>
                    </div>
                    
                    <div className={styles.input_group}>
                        <label htmlFor="username">Usuario</label>
                        <div className={styles.input_wrapper}>
                            <span className={styles.input_prefix}>@</span>
                            <input type="text" id="username" placeholder='usuario' value={usuario} onChange={recogerUsuario} required />
                        </div>
                    </div>
                </div>

                <div className={styles.input_group}>
                    <label htmlFor="email">Correo electrónico</label>
                    <div className={styles.input_wrapper}>
                        <Mail size={18} className={styles.input_icon} />
                        <input type="email" id="email" placeholder='ejemplo@correo.com' value={correo} onChange={recogerCorreo} required />
                    </div>
                    {emailError && <span className={styles.error_correo}>{emailError}</span>}
                </div>
                
                <div className={styles.input_group}>
                    <label htmlFor='password'>Contraseña</label>
                    <div className={styles.input_wrapper}>
                        <Lock size={18} className={styles.input_icon} />
                        <input type="password" id="password" placeholder='••••••••' value={contrasena} onChange={recogerContrasena} required />
                    </div>
                    {passwordError && <span className={styles.error_pass}>{passwordError}</span>}
                </div>

                <div className={styles.input_group}>
                    <label htmlFor='confirm_password'>Repita contraseña</label>
                    <div className={styles.input_wrapper}>
                        <Lock size={18} className={styles.input_icon} />
                        <input type="password" id="confirm_password" placeholder='••••••••' value={repContrasena} onChange={recogerRepContrasena} required />
                    </div>
                </div>

                <div className={styles.terms_group}>
                    <label className={styles.checkbox_container}>
                        <input type="checkbox" checked={condiciones} onChange={toggleCondiciones} required />
                        <span className={styles.checkmark}>
                            <Check size={12} strokeWidth={4} />
                        </span>
                        <span className={styles.terms_text}>
                            Acepto los <a href="#">términos y condiciones</a>
                        </span>
                    </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', marginTop: '1rem' }}>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={onCaptchaChange}
                        hl="es" 
                    />
                </div>

                <button type='submit' className={styles.primary_button}>Registrarse</button>
            </form>

            <section className={styles.footer_section}>
                <div className={styles.separator}>
                    <span>O regístrate con</span>
                </div>
                
                <div className={styles.social_buttons_group}>
                    <button 
                        type="button" 
                        className={styles.social_btn} 
                        title="Google"
                        onClick={() => showToast("La integración con Google estará disponible en la v2.0", "success")}
                    >
                        <Chrome size={20}/>
                    </button>
                    
                    <button 
                        type="button" 
                        className={styles.social_btn} 
                        title="Apple"
                        onClick={() => showToast("El inicio de sesión con Apple llegará próximamente", "success")}
                    >
                        <Apple size={20}/>
                    </button>
                    
                    <button 
                        type="button" 
                        className={styles.social_btn} 
                        title="GitHub"
                        onClick={() => showToast("La vinculación con GitHub se implementará pronto", "success")}
                    >
                        <Github size={20}/>
                    </button>
                </div>
                
                <div className={styles.links_footer}>
                    <span>¿Ya tienes cuenta?</span>
                    <Link to="/login" className={styles.login_link}>Iniciar Sesión</Link>
                </div>
            </section>
        </main>

        <ToastNotification 
            isVisible={toastConfig.isVisible}
            message={toastConfig.message}
            type={toastConfig.type}
            onClose={() => setToastConfig({ ...toastConfig, isVisible: false })}
        />
        
    </div>
    )
}