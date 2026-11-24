import { Link, useParams } from "react-router";
import { Kartu } from "../components/ui/Kartu";
import { bacaNomorPositif } from "../utils/url";
import { Halaman404 } from "./Halaman404";

export function HalamanLampiran() {
    const { id, nomor } = useParams<{ id: string; nomor: string }>();
    const idJurnal = bacaNomorPositif(id);
    const nomorLampiran = bacaNomorPositif(nomor);

    if (idJurnal === null || nomorLampiran === null) {
        return <Halaman404 />;
    }

    return (
        <Kartu judul="Lampiran">
            <p>
                Jurnal nomor {idJurnal}, lampiran nomor {nomorLampiran}
            </p>
            <p>
                <Link to={`/jurnal/${idJurnal}`}>Kembali ke detail jurnal</Link>
            </p>
        </Kartu>
    );
}