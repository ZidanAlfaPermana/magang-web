import { Link } from "react-router";
import { useJurnal } from "../../hooks/useJurnal";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import { JurnalCard } from "./JurnalCard";

interface DetailJurnalProps {
    id: number;
}

export function DetailJurnal({ id }: DetailJurnalProps) {
    const { hasil, muatUlang } = useJurnal(id);

    switch (hasil.status) {
        case "memuat":
            return <p role="status">Memuat jurnal...</p>;

        case "gagal": {
            const { error } = hasil;
            const laporan = kodeLaporan(error);
            const bisaDicoba = error.kode !== "NOT_FOUND" && error.kode !== "FORBIDDEN";
            return (
                <Alert tipe="bahaya">
                    <p>{pesanUntukPengguna(error)}</p>
                    {laporan && <p>{laporan}</p>}
                    {bisaDicoba && (
                        <Button ukuran="sm" onClick={muatUlang}>
                            Coba lagi
                        </Button>
                    )}
                    <p>
                        <Link to="/jurnal">Kembali ke daftar jurnal</Link>
                    </p>
                </Alert>
            );
        }

        case "berhasil":
            return (
                <>
                    <p>
                        <Link to="/jurnal">Kembali ke daftar jurnal</Link>
                    </p>
                    <JurnalCard jurnal={hasil.data} />
                </>
            );
    }
}