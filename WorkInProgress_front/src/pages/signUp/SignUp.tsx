import styles from './SignUp.module.css'
import { Chrome, Github, Apple, User, Mail, Lock, Check } from 'lucide-react'; 
import LogoWip from './../../assets/img/WIP_SinLetra.png';
import { Link, useNavigate } from 'react-router'
import { useState } from 'react';
import { RegisterService } from '../../services/RegisterService';
import type { RegisterUser } from '../../services/RegisterService';
import { useAuthStore } from '../../store/Auth';

export function SignUp() {

    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [repContrasena, setRepContrasena] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [condiciones, setCondiciones] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loginEnStore = useAuthStore((state) => state.login);

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
    
    const recogerApellido = (e  : React.ChangeEvent<HTMLInputElement>) =>{
        setApellido(e.target.value);
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
            apellido: '',
            nombreUsuario: '',
            correo: '',
            contrasena: ''
        }
        if (contrasena === repContrasena && condiciones){
            registerData = {
                nombre: nombre,
                apellido: apellido,
                nombreUsuario: usuario,
                correo: correo,
                contrasena: contrasena
            }
        }

        console.log(registerData);
        try{

            let registerResponse = await RegisterService.postRegister(registerData);

            if (registerResponse.correct){
                console.log("Login correcto, redirigiendo...")
                loginEnStore(registerResponse.id);
                navigate('/user/home')
            } else {
                setError("Credenciales incorrectas. Intentelo de nuevo");

                setContrasena('');
                setCorreo('');
            }
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

            <form onSubmit={register}>
                <div className={styles.form_row}>
                    <div className={styles.input_group}>
                        <label htmlFor="name">Nombre</label>
                        <div className={styles.input_wrapper}>
                            <User size={18} className={styles.input_icon} />
                            <input
                                type="text" 
                                name='name' 
                                id="name" 
                                placeholder='Tu nombre'
                                value={nombre}
                                onChange={recogerNombre}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="surname">Apellido</label>
                        <div className={styles.input_wrapper}>
                            <User size={18} className={styles.input_icon} />
                            <input
                                type="text" 
                                name='surname' 
                                id="surname" 
                                placeholder='Tu apellido'
                                value={apellido}
                                onChange={recogerApellido}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className={styles.input_group}>
                        <label htmlFor="username">Usuario</label>
                        <div className={styles.input_wrapper}>
                            <span className={styles.input_prefix}>@</span>
                            <input
                                type="text" 
                                name='username' 
                                id="username" 
                                placeholder='usuario'
                                value={usuario}
                                onChange={recogerUsuario}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.input_group}>
                    <label htmlFor="email">Correo electrónico</label>
                    <div className={styles.input_wrapper}>
                        <Mail size={18} className={styles.input_icon} />
                        <input
                            type="email" 
                            name='email' 
                            id="email" 
                            placeholder='ejemplo@correo.com'
                            value={correo}
                            onChange={recogerCorreo}
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
                            onChange={recogerContrasena}
                            required
                        />
                    </div>
                </div>

                <div className={styles.input_group}>
                    <label htmlFor='confirm_password'>Repita contraseña</label>
                    <div className={styles.input_wrapper}>
                        <Lock size={18} className={styles.input_icon} />
                        <input
                            type="password" 
                            name='confirm_password' 
                            id="confirm_password" 
                            placeholder='••••••••'
                            value={repContrasena}
                            onChange={recogerRepContrasena}
                            required
                        />
                    </div>
                </div>

                <div className={styles.terms_group}>
                    <label className={styles.checkbox_container}>
                        <input
                            type="checkbox" 
                            name="terms" 
                            id="terms" 
                            checked={condiciones} 
                            onChange={toggleCondiciones}
                            required
                        />
                        <span className={styles.checkmark}>
                            <Check size={12} strokeWidth={4} />
                        </span>
                        <span className={styles.terms_text}>
                            Acepto los <a href="#">términos y condiciones</a>
                        </span>
                    </label>
                </div>

                <button type='submit' className={styles.primary_button}>Registrarse</button>
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