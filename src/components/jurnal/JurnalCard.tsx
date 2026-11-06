import type { Jurnal } from "../../types/jurnal";
import { formatTanggal } from "../../utils/format";
import { Button } from "../ui/Button";
import { StatusBadge } from "./StatusBadge";
import styles from "./JurnalCard.module.css";

interface JurnalCardProps {
    jurnal: Jurnal;
    onHapus?: (id: number) => void;
}

export function JurnalCard({ jurnal, onHapus }: JurnalCardProps) {
    const jumlahLampiran = jurnal.lampiran?.length ?? 0;

    return (
        <article className={styles.kartu}>
            <header className={styles.atas}>
                <time dateTime={jurnal.createdAt}>{formatTanggal(jurnal.createdAt)}</time>
                <StatusBadge status={jurnal.statusReview} />
            </header>
            <p className={styles.kegiatan}>{jurnal.kegiatan}</p>
            {jurnal.hambatan && <p className={styles.baris}>Hambatan: {jurnal.hambatan}</p>}
            {jurnal.catatanMentor && <p className={styles.baris}>Catatan mentor: {jurnal.catatanMentor}</p>}
            {(jumlahLampiran > 0 || jurnal.linkCommit) && (
                <p className={styles.footer}>
                    {jumlahLampiran > 0 && <span>Lampiran ({jumlahLampiran})</span>}
                    {jumlahLampiran > 0 && jurnal.linkCommit && <span aria-hidden="true"> · </span>}
                    {jurnal.linkCommit && (
                        <a href={jurnal.linkCommit} target="_blank" rel="noopener noreferrer">
                            Lihat commit
                        </a>
                    )}
                </p>
            )}
            {onHapus && (
                <Button
                    variant="danger"
                    ukuran="sm"
                    aria-label={`Hapus jurnal: ${jurnal.kegiatan}`}
                    onClick={() => onHapus(jurnal.id)}
                >
                    Hapus
                </Button>
            )}
        </article>
    );
}