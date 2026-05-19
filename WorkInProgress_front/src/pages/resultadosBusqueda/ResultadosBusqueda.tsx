import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Search, Briefcase, LayoutDashboard, List, CheckSquare, Loader2 } from 'lucide-react';
import { UserService, type ElementTO } from '../../services/UserService';
import { useAuthStore } from '../../store/Auth';
import styles from './ResultadosBusqueda.module.css';
import { usePageTitle } from '../../hooks/usePageTittle';

export function ResultadosBusqueda() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();
    const idUsuario = useAuthStore((state) => state.idUsuario);

    const [resultados, setResultados] = useState<ElementTO[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    usePageTitle(`Resultados: ${query}`);
    
    useEffect(() => {
        if (query && idUsuario) {
            realizarBusqueda(query);
        }
    }, [query, idUsuario]);

    const realizarBusqueda = async (texto: string) => {
        setIsSearching(true);
        try {
            const data = await UserService.getBusqueda(idUsuario, { tittle: texto });
            setResultados(data);
        } catch (error) {
            console.error("Error en la búsqueda", error);
        } finally {
            setIsSearching(false);
        }
    };


    const getEstiloTipo = (tipo: string) => {
        const t = tipo.toLowerCase();
        if (t.includes('workspace') || t.includes('espacio')) return { icon: <Briefcase size={20} />, color: '#F27A24', label: 'Espacio' };
        if (t.includes('tablero') || t.includes('board')) return { icon: <LayoutDashboard size={20} />, color: '#396E81', label: 'Tablero' };
        if (t.includes('lista') || t.includes('queue')) return { icon: <List size={20} />, color: '#4E94AD', label: 'Lista' };
        return { icon: <CheckSquare size={20} />, color: '#3AAFA9', label: 'Tarea' };
    };

    const handleNavegarResultado = (elemento: ElementTO) => {
        const tipo = elemento.tipo.toLowerCase();
        if (tipo.includes('workspace') || tipo.includes('espacio')) {
            navigate(`/user/workspace/${elemento.id}`);
        } else {
            navigate(`/taskboard/${elemento.id}`);
        }
    };

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <Search className={styles.headerIcon} size={62} />
                <div>
                    <h1 className={styles.title}>Resultados de búsqueda</h1>
                    <p className={styles.subtitle}>
                        Buscando: <strong>"{query}"</strong>
                    </p>
                </div>
            </header>

            {isSearching ? (
                <div className={styles.loadingState}>
                    <Loader2 className={styles.spinner} size={40} />
                    <p>Rastreando tus proyectos...</p>
                </div>
            ) : resultados.length === 0 ? (
                <div className={styles.emptyState}>
                    <Search size={60} className={styles.emptyIcon} />
                    <h3>No hemos encontrado nada</h3>
                    <p>Prueba con otras palabras clave o revisa la ortografía.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {resultados.map((item) => {
                        const estilo = getEstiloTipo(item.tipo);
                        return (
                            <div 
                                key={`${item.tipo}-${item.id}`} 
                                className={styles.card}
                                onClick={() => handleNavegarResultado(item)}
                            >
                                <div className={styles.iconWrapper} style={{ backgroundColor: `${estilo.color}20`, color: estilo.color }}>
                                    {estilo.icon}
                                </div>
                                <div className={styles.cardInfo}>
                                    <h4>{item.titulo}</h4>
                                    <span style={{ color: estilo.color }}>{estilo.label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}