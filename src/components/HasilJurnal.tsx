import type {Jurnal, StatusReview} from "../types/jurnal";
import { DaftarJurnal } from "./jurnal/DaftarJurnal.tsx";

type HasilJurnalProps =
    | { status: "memuat" }
    | {
    status: "berhasil";
    data: Jurnal[];
    onHapus: (id: number) => void;
    onUbahStatus: (id: number, status: StatusReview) => void;
}
    | { status: "gagal"; pesan: string };

export function HasilJurnal(props: HasilJurnalProps) {
    switch (props.status) {
        case "memuat":
            return <p>Memuat data...</p>;
        case "berhasil":
            return <DaftarJurnal
                jurnal={props.data}
                onHapus={props.onHapus}
                onUbahStatus={props.onUbahStatus}
            />;
        case "gagal":
            return <p role="alert">Gagal: {props.pesan}</p>;
    }
}