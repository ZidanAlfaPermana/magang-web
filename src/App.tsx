// src/App.tsx: komponen dipakai seperti tag HTML
import PesertaCard from "./components/PesertaCard";
import Kartu from "./components/Kartu.tsx";
import {daftarPeserta} from "./data/pesertaTiruan.ts";
import NomorUrut from "./components/NomorUrut.tsx";

export default function App() {
    return (
        <main>
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
        </main>
    );
}