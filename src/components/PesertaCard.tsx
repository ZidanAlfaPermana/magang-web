// src/components/PesertaCard.tsx
// Kirim satu objek utuh
import type {Peserta} from "../types/peserta.ts";
import InfoBaris from "./InfoBaris.tsx";

interface PesertaCardProps {
    peserta: Peserta;
    tampilkanEmail?: boolean;
}

export default function PesertaCard({ peserta, tampilkanEmail = false }: PesertaCardProps) {
    return (
        <article>
            <h3>{peserta.nama}</h3>
            <InfoBaris label="Sekolah" nilai={peserta.sekolah} />
            <InfoBaris label="Fase" nilai={peserta.fase} />
            <InfoBaris label="Status" nilai={peserta.status} />
            {tampilkanEmail && <InfoBaris label="Email" nilai={peserta.email} />}
        </article>
    );
}