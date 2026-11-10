import { Header } from "./components/layout/Header";
import { Kartu } from "./components/ui/Kartu";
import { RingkasanJurnal } from "./components/jurnal/JurnalRingkas";
import { DaftarJurnal } from "./components/jurnal/DaftarJurnal";
import { jurnalTiruan } from "./data/jurnalTiruan";
import { daftarPeserta } from "./data/pesertaTiruan";
import styles from "./App.module.css";
/*import HalamanLatihan from "./latihan/HalamanLatihan";*/

export default function App() {
    const peserta = daftarPeserta.find((p) => p.id === 1);

    return (
        <div className={styles.halaman}>
            <Header judul="Jurnal Magang" namaPeserta={peserta?.nama ?? "Peserta"} />
            <main>
                {/*minggu 18 hari senin*/}
                {/*<HalamanLatihan />*/}
                <Kartu judul="Ringkasan">
                    <RingkasanJurnal jurnal={jurnalTiruan} />
                </Kartu>
                <Kartu judul="Daftar Jurnal">
                    <DaftarJurnal jurnal={jurnalTiruan} />
                </Kartu>
            </main>
        </div>
    );
}