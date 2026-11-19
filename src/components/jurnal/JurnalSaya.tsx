import { useState } from "react";
import { useJurnalSaya } from "../../hooks/useJurnalSaya";
import { pesanUntukPengguna } from "../../api/pesan";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { JurnalCard } from "./JurnalCard";
import styles from "./DaftarJurnal.module.css";

export function JurnalSaya() {
    const [halaman, setHalaman] = useState(1);
    const { hasil, muatUlang } = useJurnalSaya(halaman);

    switch (hasil.status) {
        case "memuat":
            return <p role="status">Memuat jurnal...</p>;

        case "gagal":
            return (
                <Alert tipe="bahaya">
                    <p>{pesanUntukPengguna(hasil.error)}</p>
                    {hasil.error.requestId && <p>Kode laporan: {hasil.error.requestId}</p>}
                    <Button ukuran="sm" onClick={muatUlang}>
                        Coba lagi
                    </Button>
                </Alert>
            );

        case "berhasil": {
            const { daftar, meta } = hasil.data;

            if (daftar.length === 0) {
                return <p>Belum ada jurnal. Tulis jurnal pertamamu!</p>;
            }

            return (
                <>
                    <ul className={styles.daftar}>
                        {daftar.map((j) => (
                            <li key={j.id}>
                                <JurnalCard jurnal={j} />
                            </li>
                        ))}
                    </ul>
                    <nav aria-label="Halaman">
                        <Button
                            ukuran="sm"
                            variant="secondary"
                            disabled={!meta.hasPrev}
                            onClick={() => setHalaman((h) => h - 1)}
                        >
                            Sebelumnya
                        </Button>
                        <span>
                            {" "}
                            Halaman {meta.page} dari {meta.totalPages}{" "}
                        </span>
                        <Button
                            ukuran="sm"
                            variant="secondary"
                            disabled={!meta.hasNext}
                            onClick={() => setHalaman((h) => h + 1)}
                        >
                            Berikutnya
                        </Button>
                    </nav>
                </>
            );
        }
    }
}