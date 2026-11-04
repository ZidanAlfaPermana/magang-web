import type { Jurnal } from "../types/jurnal";

interface RingkasanJurnalProps {
    jurnal: Jurnal[];
}

export function RingkasanJurnal({ jurnal }: RingkasanJurnalProps) {
    const total = jurnal.length;
    const sudahDireview = jurnal.filter((j) => j.statusReview === "sudah").length;
    const belumDireview = jurnal.filter((j) => j.statusReview === "belum").length;

    return (
        <div>
            <p>Total: {total}</p>
        <p>Sudah direview: {sudahDireview}</p>
        <p>Belum direview: {belumDireview}</p>
        </div>
    );
}