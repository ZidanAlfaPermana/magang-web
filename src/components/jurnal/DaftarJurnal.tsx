import type { Jurnal } from "../../api/types";
import { JurnalCard } from "./JurnalCard";
import styles from "./DaftarJurnal.module.css";

interface DaftarJurnalProps {
    jurnal: readonly Jurnal[];
}

export function DaftarJurnal({ jurnal }: DaftarJurnalProps) {
    return (
        <ul className={styles.daftar}>
            {jurnal.map((j) => (
                <li key={j.id}>
                    <JurnalCard jurnal={j} />
                </li>
            ))}
        </ul>
    );
}