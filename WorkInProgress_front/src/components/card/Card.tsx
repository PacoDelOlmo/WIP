import styles from './Card.module.css'


interface CardProps {
    titulo: string;
    descripcion: string;
    cierre: string; // Puede ser una fecha, un autor, etc.
}

export function Card({titulo, descripcion, cierre} : CardProps) {
  return (
    <section className={styles.card}>
        <header>
            <h5 className={styles.card_tittle}>{titulo}</h5>
        </header>
        <p className={styles.card_desc}>{descripcion}</p>
        <footer>
            <p className={styles.card_close}>{cierre}</p>
        </footer>
    </section>
  )
}
