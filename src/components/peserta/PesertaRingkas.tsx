import type { Peserta } from "../../types/peserta.ts";

type PesertaRingkasProps = Pick<Peserta, "nama" | "sekolah" | "fase">;

export default function PesertaRingkas({ nama, sekolah, fase }: PesertaRingkasProps) {
    return <p>{nama} ({sekolah}), fase {fase}</p>;
}