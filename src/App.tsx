import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { keluar } from "./api/auth";
import type { Peserta } from "./api/types";
import { LayoutAplikasi } from "./components/layout/LayoutAplikasi";
import { HalamanLogin } from "./pages/HalamanLogin";
import { HalamanJurnal } from "./pages/HalamanJurnal";
import { HalamanDetailJurnal } from "./pages/HalamanDetailJurnal";
import { HalamanProfil } from "./pages/HalamanProfil";
import { Halaman404 } from "./pages/Halaman404";
import { HalamanLampiran } from "./pages/HalamanLampiran";
import styles from "./App.module.css";

export default function App() {
    const [peserta, setPeserta] = useState<Peserta | null>(null);
    const navigate = useNavigate();

    function keluarDariAkun() {
        keluar();
        setPeserta(null);
        navigate("/login", { replace: true });
    }

    return (
        <div className={styles.halaman}>
            <Routes>
                <Route path="/login" element={<HalamanLogin onBerhasil={setPeserta} />} />
                <Route element={<LayoutAplikasi peserta={peserta} onKeluar={keluarDariAkun} />}>
                    <Route index element={<Navigate to="/jurnal" replace />} />
                    <Route path="jurnal" element={<HalamanJurnal />} />
                    <Route path="jurnal/:id" element={<HalamanDetailJurnal />} />
                    <Route path="profil" element={<HalamanProfil peserta={peserta} />} />
                    <Route path="*" element={<Halaman404 />} />
                </Route>
                <Route path="jurnal/:id/lampiran/:nomor" element={<HalamanLampiran />} />
            </Routes>
        </div>
    );
}