import styles from './Loader.module.css';

export function Loader() {
    return (
        <div className={styles.loader_wrapper}>
            <svg className={styles.wip_spinner} viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className={styles.segment_circle}
                />
            </svg>
        </div>
    );
}