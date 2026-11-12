import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Button } from "../ui/Button";
import type { ProfilBaru } from "../../types/peserta";
import styles from "../ui/Form.module.css";
import {type FormProfilErrors, type FormProfilState, validasiFormProfil} from "../../utils/validasiProfile.ts";

interface FormProfilProps {
    onSimpan: (data: ProfilBaru) => void;
}

const NILAI_AWAL: FormProfilState = { nama: "", telepon: "" };

export function FormProfil({ onSimpan }: FormProfilProps) {
    const [nilai, setNilai] = useState<FormProfilState>(NILAI_AWAL);
    const [errors, setErrors] = useState<FormProfilErrors>({});

    const ubah: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setNilai((sebelumnya) => ({ ...sebelumnya, [name]: value }));
        setErrors((sebelumnya) => ({ ...sebelumnya, [name]: undefined }));
    };

    const kirim: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const hasil = validasiFormProfil(nilai);
        setErrors(hasil);
        if (Object.keys(hasil).length > 0) return;

        onSimpan({ nama: nilai.nama.trim(), telepon: nilai.telepon.trim() || null });
        setNilai(NILAI_AWAL);
    };

    return (
        <form onSubmit={kirim} noValidate>
            <div className={styles.kolom}>
                <label htmlFor="nama">Nama</label>
                <input
                    id="nama"
                    name="nama"
                    value={nilai.nama}
                    onChange={ubah}
                    aria-invalid={errors.nama ? true : undefined}
                    aria-describedby={errors.nama ? "nama-error" : undefined}
                />
                {errors.nama && (
                    <p id="nama-error" role="alert" className={styles.error}>
                        {errors.nama}
                    </p>
                )}
            </div>

            <div className={styles.kolom}>
                <label htmlFor="telepon">Telepon (opsional)</label>
                <input
                    id="telepon"
                    name="telepon"
                    type="tel"
                    value={nilai.telepon}
                    onChange={ubah}
                    aria-invalid={errors.telepon ? true : undefined}
                    aria-describedby={errors.telepon ? "telepon-error" : undefined}
                />
                {errors.telepon && (
                    <p id="telepon-error" role="alert" className={styles.error}>
                        {errors.telepon}
                    </p>
                )}
            </div>

            <Button type="submit">Simpan profil</Button>
        </form>
    );
}