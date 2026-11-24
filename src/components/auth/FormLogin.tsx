import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { Kolom } from "../ui/Kolom";
import { login } from "../../api/auth";
import { keApiError } from "../../api/errors";
import { kodeLaporan, pesanLogin } from "../../api/pesan";
import type { Peserta } from "../../api/types";
import type { StatusKirim } from "../../hooks/status";
import { petakanDetail } from "../../utils/detailError";

interface FormLoginProps {
    onBerhasil: (peserta: Peserta) => void;
}

interface NilaiLogin {
    email: string;
    password: string;
}

const NILAI_AWAL: NilaiLogin = { email: "", password: "" };
const KOLOM_LOGIN: ReadonlyArray<"email" | "password"> = ["email", "password"];

export function FormLogin({ onBerhasil }: FormLoginProps) {
    const [nilai, setNilai] = useState<NilaiLogin>(NILAI_AWAL);
    const [status, setStatus] = useState<StatusKirim>({ status: "diam" });

    const ubah: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target;
        setNilai((sebelumnya) => ({ ...sebelumnya, [name]: value }));
        setStatus((s) => (s.status === "gagal" ? { status: "diam" } : s));
    };

    const kirim: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (status.status === "mengirim") return;

        setStatus({ status: "mengirim" });
        try {
            const peserta = await login(nilai.email.trim(), nilai.password);
            onBerhasil(peserta);
        } catch (err) {
            setStatus({ status: "gagal", error: keApiError(err) });
        }
    };

    const gagal = status.status === "gagal" ? status.error : null;
    const detail =
        gagal !== null && gagal.kode === "VALIDATION_ERROR"
            ? petakanDetail(gagal.detail, KOLOM_LOGIN)
            : null;
    const adaErrorKolom = detail !== null && Object.keys(detail.kolom).length > 0;
    const laporan = gagal !== null ? kodeLaporan(gagal) : null;

    return (
        <form onSubmit={kirim} noValidate>
            {gagal !== null && !adaErrorKolom && (
                <Alert tipe="bahaya">
                    <p>{pesanLogin(gagal)}</p>
                    {laporan && <p>{laporan}</p>}
                </Alert>
            )}
            <Kolom
                nama="email"
                label="Email"
                jenis="email"
                nilai={nilai.email}
                onUbah={ubah}
                error={detail?.kolom.email}
                autoComplete="username"
            />
            <Kolom
                nama="password"
                label="Password"
                jenis="password"
                nilai={nilai.password}
                onUbah={ubah}
                error={detail?.kolom.password}
                autoComplete="current-password"
            />
            <Button type="submit" disabled={status.status === "mengirim"}>
                {status.status === "mengirim" ? "Masuk..." : "Masuk"}
            </Button>
        </form>
    );
}