import type { Peserta } from "../../types/peserta.ts";

type PesertaTanpaEmailProps = Omit<Peserta, "email">;

export default function PesertaTanpaEmail({ nama, sekolah, fase, status, role }: PesertaTanpaEmailProps) {
    return (
        <article>
            <h3>{nama}</h3>
            <p>{sekolah} · Fase {fase}</p>
            <p>{role} · {status}</p>
        </article>
    );
}