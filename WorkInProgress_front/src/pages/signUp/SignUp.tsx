import styles from './SignUp.module.css'
import { Chrome, Github, Apple, User, Mail, Lock, Check } from 'lucide-react'; 
import LogoWip from './../../assets/img/WIP_SinLetra.png';
import { Link } from 'react-router'
import { useState } from 'react';
import { RegisterService } from '../../services/RegisterService';
import type { RegisterUser } from '../../services/RegisterService';

export function SignUp() {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [repContrasena, setRepContrasena] = useState('');
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [condiciones, setCondiciones] = useState(false);
    const [error, setError] = useState('');

    const recogerCorreo = (e  : React.ChangeEvent<HTMLInputElement>) =>{
        setCorreo(e.target.value);
    }

    const recogerContrasena = (e  : React.ChangeEvent<HTMLInputElement>) =>{
        setContrasena(e.target.value);
    }

    const recogerRepContrasena = (e  : React.ChangeEvent<HTMLInputElement>) =>{
        setRepContrasena(e.target.value);
    }

    const recogerNombre = (e  : React.ChangeEvent<HTMLInputElement>) =>{
        setNombre(e.target.value);
    }

    const recogerUsuario = (e  : React.ChangeEvent<HTMLInputElement>) =>{
        setUsuario(e.target.value);
    }

    const toggleCondiciones = () => {
        console.log("Antes: " +condiciones)
        setCondiciones(!condiciones);
    }

    async function register(event :React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let registerData : RegisterUser = {
            nombre: '',
            nombreUsuario: '',
            correo: '',
            contrasena: ''
        }
        if (contrasena === repContrasena && condiciones){
            registerData = {
                nombre: nombre,
                nombreUsuario: usuario,
                correo: correo,
                contrasena: contrasena
            }
        }

        try{

            let registerPromise = await RegisterService.postRegister(registerData);
        } catch (e) {
            console.error(e);
            setError('Error de conexión con el servidor');
        }
    }



    return (
    <div className={styles.signupPageContainer}>
        
        <main className={styles.signup_card}>
            <header className={styles.header}>
                <img src={LogoWip} alt="Logo de WIP" className={styles.logo}/>
                <h1>Crear Cuenta</h1>
                <p className={styles.subtitle}>Únete a WIP y organiza tu trabajo</p>
            </header>

            <form action={'#'}>
                <div className={styles.form_row}>
                    <div className={styles.input_group}>
                        <label htmlFor="name">Nombre</label>
                        <div className={styles.input_wrapper}>
                            <User size={18} className={styles.input_icon} />
                            <input type="text" name='name' id="name" placeholder='Tu nombre'/>
                        </div>
                    </div>
                    
                    <div className={styles.input_group}>
                        <label htmlFor="username">Usuario</label>
                        <div className={styles.input_wrapper}>
                            <span className={styles.input_prefix}>@</span>
                            <input type="text" name='username' id="username" placeholder='usuario'/>
                        </div>
                    </div>
                </div>

                <div className={styles.input_group}>
                    <label htmlFor="email">Correo electrónico</label>
                    <div className={styles.input_wrapper}>
                        <Mail size={18} className={styles.input_icon} />
                        <input type="email" name='email' id="email" placeholder='ejemplo@correo.com'/>
                    </div>
                </div>
                
                <div className={styles.input_group}>
                    <label htmlFor='password'>Contraseña</label>
                    <div className={styles.input_wrapper}>
                        <Lock size={18} className={styles.input_icon} />
                        <input type="password" name='password' id="password" placeholder='••••••••'/>
                    </div>
                </div>

                <div className={styles.input_group}>
                    <label htmlFor='confirm_password'>Repita contraseña</label>
                    <div className={styles.input_wrapper}>
                        <Lock size={18} className={styles.input_icon} />
                        <input type="password" name='confirm_password' id="confirm_password" placeholder='••••••••'/>
                    </div>
                </div>

                <div className={styles.terms_group}>
                    <label className={styles.checkbox_container}>
                        <input type="checkbox" name="terms" id="terms" checked={condiciones} onChange={toggleCondiciones}/>
                        <span className={styles.checkmark}>
                            <Check size={12} strokeWidth={4} />
                        </span>
                        <span className={styles.terms_text}>
                            Acepto los <a href="#">términos y condiciones</a>
                        </span>
                    </label>
                </div>

                <button className={styles.primary_button}>Registrarse</button>
            </form>

            <section className={styles.footer_section}>
                <div className={styles.separator}>
                    <span>O regístrate con</span>
                </div>
                
                <div className={styles.social_buttons_group}>
                    <button className={styles.social_btn} title="Google"><Chrome size={20}/></button>
                    <button className={styles.social_btn} title="Apple"><Apple size={20}/></button>
                    <button className={styles.social_btn} title="GitHub"><Github size={20}/></button>
                </div>
                
                <div className={styles.links_footer}>
                    <span>¿Ya tienes cuenta?</span>
                    <Link to="/login" className={styles.login_link}>Iniciar Sesión</Link>
                </div>
            </section>
        </main>
    </div>
    )
}