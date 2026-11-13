import type {Jurnal, StatusReview} from "../types/jurnal.ts";
import type {Peran} from "../types/peserta.ts";
import {DaftarJurnal} from "./jurnal/DaftarJurnal.tsx";

type HasilJurnalProps =
    | { status: "memuat" }
    | {
    status: "berhasil";
    data: readonly Jurnal[];
    peran: Peran;
    pesanKosong: string;
    onHapus: (id: number) => void;
    onReview: (id: number, status: StatusReview, catatan: string) => void;
}
    | { status: "gagal"; pesan: string };

export function HasilJurnal(props: HasilJurnalProps) {
    switch (props.status) {
        case "memuat":
            return <p>Memuat data...</p>;
        case "berhasil":
            return (
                <DaftarJurnal
                    jurnal={props.data}
                    peran={props.peran}
                    pesanKosong={props.pesanKosong}
                    onHapus={props.onHapus}
                    onReview={props.onReview}
                />
            );
        case "gagal":
            return <p role="alert">Gagal: {props.pesan}</p>;
    }
}