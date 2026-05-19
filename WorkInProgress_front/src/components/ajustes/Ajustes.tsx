import styles from './Ajustes.module.css'
import { Mail, Lock, User, Save, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { UserService } from '../../services/UserService'
import { useAuthStore } from '../../store/Auth'
import { usePageTitle } from '../../hooks/usePageTittle'

export function Ajustes() {
    const userId = useAuthStore((state) => state.idUsuario);

    const [nuevoCorreo, setNuevoCorreo] = useState('');
    const [statusCorreo, setStatusCorreo] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [statusPassword, setStatusPassword] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const [nuevoUsuario, setNuevoUsuario] = useState('');
    const [statusUsuario, setStatusUsuario] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    usePageTitle(`Ajustes del perfil`);

    const handleCambioCorreo = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusCorreo(null);

        if (!emailRegex.test(nuevoCorreo)) {
            setStatusCorreo({ type: 'error', msg: 'Formato de correo inválido.' });
            return;
        }

        try {
            const response = await UserService.editUserCorreo(userId, { id: userId, mail: nuevoCorreo });
            if (response.correct) {
                setStatusCorreo({ type: 'success', msg: 'Correo actualizado correctamente.' });
                setNuevoCorreo('');
            } else {
                setStatusCorreo({ type: 'error', msg: response.description || 'Error al actualizar el correo.' });
            }
        } catch (error) {
            setStatusCorreo({ type: 'error', msg: 'Error de conexión con el servidor.' });
        }
    };

    const handleCambioPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusPassword(null);

        if (!oldPassword) {
            setStatusPassword({ type: 'error', msg: 'Debes introducir tu contraseña actual.' });
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            setStatusPassword({ type: 'error', msg: 'La nueva contraseña debe tener mínimo 8 caracteres, mayúsculas, minúsculas, un número y un símbolo.' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatusPassword({ type: 'error', msg: 'Las contraseñas nuevas no coinciden.' });
            return;
        }

        try {
            const response = await UserService.editUserPassword(userId, { id: userId, oldPassword, newPassword });
            if (response.correct) {
                setStatusPassword({ type: 'success', msg: 'Contraseña actualizada de forma segura.' });
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setStatusPassword({ type: 'error', msg: response.description || 'La contraseña actual no es correcta.' });
            }
        } catch (error) {
            setStatusPassword({ type: 'error', msg: 'Error de conexión con el servidor.' });
        }
    };

    const handleCambioUsuario = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusUsuario(null);

        if (nuevoUsuario.trim().length < 3) {
            setStatusUsuario({ type: 'error', msg: 'El nombre de usuario debe tener al menos 3 caracteres.' });
            return;
        }

        try {
            const response = await UserService.editUserName(userId, { id: userId, mail: nuevoUsuario });
            if (response.correct) {
                setStatusUsuario({ type: 'success', msg: 'Nombre de usuario actualizado.' });
                setNuevoUsuario('');
            } else {
                setStatusUsuario({ type: 'error', msg: response.description || 'El nombre de usuario ya está en uso.' });
            }
        } catch (error) {
            setStatusUsuario({ type: 'error', msg: 'Error de conexión con el servidor.' });
        }
    };

    const renderStatus = (status: { type: 'success' | 'error', msg: string } | null) => {
        if (!status) return null;
        const isError = status.type === 'error';
        return (
            <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem',
                color: isError ? '#d9534f' : '#22c55e',
                backgroundColor: isError ? '#fbeee6' : '#ecfdf5',
                padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem'
            }}>
                {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                <span>{status.msg}</span>
            </div>
        );
    };

    return (
        <section className={styles.settings_container}>
            <header className={styles.settings_header}>
                <h1 className={styles.main_title}>Configuración del perfil</h1>
                <div className={styles.main_separator}></div>
            </header>

            <article className={styles.setting_block}>
                <h2 className={styles.block_title}>Cambio de correo electrónico</h2>
                
                <form className={styles.form_content} onSubmit={handleCambioCorreo}>
                    {renderStatus(statusCorreo)}
                    <div className={styles.input_group}>
                        <label htmlFor="new_email">Nuevo correo electrónico</label>
                        <div className={styles.input_wrapper}>
                            <Mail size={18} className={styles.input_icon} />
                            <input 
                                type="email" 
                                id="new_email" 
                                placeholder="ejemplo@nuevo.com" 
                                value={nuevoCorreo}
                                onChange={(e) => setNuevoCorreo(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className={styles.action_row}>
                        <button type="submit" className={styles.save_button}>
                            <Save size={16} /> <span>Guardar</span>
                        </button>
                    </div>
                </form>
            </article>

            <hr className={styles.divider} />

            <article className={styles.setting_block}>
                <h2 className={styles.block_title}>Cambio de contraseña</h2>
                
                <form className={styles.form_content} onSubmit={handleCambioPassword}>
                    {renderStatus(statusPassword)}
                    
                    <div className={styles.input_group}>
                        <label htmlFor="old_pass">Contraseña actual</label>
                        <div className={styles.input_wrapper}>
                            <Lock size={18} className={styles.input_icon} style={{ opacity: 0.5 }} />
                            <input 
                                type="password" 
                                id="old_pass" 
                                placeholder="••••••••" 
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="new_pass">Nueva contraseña</label>
                        <div className={styles.input_wrapper}>
                            <Lock size={18} className={styles.input_icon} />
                            <input 
                                type="password" 
                                id="new_pass" 
                                placeholder="••••••••" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
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
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.action_row}>
                        <button type="submit" className={styles.save_button}>
                            <Save size={16} /> <span>Guardar</span>
                        </button>
                    </div>
                </form>
            </article>

            <hr className={styles.divider} />

            <article className={`${styles.setting_block} ${styles.last}`}>
                <h2 className={styles.block_title}>Cambio de nombre de usuario</h2>
                
                <form className={styles.form_content} onSubmit={handleCambioUsuario}>
                    {renderStatus(statusUsuario)}
                    <div className={styles.input_group}>
                        <label htmlFor="new_username">Nuevo nombre de usuario</label>
                        <div className={styles.input_wrapper}>
                            <User size={18} className={styles.input_icon} />
                            <input 
                                type="text" 
                                id="new_username" 
                                placeholder="NombreUsuario" 
                                value={nuevoUsuario}
                                onChange={(e) => setNuevoUsuario(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.action_row}>
                        <button type="submit" className={styles.save_button}>
                            <Save size={16} /> <span>Guardar</span>
                        </button>
                    </div>
                </form>
            </article>

        </section>
    )
}