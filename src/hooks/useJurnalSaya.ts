import { useCallback, useEffect, useState } from "react";
import { ambilJurnalSaya } from "../api/jurnal";
import { keApiError } from "../api/errors";
import type { ApiError } from "../api/errors";
import type { StatusPermintaan } from "./status";

type HasilJurnal = Awaited<ReturnType<typeof ambilJurnalSaya>>;

/*
* kunci
* Masalah yang diselesaikan
*
* Mencocokkan hasil dengan permintaan saat ini,
* sehingga data halaman lama tidak pernah tampil untuk permintaan yang baru.
* */
type Selesai =
    | { kunci: string; status: "berhasil"; data: HasilJurnal }
    | { kunci: string; status: "gagal"; error: ApiError };

export function useJurnalSaya(halaman: number) {
    /*
    * versi
    * Masalah yang diselesaikan
    *
    * Menaikkan versi mengubah kunci sehingga efek berjalan lagi, begitulah “Coba lagi” bekerja.
    * */
    const [versi, setVersi] = useState(0);

    /*
    * status turunan
    * Masalah yang diselesaikan
    *
    * Keadaan memuat dihitung dari kunci dan tidak disimpan,
    * jadi tidak perlu setState sinkron di dalam efek dan tidak bisa tidak konsisten.
    * */
    const [selesai, setSelesai] = useState<Selesai | null>(null);

    const kunci = `${halaman}:${versi}`;

    useEffect(() => {
        /*
        * AbortController
        * Masalah yang diselesaikan
        *
        * Membatalkan permintaan lama saat halaman berganti atau komponen dilepas,
        * sehingga jawaban lama yang tiba terlambat tidak menimpa data baru (race condition).
        * */
        const pengendali = new AbortController();

        ambilJurnalSaya({ halaman, signal: pengendali.signal })
            .then((data) => setSelesai({ kunci, status: "berhasil", data }))
            .catch((err: unknown) => {
                /*
                * signal.aborted
                * Masalah yang diselesaikan
                *
                * Pembatalan membuat fetch menolak dengan AbortError,
                * itu disengaja dan tidak boleh ditampilkan sebagai kegagalan.
                * */
                if (pengendali.signal.aborted) return;
                setSelesai({ kunci, status: "gagal", error: keApiError(err) });
            });

        return () => pengendali.abort();
    }, [halaman, kunci]);

    const hasil: StatusPermintaan<HasilJurnal> =
        selesai !== null && selesai.kunci === kunci ? selesai : { status: "memuat" };

    const muatUlang = useCallback(() => setVersi((v) => v + 1), []);

    return { hasil, muatUlang };
}