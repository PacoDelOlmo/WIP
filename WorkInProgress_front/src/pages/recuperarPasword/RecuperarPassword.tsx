import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { Mail, User, Lock, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";
import LogoWip from './../../assets/img/WIP_SinLetra.png';
import styles from '../login/Login.module.css';
import { UserService } from '../../services/UserService';

export function RecuperarPassword() {
    const navigate = useNavigate();
    
    const [paso, setPaso] = useState<1 | 2>(1);
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [nuevaPassword, setNuevaPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const handleVerificar = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!captchaToken) {
            setError('Por favor, completa el CAPTCHA');
            return;
        }

        setIsLoading(true);
        try {
            // const valid = await UserService.verificarIdentidad(correo, usuario, captchaToken);
            const valid = true; 
            
            if (valid) {
                setPaso(2); 
            } else {
                setError('No se ha encontrado ninguna cuenta con esos datos.');
                recaptchaRef.current?.reset();
                setCaptchaToken(null);
            }
        } catch (err) {
            setError('Error de conexión con el servidor.');
            recaptchaRef.current?.reset();
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!passwordRegex.test(nuevaPassword)) {
            setError('La contraseña debe tener mínimo 8 caracteres, mayúsculas, minúsculas, un número y un símbolo.');
            return;
        }

        if (nuevaPassword !== repPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setIsLoading(true);
        try {
            // const valid = await UserService.verificarIdentidad(correo, usuario, captchaToken);
            navigate('/password-success');
        } catch (err) {
            setError('No se pudo actualizar la contraseña.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginPageContainer}>
            <main className={styles.login_card}>
                <header className={styles.header}>
                    <img src={LogoWip} alt="Logo de WIP" className={styles.logo}/>
                    <h1>Recuperar Acceso</h1>
                    <p className={styles.subtitle}>
                        {paso === 1 ? 'Verifica tu identidad para continuar' : 'Establece tu nueva contraseña segura'}
                    </p>
                </header>

                {error && (
                    <div className={styles.error_general}>
                        <AlertCircle size={32} /> {error}
                    </div>
                )}

                {paso === 1 && (
                    <form onSubmit={handleVerificar}>
                        <div className={styles.input_group}>
                            <label>Correo electrónico</label>
                            <div className={styles.input_wrapper}>
                                <Mail size={18} className={styles.input_icon} />
                                <input type="email" placeholder='ejemplo@correo.com' value={correo} onChange={(e) => {setCorreo(e.target.value); setError('');}} required />
                            </div>
                        </div>

                        <div className={styles.input_group}>
                            <label>Nombre de Usuario</label>
                            <div className={styles.input_wrapper}>
                                <User size={18} className={styles.input_icon} />
                                <input type="text" placeholder='tu_usuario' value={usuario} onChange={(e) => {setUsuario(e.target.value); setError('');}} required />
                            </div>
                        </div>

                        <div className={styles.captcha}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                onChange={(token) => {setCaptchaToken(token); setError('');}}
                                hl="es"
                            />
                        </div>

                        <button className={styles.primary_button} type='submit' disabled={isLoading}>
                            {isLoading ? 'Verificando...' : 'Siguiente Paso'} <ArrowRight size={18} style={{marginLeft: '8px'}} />
                        </button>
                    </form>
                )}

                {paso === 2 && (
                    <form onSubmit={handleReset}>
                        <div className={styles.input_group}>
                            <label>Nueva Contraseña</label>
                            <div className={styles.input_wrapper}>
                                <Lock size={18} className={styles.input_icon} />
                                <input type="password" placeholder='••••••••' value={nuevaPassword} onChange={(e) => {setNuevaPassword(e.target.value); setError('');}} required />
                            </div>
                        </div>

                        <div className={styles.input_group}>
                            <label>Repite la Contraseña</label>
                            <div className={styles.input_wrapper}>
                                <Lock size={18} className={styles.input_icon} />
                                <input type="password" placeholder='••••••••' value={repPassword} onChange={(e) => {setRepPassword(e.target.value); setError('');}} required />
                            </div>
                        </div>

                        <button className={styles.primary_button} type='submit' disabled={isLoading} style={{ marginTop: '1.5rem' }}>
                            {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                        </button>
                    </form>
                )}

                <section className={styles.footer_section}>
                    <div className={styles.links_footer} style={{ justifyContent: 'center' }}>
                        <Link to="/login" className={styles.forgot_link} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <ArrowLeft size={16}/> Volver al Login
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}