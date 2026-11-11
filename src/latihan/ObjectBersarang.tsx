import { useState } from "react";
import { Button } from "../components/ui/Button";

interface Alamat {
    kota: string;
    kodePos: string;
}

interface Profil {
    nama: string;
    alamat: Alamat;
}

export function ObjekBersarang() {
    const [profil, setProfil] = useState<Profil>({
        nama: "Budi",
        alamat: { kota: "Malang", kodePos: "65145" },
    });

    function pindahKeSurabaya() {
        setProfil((p) => ({ ...p, alamat: { ...p.alamat, kota: "Surabaya" } }));
    }

    return (
        <div>
            <p>{profil.nama}</p>
            <p>
                {profil.alamat.kota}, {profil.alamat.kodePos}
            </p>
            <Button onClick={pindahKeSurabaya}>Ubah kota</Button>
        </div>
    );
}