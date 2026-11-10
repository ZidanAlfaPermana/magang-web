import { Penghitung } from "./Penghitung";
import styles from "./DuaPenghitung.module.css";

export function DuaPenghitung() {
    return (
        <div className={styles.baris}>
            <div>
                <h3>Penghitung A</h3>
                <Penghitung />
            </div>
            <div>
                <h3>Penghitung B</h3>
                <Penghitung />
            </div>
        </div>
    );
}