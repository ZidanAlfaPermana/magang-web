import Kartu from "../components/Kartu";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { Badge } from "../components/ui/Badge";
import { StatusBadge } from "../components/jurnal/StatusBadge";
import {jurnalTiruan} from "../data/jurnalTiruan.ts";
import {JurnalCard} from "../components/JurnalCard.tsx";
import {TombolKoordinat} from "../components/TombolKoordinat.tsx";

const varianTombol = ["primary", "secondary", "danger"] as const;
const ukuranTombol = ["sm", "md"] as const;
const tipeAlert = ["info", "sukses", "bahaya"] as const;
const warnaBadge = ["abu", "biru", "hijau", "merah"] as const;

export default function GaleriKomponen() {
    return (
        <div>
            <Kartu judul="Button">
                {varianTombol.map((variant) => (
                    <div key={variant}>
                        {ukuranTombol.map((ukuran) => (
                            <Button key={ukuran} variant={variant} ukuran={ukuran}>
                                {variant} {ukuran}
                            </Button>
                        ))}
                        <Button variant={variant} disabled>
                            {variant} disabled
                        </Button>
                    </div>
                ))}
            </Kartu>

            <Kartu judul="Alert">
                {tipeAlert.map((tipe) => (
                    <Alert key={tipe} tipe={tipe}>
                        Ini alert bertipe {tipe}
                    </Alert>
                ))}
            </Kartu>

            <Kartu judul="Badge">
                {warnaBadge.map((warna) => (
                    <Badge key={warna} warna={warna}>
                        {warna}
                    </Badge>
                ))}
            </Kartu>

            <Kartu judul="StatusBadge">
                <StatusBadge status="sudah" />
                <StatusBadge status="belum" />
            </Kartu>

            <Kartu judul="JurnalCard">
                <JurnalCard jurnal={jurnalTiruan[0]} />
                <JurnalCard jurnal={jurnalTiruan[1]} onHapus={(id) => console.log("hapus", id)} />
            </Kartu>

            <TombolKoordinat />
        </div>
    );
}