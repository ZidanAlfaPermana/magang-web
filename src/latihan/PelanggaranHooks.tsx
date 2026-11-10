import { useState } from "react";

interface PelanggaranHooksProps {
    aktif: boolean;
}

export function PelanggaranHooks({ aktif }: PelanggaranHooksProps) {
    if (aktif) {
        const [jumlah, setJumlah] = useState(0);
        return <button onClick={() => setJumlah(jumlah + 1)}>{jumlah}</button>;
    }

    return <p>Tidak aktif</p>;
}