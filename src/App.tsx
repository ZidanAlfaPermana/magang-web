import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Kartu } from "./components/ui/Kartu";
import { RingkasanJurnal } from "./components/jurnal/RingkasanJurnal";
import { DaftarJurnal } from "./components/jurnal/DaftarJurnal";
import HalamanLatihan from "./latihan/HalamanLatihan";
import { jurnalTiruan } from "./data/jurnal";
import { daftarPeserta } from "./data/pesertaTiruan";
import type { Jurnal, StatusReview } from "./types/jurnal";
import styles from "./App.module.css";

export default function App() {
    const [jurnal, setJurnal] = useState<Jurnal[]>(jurnalTiruan);
    const peserta = daftarPeserta.find((p) => p.id === 1);

    function hapusJurnal(id: number) {
        setJurnal((daftar) => daftar.filter((j) => j.id !== id));
    }

    function ubahStatus(id: number, status: StatusReview) {
        setJurnal((daftar) =>
            daftar.map((j) => (j.id === id ? { ...j, statusReview: status } : j))
        );
    }

    return (
        <div className={styles.halaman}>
            <Header judul="Jurnal Magang" namaPeserta={peserta?.nama ?? "Peserta"} />
            <main>
                <Kartu judul="Ringkasan">
                    <RingkasanJurnal jurnal={jurnal} />
                </Kartu>
                <Kartu judul="Daftar Jurnal">
                    <DaftarJurnal jurnal={jurnal} onHapus={hapusJurnal} onUbahStatus={ubahStatus} />
                </Kartu>
            </main>
            <HalamanLatihan />
        </div>
    );
}