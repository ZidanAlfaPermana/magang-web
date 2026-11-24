import { useState } from "react";
import type { Jurnal } from "../../api/types";
import { formatTanggal } from "../../utils/format";
import { Button } from "../ui/Button";
import { StatusBadge } from "./StatusBadge";
import styles from "./JurnalCard.module.css";
import { Link } from "react-router";

interface JurnalCardProps {
    jurnal: Jurnal;
    denganTautan?: boolean;
}

export function JurnalCard({ jurnal, denganTautan = false }: JurnalCardProps) {
    const [terbuka, setTerbuka] = useState(false);
    const lampiran = jurnal.lampiran ?? [];
    const adaDetail = Boolean(jurnal.hambatan) || lampiran.length > 0;

    return (
        <article className={styles.kartu}>
            <header className={styles.atas}>
                <time dateTime={jurnal.createdAt}>{formatTanggal(jurnal.createdAt)}</time>
                <StatusBadge status={jurnal.statusReview} />
            </header>
            <p className={styles.kegiatan}>{jurnal.kegiatan}</p>
            {denganTautan && (
                <p className={styles.footer}>
                    <Link to={`/jurnal/${jurnal.id}`} aria-label={`Lihat detail jurnal: ${jurnal.kegiatan}`}>
                        Lihat detail
                    </Link>
                </p>
            )}
            {jurnal.catatan && (
                <p className={styles.baris}>Catatan mentor: {jurnal.catatan}</p>
            )}
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
                    {lampiran.length > 0 && (
                        <ul>
                            {lampiran.map((l) => (
                                <li key={l.url}>
                                    <a href={l.url} target="_blank" rel="noopener noreferrer">
                                        {l.keterangan ?? l.url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            {jurnal.linkCommit && (
                <p className={styles.footer}>
                    <a href={jurnal.linkCommit} target="_blank" rel="noopener noreferrer">
                        Lihat commit
                    </a>
                </p>
            )}
        </article>
    );
}