import { useState } from "react";
import type { Jurnal, StatusReview } from "../types/jurnal";
import { jurnalTiruan } from "../data/jurnalTiruan";
import { Button } from "../components/ui/Button";

export function ContohTipeState() {
    const [nama, setNama] = useState("");
    const [aktif, setAktif] = useState(false);
    const [daftarJurnal, setDaftarJurnal] = useState<Jurnal[]>([]);
    const [terpilih, setTerpilih] = useState<Jurnal | null>(null);
    const [filter, setFilter] = useState<"semua" | StatusReview>("semua");

    function isiContoh() {
        setNama("Budi");
        setAktif(true);
        setDaftarJurnal(jurnalTiruan);
        setTerpilih(jurnalTiruan.find((j) => j.id === 1) ?? null);
        setFilter("belum");
    }

    return (
        <div>
            <Button onClick={isiContoh}>Isi contoh</Button>
            <p>nama: {nama || "(kosong)"}</p>
            <p>aktif: {String(aktif)}</p>
            <p>jumlah jurnal: {daftarJurnal.length}</p>
            <p>terpilih: {terpilih ? terpilih.kegiatan : "(belum ada)"}</p>
            <p>filter: {filter}</p>
        </div>
    );
}