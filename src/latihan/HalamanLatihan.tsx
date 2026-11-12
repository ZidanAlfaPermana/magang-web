import { useState } from "react";
import { Kartu } from "../components/ui/Kartu";
import type { ProfilBaru } from "../types/peserta";
import { Penghitung } from "./Penghitung";
import { Snapshot } from "./Snapshot";
import { DemoKunciIndeks } from "./DemoKunciIndeks";
import { DuaPenghitung } from "./DuaPenghitung";
import { ContohTipeState } from "./ContohTipeState";
import { StateUndefined, TanpaOnChange } from "./JebakanTerkontrol";
import {ObjekBersarang} from "./ObjectBersarang.tsx";
import {FormProfil} from "../components/peserta/FormProfile.tsx";
import {PenghitungVariable} from "./PenghitungVariable.tsx";

export default function HalamanLatihan() {
    const [profil, setProfil] = useState<ProfilBaru | null>(null);

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
            <Kartu judul="Bug key indeks">
                <DemoKunciIndeks />
            </Kartu>
            <Kartu judul="State milik instans">
                <DuaPenghitung />
            </Kartu>
            <Kartu judul="Ketik state">
                <ContohTipeState />
            </Kartu>
            <Kartu judul="Objek bersarang">
                <ObjekBersarang />
            </Kartu>
            <Kartu judul="Jebakan terkontrol">
                <TanpaOnChange />
                <StateUndefined />
            </Kartu>
            <Kartu judul="Form profil">
                <FormProfil onSimpan={setProfil} />
                {profil && (
                    <p>
                        Tersimpan: {profil.nama} ({profil.telepon ?? "tanpa telepon"})
                    </p>
                )}
            </Kartu>
        </div>
    );
}