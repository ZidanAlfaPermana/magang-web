import { useState } from "react";
import type { Jurnal, StatusReview } from "../../types/jurnal";
import type { Peran } from "../../types/peserta";
import { formatTanggal } from "../../utils/format";
import { Button } from "../ui/Button";
import { PanelReview } from "./PanelReview";
import { StatusBadge } from "./StatusBadge";
import styles from "./JurnalCard.module.css";

interface JurnalCardProps {
    jurnal: Jurnal;
    peran?: Peran;
    onHapus?: (id: number) => void;
    onReview?: (id: number, status: StatusReview, catatan: string) => void;
}

export function JurnalCard({ jurnal, peran = "peserta", onHapus, onReview }: JurnalCardProps) {
    const [terbuka, setTerbuka] = useState(false);
    const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);
    const [sedangReview, setSedangReview] = useState(false);
    const jumlahLampiran = jurnal.lampiran?.length ?? 0;
    const adaDetail = Boolean(jurnal.hambatan) || jumlahLampiran > 0;

    return (
        <article className={styles.kartu}>
            <header className={styles.atas}>
                <time dateTime={jurnal.createdAt}>{formatTanggal(jurnal.createdAt)}</time>
                <StatusBadge status={jurnal.statusReview} />
            </header>
            <p className={styles.kegiatan}>{jurnal.kegiatan}</p>
            {jurnal.catatanMentor && (
                <p className={styles.baris}>Catatan mentor: {jurnal.catatanMentor}</p>
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
            {sedangReview && peran === "mentor" && onReview && (
                <PanelReview
                    jurnal={jurnal}
                    onSimpan={(status, catatan) => {
                        onReview(jurnal.id, status, catatan);
                        setSedangReview(false);
                    }}
                    onBatal={() => setSedangReview(false)}
                />
            )}
            <div className={styles.aksi}>
                {peran === "mentor" && onReview && !sedangReview && (
                    <Button
                        variant="secondary"
                        ukuran="sm"
                        aria-label={`Review jurnal: ${jurnal.kegiatan}`}
                        onClick={() => setSedangReview(true)}
                    >
                        Review
                    </Button>
                )}
                {onHapus &&
                    (konfirmasiHapus ? (
                        <div role="group" aria-label="Konfirmasi hapus" className={styles.aksi}>
                            <span>Yakin?</span>
                            <Button variant="danger" ukuran="sm" onClick={() => onHapus(jurnal.id)}>
                                Ya
                            </Button>
                            <Button
                                variant="secondary"
                                ukuran="sm"
                                autoFocus
                                onClick={() => setKonfirmasiHapus(false)}
                            >
                                Batal
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="danger"
                            ukuran="sm"
                            aria-label={`Hapus jurnal: ${jurnal.kegiatan}`}
                            onClick={() => setKonfirmasiHapus(true)}
                        >
                            Hapus
                        </Button>
                    ))}
            </div>
        </article>
    );
}