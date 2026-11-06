import type {Peserta} from "../../types/peserta.ts";

interface DaftarPesertaProps {
    peserta: Peserta[];
}

export function DaftarPeserta({ peserta }: DaftarPesertaProps) {
    if (peserta.length === 0) {
        return <p>Belum ada peserta</p>;
    }

    return (
        <ul>
            {peserta.map((p) => (
                <li key={p.id}>
                    {p.nama} — {p.sekolah}
                </li>
            ))}
        </ul>
    );
}