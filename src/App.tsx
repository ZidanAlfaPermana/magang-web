import {useEffect, useState} from "react";
import { Header } from "./components/layout/Header";
import { Kartu } from "./components/ui/Kartu";
import { RingkasanJurnal } from "./components/jurnal/JurnalRingkas";
import { DaftarJurnal } from "./components/jurnal/DaftarJurnal";
/*import HalamanLatihan from "./latihan/HalamanLatihan";*/
import { jurnalTiruan } from "./data/jurnalTiruan";
import { daftarPeserta } from "./data/pesertaTiruan";
import type {FilterStatus, Jurnal, JurnalBaru, StatusReview} from "./types/jurnal";
import styles from "./App.module.css";
import {FormJurnal} from "./components/jurnal/FormJurnal.tsx";
import {FilterStatusJurnal} from "./components/jurnal/FilterStatusJurnal.tsx";
import {PencarianJurnal} from "./components/jurnal/PencarianJurnal.tsx";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { adalahDaftarJurnal } from "./utils/guard";
import {usePenundaan} from "./hooks/usePenundaan.ts";

export default function App() {
    const [jurnal, setJurnal] = useLocalStorage<Jurnal[]>(
        "jurnal-magang-v1",
        jurnalTiruan,
        adalahDaftarJurnal
    );
    const [filter, setFilter] = useState<FilterStatus>("semua");
    const [kataKunci, setKataKunci] = useState("");
    const kataKunciTunda = usePenundaan(kataKunci, 300);
    useEffect(() => {
        document.title = `Jurnal Magang (${jurnal.length})`;
    }, [jurnal.length]);

    const peserta = daftarPeserta.find((p) => p.id === 1);

    const tampil = jurnal
        .filter((j) => filter === "semua" || j.statusReview === filter)
        .filter((j) => j.kegiatan.toLowerCase().includes(kataKunciTunda.trim().toLowerCase()));

    const terurut = [...tampil].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    function hapusJurnal(id: number) {
        setJurnal((daftar) => daftar.filter((j) => j.id !== id));
    }

    function ubahStatus(id: number, status: StatusReview) {
        setJurnal((daftar) =>
            daftar.map((j) => (j.id === id ? { ...j, statusReview: status } : j))
        );
    }

    function tambahJurnal(data: JurnalBaru) {
        const baru: Jurnal = {
            id: Math.max(0, ...jurnal.map((j) => j.id)) + 1,
            pesertaId: 1,
            ...data,
            lampiran: null,
            statusReview: "belum",
            catatanMentor: null,
            createdAt: new Date().toISOString(),
        };
        setJurnal((daftar) => [baru, ...daftar]);
    }

    return (
        <div className={styles.halaman}>
            <Header judul="Jurnal Magang" namaPeserta={peserta?.nama ?? "Peserta"} />
            <main>
                <Kartu judul="Ringkasan">
                    <RingkasanJurnal jurnal={jurnal} />
                </Kartu>
                <Kartu judul="Tulis Jurnal">
                    <FormJurnal onTambah={tambahJurnal} />
                </Kartu>
                <Kartu judul="Daftar Jurnal">
                    <div className={styles.kontrol}>
                        <FilterStatusJurnal nilai={filter} onUbah={setFilter} />
                        <PencarianJurnal nilai={kataKunci} onUbah={setKataKunci} />
                    </div>
                    <DaftarJurnal jurnal={terurut} onHapus={hapusJurnal} onUbahStatus={ubahStatus} />
                </Kartu>
            </main>
            {/*<HalamanLatihan />*/}
        </div>
    );
}