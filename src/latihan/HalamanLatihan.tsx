import { Kartu } from "../components/ui/Kartu";
import { PenghitungVariable } from "./PenghitungVariable";
import { Penghitung } from "./Penghitung";
import { Snapshot } from "./Snapshot";
import { DuaPenghitung } from "./DuaPenghitung";
import { ContohTipeState } from "./ContohTipeState";

export default function HalamanLatihan() {
    return (
        <div>
            <Kartu judul="Variabel biasa">
                <PenghitungVariable />
            </Kartu>
            <Kartu judul="Penghitung dengan state">
                <Penghitung />
            </Kartu>
            <Kartu judul="Snapshot">
                <Snapshot />
            </Kartu>
            <Kartu judul="State milik instans">
                <DuaPenghitung />
            </Kartu>
            <Kartu judul="Ketik state">
                <ContohTipeState />
            </Kartu>
        </div>
    );
}