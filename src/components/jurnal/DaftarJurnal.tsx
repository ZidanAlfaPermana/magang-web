import type { Jurnal, StatusReview } from "../../types/jurnal";
import type { Peran } from "../../types/peserta";
import { Alert } from "../ui/Alert";
import { JurnalCard } from "./JurnalCard";
import styles from "./DaftarJurnal.module.css";

interface DaftarJurnalProps {
    jurnal: readonly Jurnal[];
    peran: Peran;
    pesanKosong: string;
    onHapus: (id: number) => void;
    onReview: (id: number, status: StatusReview, catatan: string) => void;
}

export function DaftarJurnal({ jurnal, peran, pesanKosong, onHapus, onReview }: DaftarJurnalProps) {
    if (jurnal.length === 0) {
        return <Alert tipe="info">{pesanKosong}</Alert>;
    }

    return (
        <ul className={styles.daftar}>
            {jurnal.map((j) => (
                <li key={j.id}>
                    <JurnalCard jurnal={j} peran={peran} onHapus={onHapus} onReview={onReview} />
                </li>
            ))}
        </ul>
    );
}