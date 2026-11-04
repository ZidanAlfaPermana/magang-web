import type { Jurnal } from "../types/jurnal";
import {formatTanggal} from "../utils/format.ts";

interface DaftarJurnalProps {
    jurnal: Jurnal[];
}

export function DaftarJurnal({ jurnal }: DaftarJurnalProps) {
    if (jurnal.length === 0) {
        return <p>Belum ada jurnal.</p>;
    }

    return (
        <ul>
            {jurnal.map((j) => (
                <li key={j.id}>
                    <p>{formatTanggal(j.tanggal)}: {j.kegiatan}</p>
                    {j.hambatan && <p>Hambatan: {j.hambatan}</p>}
                    {j.lampiran.length > 0 && <p>Lampiran: {j.lampiran.length}</p>}
                </li>
            ))}
        </ul>
    );
}