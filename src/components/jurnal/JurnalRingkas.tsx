import type { Jurnal } from "../../types/jurnal";
import styles from "./JurnalRingkas.module.css";

interface RingkasanJurnalProps {
    jurnal: Jurnal[];
}

export function RingkasanJurnal({ jurnal }: RingkasanJurnalProps) {
    const total = jurnal.length;
    const sudahDireview = jurnal.filter((j) => j.statusReview === "sudah").length;
    const belumDireview = jurnal.filter((j) => j.statusReview === "belum").length;

    return (
        <dl className={styles.ringkasan}>
            <div className={styles.item}>
                <dt>Total</dt>
                <dd>{total}</dd>
            </div>
            <div className={styles.item}>
                <dt>Sudah direview</dt>
                <dd>{sudahDireview}</dd>
            </div>
            <div className={styles.item}>
                <dt>Belum direview</dt>
                <dd>{belumDireview}</dd>
            </div>
        </dl>
    );
}