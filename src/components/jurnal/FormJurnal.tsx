import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Button } from "../ui/Button";
import { validasiFormJurnal } from "../../utils/validasiJurnal";
import type { FormJurnalErrors, FormJurnalState } from "../../utils/validasiJurnal";
import type { JurnalBaru } from "../../types/jurnal";
import styles from "../ui/Form.module.css";

interface FormJurnalProps {
    onTambah: (data: JurnalBaru) => void;
}

const NILAI_AWAL: FormJurnalState = { kegiatan: "", hambatan: "", linkCommit: "" };
const URUTAN_KOLOM: ReadonlyArray<keyof FormJurnalState> = ["kegiatan", "hambatan", "linkCommit"];

export function FormJurnal({ onTambah }: FormJurnalProps) {
    const [nilai, setNilai] = useState<FormJurnalState>(NILAI_AWAL);
    const [errors, setErrors] = useState<FormJurnalErrors>({});

    const ubah: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target;
        setNilai((sebelumnya) => ({ ...sebelumnya, [name]: value }));
        setErrors((sebelumnya) => ({ ...sebelumnya, [name]: undefined }));
    };

    const kirim: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const hasil = validasiFormJurnal(nilai);
        setErrors(hasil);

        const kolomSalah = URUTAN_KOLOM.find((kolom) => hasil[kolom]);
        if (kolomSalah) {
            const elemen = e.currentTarget.elements.namedItem(kolomSalah);
            if (elemen instanceof HTMLElement) {
                elemen.focus();
            }
            return;
        }

        onTambah({
            kegiatan: nilai.kegiatan.trim(),
            hambatan: nilai.hambatan.trim() || null,
            linkCommit: nilai.linkCommit.trim() || null,
        });
        setNilai(NILAI_AWAL);
    };

    return (
        <form onSubmit={kirim} noValidate>
            <div className={styles.kolom}>
                <label htmlFor="kegiatan">Kegiatan hari ini</label>
                <textarea
                    id="kegiatan"
                    name="kegiatan"
                    value={nilai.kegiatan}
                    onChange={ubah}
                    aria-invalid={errors.kegiatan ? true : undefined}
                    aria-describedby={errors.kegiatan ? "kegiatan-error" : undefined}
                />
                {errors.kegiatan && (
                    <p id="kegiatan-error" role="alert" className={styles.error}>
                        {errors.kegiatan}
                    </p>
                )}
            </div>

            <div className={styles.kolom}>
                <label htmlFor="hambatan">Hambatan (opsional)</label>
                <textarea
                    id="hambatan"
                    name="hambatan"
                    value={nilai.hambatan}
                    onChange={ubah}
                    aria-invalid={errors.hambatan ? true : undefined}
                    aria-describedby={errors.hambatan ? "hambatan-error" : undefined}
                />
                {errors.hambatan && (
                    <p id="hambatan-error" role="alert" className={styles.error}>
                        {errors.hambatan}
                    </p>
                )}
            </div>

            <div className={styles.kolom}>
                <label htmlFor="linkCommit">Link commit (opsional)</label>
                <input
                    id="linkCommit"
                    name="linkCommit"
                    value={nilai.linkCommit}
                    onChange={ubah}
                    aria-invalid={errors.linkCommit ? true : undefined}
                    aria-describedby={errors.linkCommit ? "linkCommit-error" : undefined}
                />
                {errors.linkCommit && (
                    <p id="linkCommit-error" role="alert" className={styles.error}>
                        {errors.linkCommit}
                    </p>
                )}
            </div>

            <Button type="submit">Simpan jurnal</Button>
        </form>
    );
}