import { NavLink, Outlet } from "react-router";
import type { Peserta } from "../../api/types";
import { cx } from "../../utils/cx";
import { Button } from "../ui/Button";
import { Header } from "./Header";
import styles from "./LayoutAplikasi.module.css";

interface LayoutAplikasiProps {
    peserta: Peserta | null;
    onKeluar: () => void;
}

export function LayoutAplikasi({ peserta, onKeluar }: LayoutAplikasiProps) {
    return (
        <>
            <Header judul="Jurnal Magang" namaPeserta={peserta?.nama ?? "Belum login"} />
            <nav aria-label="Utama" className={styles.menu}>
                <NavLink
                    to="/jurnal"
                    className={({ isActive }) => cx(styles.tautan, isActive && styles.aktif)}
                >
                    Jurnal
                </NavLink>
                <NavLink
                    to="/profil"
                    className={({ isActive }) => cx(styles.tautan, isActive && styles.aktif)}
                >
                    Profil
                </NavLink>
                {peserta ? (
                    <Button ukuran="sm" variant="secondary" onClick={onKeluar}>
                        Keluar
                    </Button>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) => cx(styles.tautan, isActive && styles.aktif)}
                    >
                        Masuk
                    </NavLink>
                )}
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}