import { useNavigate } from "react-router";
import type { Peserta } from "../api/types";
import { FormLogin } from "../components/auth/FormLogin";
import { Kartu } from "../components/ui/Kartu";

interface HalamanLoginProps {
    onBerhasil: (peserta: Peserta) => void;
}

export function HalamanLogin({ onBerhasil }: HalamanLoginProps) {
    const navigate = useNavigate();

    return (
        <main>
            <Kartu judul="Masuk">
                <FormLogin
                    onBerhasil={(peserta) => {
                        onBerhasil(peserta);
                        navigate("/jurnal", { replace: true });
                    }}
                />
            </Kartu>
        </main>
    );
}