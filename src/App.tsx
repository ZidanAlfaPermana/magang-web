// src/App.tsx: komponen dipakai seperti tag HTML
import PesertaCard from "./components/PesertaCard";
import Kartu from "./components/Kartu.tsx";
import {daftarPeserta} from "./data/pesertaTiruan.ts";
import NomorUrut from "./components/NomorUrut.tsx";
import { jurnalTiruan } from "./data/jurnalTiruan";
import {HasilJurnal} from "./components/HasilJurnal.tsx";
import {Button} from "./components/ui/Button.tsx";

export default function App() {
    return (
        <main>
            <h1>Magang Web</h1>

            <Kartu judul="Daftar Peserta">
                {daftarPeserta.map((peserta, indeks) => (
                    <div key={peserta.id}>
                        <NomorUrut nomor={indeks + 1} />
                        <PesertaCard peserta={peserta} tampilkanEmail />
                    </div>
                ))}
            </Kartu>

            <Kartu judul="Tautan Berguna">
                <ul>
                    <li><a href="https://react.dev">Dokumentasi React</a></li>
                    <li><a href="https://vite.dev">Dokumentasi Vite</a></li>
                    <li><a href="https://www.typescriptlang.org">Dokumentasi TypeScript</a></li>
                </ul>
            </Kartu>

            <Kartu judul="Catatan">
                <p>Teks biasa tanpa komponen lain.</p>
            </Kartu>

            <Kartu judul="Jurnal">
                <HasilJurnal status="berhasil" data={jurnalTiruan} />
                <HasilJurnal status="berhasil" data={[]} />
                <HasilJurnal status="memuat" />
                <HasilJurnal status="gagal" pesan="Koneksi terputus" />
            </Kartu>

            {/*Varian yang tidak ada*/}
            {/*<Button variant="ngasal">Uji</Button>*/}
            <Button disabled onClick={() => console.log("klik")}>Tombol nonaktif</Button>
            <form onSubmit={(e) => { e.preventDefault(); console.log("form terkirim"); }}>
                <Button>Tanpa type</Button>
                <Button type="submit">Type submit</Button>
            </form>
        </main>
    );
}