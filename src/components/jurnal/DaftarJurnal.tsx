import type { Jurnal } from "../../types/jurnal";
import { Alert } from "../ui/Alert";
import { JurnalCard } from "./JurnalCard";
import styles from "./DaftarJurnal.module.css";

interface DaftarJurnalProps {
    jurnal: Jurnal[];
}

export function DaftarJurnal({ jurnal }: DaftarJurnalProps) {
    if (jurnal.length === 0) {
        return <Alert tipe="info">Belum ada jurnal.</Alert>;
    }

    const terbaruDulu = [...jurnal].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <ul className={styles.daftar}>
            {terbaruDulu.map((j) => (
                <li key={j.id}>
                    <JurnalCard jurnal={j} />
                </li>
            ))}
        </ul>
    );
}