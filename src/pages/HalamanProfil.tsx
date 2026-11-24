import type { Peserta } from "../api/types";
import { Kartu } from "../components/ui/Kartu";
import {Link} from "react-router";

interface HalamanProfilProps {
    peserta: Peserta | null;
}

export function HalamanProfil({ peserta }: HalamanProfilProps) {
    return (
        <Kartu judul="Profil">
            {peserta ? (
                <p>
                    {peserta.nama} ({peserta.email})
                </p>
            ) : (
                <p>Belum login.</p>
            )}
            <ul>
                <li><Link to="/jurnal/abc">Id tidak valid</Link></li>
                <li><Link to="/jurnal/999999">Jurnal tidak ada</Link></li>
                <li><Link to="/jurnal/1">Jurnal nomor 1</Link></li>
            </ul>
        </Kartu>
    );
}