import { useSearchParams } from "react-router";
import { JurnalSaya } from "../components/jurnal/JurnalSaya";
import { bacaNomorPositif } from "../utils/url";

export function HalamanJurnal() {
    const [params, setParams] = useSearchParams();
    const halaman = bacaNomorPositif(params.get("halaman")) ?? 1;

    return (
        <JurnalSaya
            halaman={halaman}
            onUbahHalaman={(baru) => setParams({ halaman: String(baru) })}
        />
    );
}