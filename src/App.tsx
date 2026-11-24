import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Kartu } from "./components/ui/Kartu";
import { Button } from "./components/ui/Button";
import { FormLogin } from "./components/auth/FormLogin";
import { JurnalSaya } from "./components/jurnal/JurnalSaya";
import { keluar } from "./api/auth";
import type { Peserta } from "./api/types";
import styles from "./App.module.css";

export default function App() {
    const [peserta, setPeserta] = useState<Peserta | null>(null);

    function keluarDariAkun() {
        keluar();
        setPeserta(null);
    }

    if (peserta === null) {
        return (
            <div className={styles.halaman}>
                <Header judul="Jurnal Magang" namaPeserta="Belum login" />
                <main>
                    <Kartu judul="Masuk">
                        <FormLogin onBerhasil={setPeserta} />
                    </Kartu>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.halaman}>
            <Header judul="Jurnal Magang" namaPeserta={peserta.nama} />
            <div className={styles.kontrol}>
                <Button ukuran="sm" variant="secondary" onClick={keluarDariAkun}>
                    Keluar
                </Button>
            </div>
            <main>
                <JurnalSaya />
            </main>
        </div>
    );
}