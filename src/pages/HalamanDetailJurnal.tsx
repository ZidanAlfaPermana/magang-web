import { useParams } from "react-router";
import { DetailJurnal } from "../components/jurnal/DetailJurnal";
import { Kartu } from "../components/ui/Kartu";
import { bacaNomorPositif } from "../utils/url";
import { Halaman404 } from "./Halaman404";

export function HalamanDetailJurnal() {
    const { id } = useParams<{ id: string }>();
    const nomor = bacaNomorPositif(id);

    if (nomor === null) {
        return <Halaman404 />;
    }

    return (
        <Kartu judul="Detail Jurnal">
            <DetailJurnal id={nomor} />
        </Kartu>
    );
}