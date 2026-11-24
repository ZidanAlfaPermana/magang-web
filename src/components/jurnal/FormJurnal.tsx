import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { Kolom } from "../ui/Kolom";
import { buatJurnal } from "../../api/jurnal";
import { keApiError } from "../../api/errors";
import type { ApiError } from "../../api/errors";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import type { StatusKirim } from "../../hooks/status";
import { detailKeErrors } from "../../utils/detailError";
import { validasiFormJurnal } from "../../utils/validasiJurnal";
import type { FormJurnalErrors, FormJurnalState } from "../../utils/validasiJurnal";

interface FormJurnalProps {
    onBerhasil: () => void;
}

const NILAI_AWAL: FormJurnalState = {
    kegiatan: "",
    rencanaBesok: "",
    hambatan: "",
    linkCommit: "",
};

const URUTAN_KOLOM: ReadonlyArray<keyof FormJurnalState> = [
    "kegiatan",
    "hambatan",
    "rencanaBesok",
    "linkCommit",
];

function ringkasGagal(error: ApiError): {
    kolom: FormJurnalErrors;
    umum: string[];
    laporan: string | null;
} {
    if (error.kode !== "VALIDATION_ERROR") {
        return { kolom: {}, umum: [pesanUntukPengguna(error)], laporan: kodeLaporan(error) };
    }

    const { kolom, umum } = detailKeErrors(error.detail);
    if (Object.keys(kolom).length === 0 && umum.length === 0) {
        return { kolom, umum: [pesanUntukPengguna(error)], laporan: kodeLaporan(error) };
    }

    return { kolom, umum: umum.length > 0 ? [pesanUntukPengguna(error), ...umum] : [], laporan: null };
}

export function FormJurnal({ onBerhasil }: FormJurnalProps) {
    const [nilai, setNilai] = useState<FormJurnalState>(NILAI_AWAL);
    const [errorsKlien, setErrorsKlien] = useState<FormJurnalErrors>({});
    const [status, setStatus] = useState<StatusKirim>({ status: "diam" });

    const gagal = status.status === "gagal" ? ringkasGagal(status.error) : null;
    const errors: FormJurnalErrors = { ...gagal?.kolom, ...errorsKlien };

    const ubah: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target;
        setNilai((sebelumnya) => ({ ...sebelumnya, [name]: value }));
        setErrorsKlien((sebelumnya) => ({ ...sebelumnya, [name]: undefined }));
        setStatus((s) => (s.status === "gagal" ? { status: "diam" } : s));
    };

    const kirim: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (status.status === "mengirim") return;

        const hasil = validasiFormJurnal(nilai);
        setErrorsKlien(hasil);

        const kolomSalah = URUTAN_KOLOM.find((kolom) => hasil[kolom]);
        if (kolomSalah) {
            const elemen = e.currentTarget.elements.namedItem(kolomSalah);
            if (elemen instanceof HTMLElement) {
                elemen.focus();
            }
            return;
        }

        setStatus({ status: "mengirim" });
        try {
            await buatJurnal({
                kegiatan: nilai.kegiatan.trim(),
                hambatan: nilai.hambatan.trim() || undefined,
                linkCommit: nilai.linkCommit.trim() || undefined,
            });
            setNilai(NILAI_AWAL);
            setStatus({ status: "diam" });
            onBerhasil();
        } catch (err) {
            setStatus({ status: "gagal", error: keApiError(err) });
        }
    };

    return (
        <form onSubmit={kirim} noValidate>
            {gagal !== null && gagal.umum.length > 0 && (
                <Alert tipe="bahaya">
                    {gagal.umum.map((pesan) => (
                        <p key={pesan}>{pesan}</p>
                    ))}
                    {gagal.laporan && <p>{gagal.laporan}</p>}
                </Alert>
            )}
            <Kolom nama="kegiatan" label="Kegiatan hari ini" jenis="textarea" nilai={nilai.kegiatan} onUbah={ubah} error={errors.kegiatan} />
            <Kolom nama="hambatan" label="Hambatan (opsional)" jenis="textarea" nilai={nilai.hambatan} onUbah={ubah} error={errors.hambatan} />
            <Kolom nama="rencanaBesok" label="Rencana besok" jenis="textarea" nilai={nilai.rencanaBesok} onUbah={ubah} error={errors.rencanaBesok} />
            <Kolom nama="linkCommit" label="Link commit (opsional)" nilai={nilai.linkCommit} onUbah={ubah} error={errors.linkCommit} />
            <Button type="submit" disabled={status.status === "mengirim"}>
                {status.status === "mengirim" ? "Menyimpan..." : "Simpan jurnal"}
            </Button>
        </form>
    );
}