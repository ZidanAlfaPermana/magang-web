import { useEffect, useState } from "react";
import { Header } from "./components/layout/Header";
import { SaklarPeran } from "./components/layout/SaklarPeran";
import { Kartu } from "./components/ui/Kartu";
import { RingkasanJurnal } from "./components/jurnal/JurnalRingkas";
import { FormJurnal } from "./components/jurnal/FormJurnal";
import { FilterJurnal } from "./components/jurnal/FilterJurnal";
import { PencarianJurnal } from "./components/jurnal/PencarianJurnal";
import { DaftarJurnal } from "./components/jurnal/DaftarJurnal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { usePenundaan } from "./hooks/usePenundaan";
import { adalahDaftarJurnal } from "./utils/guard";
import { jurnalTiruan } from "./data/jurnalTiruan";
import { daftarPeserta } from "./data/pesertaTiruan";
import type { FilterStatus, Jurnal, JurnalBaru, StatusReview } from "./types/jurnal";
import type { Peran } from "./types/peserta";
import styles from "./App.module.css";

export default function App() {
    const [jurnal, setJurnal] = useLocalStorage<Jurnal[]>(
        "jurnal-magang-v1",
        jurnalTiruan,
        adalahDaftarJurnal
    );
    const [peran, setPeran] = useState<Peran>("peserta");
    const [filter, setFilter] = useState<FilterStatus>("semua");
    const [kataKunci, setKataKunci] = useState("");
    const kataKunciTunda = usePenundaan(kataKunci, 300);
    const peserta = daftarPeserta.find((p) => p.id === 1);

    const belumDireview = jurnal.filter((j) => j.statusReview === "belum").length;

    useEffect(() => {
        document.title = `Jurnal Magang (${belumDireview} belum direview)`;
    }, [belumDireview]);

    const tampil = jurnal
        .filter((j) => filter === "semua" || j.statusReview === filter)
        .filter((j) => j.kegiatan.toLowerCase().includes(kataKunciTunda.trim().toLowerCase()));

    const terurut = [...tampil].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const pesanKosong =
        jurnal.length === 0
            ? "Belum ada jurnal. Tulis jurnal pertamamu lewat form di atas."
            : "Tidak ada jurnal yang cocok dengan filter atau pencarian.";

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

    function hapusJurnal(id: number) {
        setJurnal((daftar) => daftar.filter((j) => j.id !== id));
    }

    function simpanReview(id: number, status: StatusReview, catatan: string) {
        setJurnal((daftar) =>
            daftar.map((j) =>
                j.id === id
                    ? { ...j, statusReview: status, catatanMentor: catatan.trim() || null }
                    : j
            )
        );
    }

    return (
        <div className={styles.halaman}>
            <Header judul="Jurnal Magang" namaPeserta={peserta?.nama ?? "Peserta"} />
            <SaklarPeran peran={peran} onUbah={setPeran} />
            <main>
                <Kartu judul="Ringkasan">
                    <RingkasanJurnal jurnal={jurnal} />
                </Kartu>
                <Kartu judul="Tulis Jurnal">
                    <FormJurnal onTambah={tambahJurnal} />
                </Kartu>
                <Kartu judul="Daftar Jurnal">
                    <div className={styles.kontrol}>
                        <FilterJurnal nilai={filter} onUbah={setFilter} />
                        <PencarianJurnal nilai={kataKunci} onUbah={setKataKunci} />
                    </div>
                    <DaftarJurnal
                        jurnal={terurut}
                        peran={peran}
                        pesanKosong={pesanKosong}
                        onHapus={hapusJurnal}
                        onReview={simpanReview}
                    />
                </Kartu>
            </main>
        </div>
    );
}