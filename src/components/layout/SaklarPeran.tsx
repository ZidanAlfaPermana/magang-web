import type { Peran } from "../../types/peserta";
import styles from "./SaklarPeran.module.css";

interface SaklarPeranProps {
    peran: Peran;
    onUbah: (peran: Peran) => void;
}

export function SaklarPeran({ peran, onUbah }: SaklarPeranProps) {
    return (
        <div role="radiogroup" aria-label="Masuk sebagai" className={styles.saklar}>
            <span>Masuk sebagai:</span>
            <label>
                <input
                    type="radio"
                    name="peran"
                    checked={peran === "peserta"}
                    onChange={() => onUbah("peserta")}
                />
                Peserta
            </label>
            <label>
                <input
                    type="radio"
                    name="peran"
                    checked={peran === "mentor"}
                    onChange={() => onUbah("mentor")}
                />
                Mentor
            </label>
        </div>
    );
}