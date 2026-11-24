import { Link } from "react-router";
import { Kartu } from "../components/ui/Kartu";

export function Halaman404() {
    return (
        <Kartu judul="Halaman tidak ditemukan">
            <p>Alamat yang kamu buka tidak ada.</p>
            <p>
                <Link to="/jurnal">Kembali ke daftar jurnal</Link>
            </p>
        </Kartu>
    );
}