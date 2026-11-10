import { useState } from "react";
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
    const [terbuka, setTerbuka] = useState(false);
    const jumlahLampiran = jurnal.lampiran?.length ?? 0;
    const adaDetail =
        Boolean(jurnal.hambatan) || Boolean(jurnal.catatanMentor) || jumlahLampiran > 0;

    return (
        <article className={styles.kartu}>
            <header className={styles.atas}>
                <time dateTime={jurnal.createdAt}>{formatTanggal(jurnal.createdAt)}</time>
                <StatusBadge status={jurnal.statusReview} />
            </header>
            <p className={styles.kegiatan}>{jurnal.kegiatan}</p>
            {adaDetail && (
                <Button
                    variant="secondary"
                    ukuran="sm"
                    aria-expanded={terbuka}
                    onClick={() => setTerbuka((t) => !t)}
                >
                    {terbuka ? "Sembunyikan detail" : "Tampilkan detail"}
                </Button>
            )}
            {terbuka && (
                <div>
                    {jurnal.hambatan && <p className={styles.baris}>Hambatan: {jurnal.hambatan}</p>}
                    {jurnal.catatanMentor && (
                        <p className={styles.baris}>Catatan mentor: {jurnal.catatanMentor}</p>
                    )}
                    {jumlahLampiran > 0 && <p className={styles.baris}>Lampiran ({jumlahLampiran})</p>}
                </div>
            )}
            {jurnal.linkCommit && (
                <p className={styles.footer}>
                    <a href={jurnal.linkCommit} target="_blank" rel="noopener noreferrer">
                        Lihat commit
                    </a>
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