import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Palette, Type, Layout, MousePointerClick, Smile, Activity, ShieldCheck, Zap } from 'lucide-react';
import styles from './GuiaEstilos.module.css';
import { CookieBanner } from '../../components/cookieBanner/CookieBanner';
import { usePageTitle } from '../../hooks/usePageTittle';

export function GuiaEstilos() {
    usePageTitle('Guía de Estilos');
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.blobShape1}></div>
            <div className={styles.blobShape2}></div>

            <Header />
            
            <main className={styles.mainContent}>
                <section className={styles.heroSection}>
                    <div className={styles.heroBadge}>Design System</div>
                    <h1>Guía de Estilos WIP</h1>
                    <p className={styles.leadText}>
                        El lenguaje visual de Work In Progress está diseñado para maximizar la 
                        concentración, transmitir confianza y fomentar la acción. Descubre los 
                        elementos que dan vida a nuestra plataforma.
                    </p>
                </section>

                <section className={styles.guideSection}>
                    <div className={styles.sectionHeader}>
                        <Palette className={styles.sectionIcon} size={28} />
                        <h2>Color y Simbología</h2>
                    </div>
                    <p className={styles.sectionDescription}>
                        Nuestra paleta se basa en el contraste entre la calma y la energía. 
                        Los tonos <strong>azules verdosos (Teal)</strong> representan la profesionalidad, mientras que 
                        los acentos en <strong>naranja</strong> inyectan vitalidad. Para sostener todo esto, 
                        empleamos una escala de grises meticulosa que organiza la jerarquía sin fatigar la vista.
                    </p>

                    <div className={styles.colorGrid}>
                        {/* Colores Principales */}
                        <div className={styles.colorCard}>
                            <div className={styles.colorSwatch} style={{ background: 'var(--color-primario)' }}></div>
                            <div className={styles.colorInfo}>
                                <h4>Teal Primario</h4>
                                <span>#396E81</span>
                                <p>Fondos oscuros, cabeceras y énfasis principal.</p>
                            </div>
                        </div>
                        <div className={styles.colorCard}>
                            <div className={styles.colorSwatch} style={{ background: 'var(--naranja-acento)' }}></div>
                            <div className={styles.colorInfo}>
                                <h4>Naranja Acento</h4>
                                <span>#F27A24</span>
                                <p>Llamadas a la acción (CTAs), alertas y estados activos.</p>
                            </div>
                        </div>
                        <div className={styles.colorCard}>
                            <div className={styles.colorSwatch} style={{ background: 'var(--subnavbar-bg)' }}></div>
                            <div className={styles.colorInfo}>
                                <h4>Azul Secundario</h4>
                                <span>#4E94AD</span>
                                <p>Elementos secundarios, bordes y transiciones suaves.</p>
                            </div>
                        </div>
                        <div className={styles.colorCard}>
                            <div className={styles.colorSwatch} style={{ background: 'var(--bg-verde)' }}></div>
                            <div className={styles.colorInfo}>
                                <h4>Verde Agua</h4>
                                <span>#A8D1D5</span>
                                <p>Tonos de apoyo para degradados abstractos y fondos dinámicos.</p>
                            </div>
                        </div>
                        
                        {/* ✨ NUEVOS: Escala de Grises y Neutros */}
                        <div className={styles.colorCard}>
                            <div className={styles.colorSwatch} style={{ background: 'var(--gris-claro)' }}></div>
                            <div className={styles.colorInfo}>
                                <h4>Gris Base (Fondo)</h4>
                                <span>#EAEAEA / #FAFAFA</span>
                                <p>El lienzo de la app. Aporta un contraste suave frente al blanco puro de las tarjetas.</p>
                            </div>
                        </div>
                        <div className={styles.colorCard}>
                            <div className={styles.colorSwatch} style={{ background: 'var(--gris-medio)' }}></div>
                            <div className={styles.colorInfo}>
                                <h4>Gris Intermedio</h4>
                                <span>#D3D3D3</span>
                                <p>Bordes de inputs, separadores horizontales (hr) y elementos inactivos.</p>
                            </div>
                        </div>
                        <div className={styles.colorCard}>
                            <div className={styles.colorSwatch} style={{ background: 'var(--color-texto-secundario)' }}></div>
                            <div className={styles.colorInfo}>
                                <h4>Gris Plomo (Texto)</h4>
                                <span>#4D4D4D</span>
                                <p>Tipografía de descripciones. Más suave que el negro para evitar el contraste extremo.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.guideSection}>
                    <div className={styles.sectionHeader}>
                        <Type className={styles.sectionIcon} size={28} />
                        <h2>Tipografía: Poppins</h2>
                    </div>
                    <p className={styles.sectionDescription}>
                        Hemos elegido <strong>Poppins</strong> como nuestra tipografía principal. Es una fuente 
                        geométrica sin remates (sans-serif) que combina una estética altamente moderna con 
                        una legibilidad impecable en pantallas de cualquier tamaño.
                    </p>

                    <div className={styles.typoShowcase}>
                        <div className={styles.typoItem}>
                            <span className={styles.typoLabel}>Encabezado 1 (H1) - 800 ExtraBold</span>
                            <h1 className={styles.fontSampleH1}>Organiza tu trabajo</h1>
                        </div>
                        <div className={styles.typoItem}>
                            <span className={styles.typoLabel}>Encabezado 2 (H2) - 600 SemiBold</span>
                            <h2 className={styles.fontSampleH2}>Diseñado para avanzar</h2>
                        </div>
                        <div className={styles.typoItem}>
                            <span className={styles.typoLabel}>Cuerpo de texto (p) - 400 Regular</span>
                            <p className={styles.fontSampleP}>
                                Cada tarjeta, cada lista y cada movimiento en tus tableros se representa con 
                                claridad meridiana. La lectura cómoda reduce la fatiga visual.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.guideSection}>
                    <div className={styles.sectionHeader}>
                        <Smile className={styles.sectionIcon} size={28} />
                        <h2>Iconografía (Lucide React)</h2>
                    </div>
                    <p className={styles.sectionDescription}>
                        Nuestra iconografía utiliza trazos consistentes de <strong>2px de grosor</strong> y 
                        bordes redondeados. Los iconos nunca son un mero adorno; sirven como anclaje visual 
                        para acelerar la navegación y la comprensión de las acciones sin necesidad de leer etiquetas.
                    </p>

                    <div className={styles.iconShowcase}>
                        <div className={styles.iconBox}>
                            <Activity size={32} />
                            <span>Progreso</span>
                        </div>
                        <div className={styles.iconBox}>
                            <ShieldCheck size={32} color="var(--color-primario)" />
                            <span>Seguridad</span>
                        </div>
                        <div className={styles.iconBox}>
                            <Zap size={32} color="var(--naranja-acento)" />
                            <span>Acción Rápida</span>
                        </div>
                        <div className={styles.iconBox}>
                            <Layout size={32} color="var(--subnavbar-bg)" />
                            <span>Estructura</span>
                        </div>
                    </div>
                </section>

                <section className={styles.guideSection}>
                    <div className={styles.sectionHeader}>
                        <MousePointerClick className={styles.sectionIcon} size={28} />
                        <h2>Componentes Interactivos</h2>
                    </div>
                    <p className={styles.sectionDescription}>
                        Nuestros componentes buscan la tactilidad digital. Usamos bordes redondeados 
                        (<i>border-radius: 8px</i>) y sombras dinámicas que elevan los elementos 
                        cuando el usuario interactúa con ellos.
                    </p>

                    <div className={styles.componentsShowcase}>
                        <div className={styles.compColumn}>
                            <h3>Botones</h3>
                            <div className={styles.btnGroup}>
                                <button className={styles.btnPrimary}>Acción Principal</button>
                                <button className={styles.btnSecondary}>Acción Secundaria</button>
                                <button className={styles.btnDanger}>Acción Destructiva</button>
                            </div>
                        </div>
                        <div className={styles.compColumn}>
                            <h3>Inputs de Formulario</h3>
                            <div className={styles.inputShowcase}>
                                <label>Etiqueta del campo</label>
                                <input type="text" placeholder="Haz clic para ver el estado :focus" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.guideSection}>
                    <div className={styles.sectionHeader}>
                        <Activity className={styles.sectionIcon} size={28} />
                        <h2>Motion & Transiciones</h2>
                    </div>
                    <div className={styles.layoutShowcase}>
                        <div className={styles.layoutText}>
                            <p>
                                La animación en WIP cumple una función de feedback. Ninguna animación existe 
                                solo para "hacerlo bonito", sino para indicar al usuario que el sistema 
                                ha respondido a su interacción.
                            </p>
                            <ul>
                                <li><strong>Velocidad:</strong> Transiciones cortas de <code>0.2s</code> a <code>0.3s</code>. No hacemos esperar al usuario.</li>
                                <li><strong>Suavidad:</strong> Funciones <code>ease-in-out</code> o <code>cubic-bezier</code> para dar una sensación física de peso y aceleración.</li>
                                <li><strong>Feedback táctil:</strong> Los elementos clicables se elevan (<code>translateY(-2px)</code>) y proyectan una sombra más profunda al pasar el ratón.</li>
                            </ul>
                        </div>
                        <div className={styles.layoutVisual}>
                            {/* Tarjeta demostrativa de animaciones */}
                            <div className={styles.motionCard}>
                                <span>Pasa el ratón por encima</span>
                                <div className={styles.motionPulse}></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
}