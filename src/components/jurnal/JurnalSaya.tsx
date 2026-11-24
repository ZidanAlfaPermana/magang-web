import { useJurnalSaya } from "../../hooks/useJurnalSaya";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { Kartu } from "../ui/Kartu";
import { DaftarJurnal } from "./DaftarJurnal";
import { FormJurnal } from "./FormJurnal";

interface JurnalSayaProps {
    halaman: number;
    onUbahHalaman: (halaman: number) => void;
}

export function JurnalSaya({ halaman, onUbahHalaman }: JurnalSayaProps) {
    const { hasil, muatUlang } = useJurnalSaya(halaman);

    function setelahTambah() {
        onUbahHalaman(1);
        muatUlang();
    }

    function isiDaftar() {
        switch (hasil.status) {
            case "memuat":
                return <p role="status">Memuat jurnal...</p>;

            case "gagal": {
                const laporan = kodeLaporan(hasil.error);
                return (
                    <Alert tipe="bahaya">
                        <p>{pesanUntukPengguna(hasil.error)}</p>
                        {laporan && <p>{laporan}</p>}
                        <Button ukuran="sm" onClick={muatUlang}>
                            Coba lagi
                        </Button>
                    </Alert>
                );
            }

            case "berhasil": {
                const { daftar, meta } = hasil.data;

                if (daftar.length === 0) {
                    if (meta.page > 1) {
                        return (
                            <>
                                <p>Halaman {meta.page} tidak memiliki jurnal.</p>
                                <Button ukuran="sm" onClick={() => onUbahHalaman(1)}>
                                    Ke halaman pertama
                                </Button>
                            </>
                        );
                    }
                    return <p>Belum ada jurnal. Tulis jurnal pertamamu!</p>;
                }

                return (
                    <>
                        <DaftarJurnal jurnal={daftar} />
                        <nav aria-label="Halaman">
                            <Button
                                ukuran="sm"
                                variant="secondary"
                                disabled={!meta.hasPrev}
                                onClick={() => onUbahHalaman(halaman - 1)}
                            >
                                Sebelumnya
                            </Button>
                            <span>
                                {" "}
                                Halaman {meta.page} dari {meta.totalPages}{" "}
                            </span>
                            <Button
                                ukuran="sm"
                                variant="secondary"
                                disabled={!meta.hasNext}
                                onClick={() => onUbahHalaman(halaman + 1)}
                            >
                                Berikutnya
                            </Button>
                        </nav>
                    </>
                );
            }
        }
    }

    return (
        <>
            <Kartu judul="Tulis Jurnal">
                <FormJurnal onBerhasil={setelahTambah} />
            </Kartu>
            <Kartu judul="Jurnal Saya">{isiDaftar()}</Kartu>
        </>
    );
}