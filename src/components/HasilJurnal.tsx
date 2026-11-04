import type { Jurnal } from "../types/jurnal";
import { DaftarJurnal } from "./DaftarJurnal";

type HasilJurnalProps =
    | { status: "memuat" }
    | { status: "berhasil"; data: Jurnal[] }
    | { status: "gagal"; pesan: string };

export function HasilJurnal(props: HasilJurnalProps) {
    switch (props.status) {
        case "memuat":
            return <p>Memuat data...</p>;
        case "berhasil":
            return <DaftarJurnal jurnal={props.data} />;
        case "gagal":
            return <p role="alert">Gagal: {props.pesan}</p>;
    }
}