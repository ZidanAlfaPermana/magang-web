import { useId, useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Button } from "../ui/Button";
import { validasiReview } from "../../utils/validasiJurnal";
import type { FormReviewErrors } from "../../utils/validasiJurnal";
import type { Jurnal, StatusReview } from "../../types/jurnal";
import styles from "../ui/Form.module.css";

interface PanelReviewProps {
    jurnal: Jurnal;
    onSimpan: (status: StatusReview, catatan: string) => void;
    onBatal: () => void;
}

export function PanelReview({ jurnal, onSimpan, onBatal }: PanelReviewProps) {
    const idDasar = useId();
    const idCatatan = `${idDasar}-catatan`;
    const idError = `${idDasar}-error`;
    const catatanRef = useRef<HTMLTextAreaElement>(null);
    const [status, setStatus] = useState<StatusReview>("sudah");
    const [catatan, setCatatan] = useState(jurnal.catatanMentor ?? "");
    const [errors, setErrors] = useState<FormReviewErrors>({});

    const ubahCatatan: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setCatatan(e.target.value);
        setErrors({});
    };

    const kirim: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const hasil = validasiReview({ status, catatan });
        setErrors(hasil);

        if (hasil.catatan) {
            catatanRef.current?.focus();
            return;
        }

        onSimpan(status, catatan);
    };

    return (
        <form onSubmit={kirim} noValidate>
            <div role="radiogroup" aria-label="Status review">
                <label>
                    <input
                        type="radio"
                        name={`${idDasar}-status`}
                        checked={status === "sudah"}
                        onChange={() => setStatus("sudah")}
                    />
                    Sudah direview
                </label>
                <label>
                    <input
                        type="radio"
                        name={`${idDasar}-status`}
                        checked={status === "belum"}
                        onChange={() => setStatus("belum")}
                    />
                    Belum direview
                </label>
            </div>

            <div className={styles.kolom}>
                <label htmlFor={idCatatan}>
                    {status === "sudah" ? "Catatan (wajib, minimal 5 karakter)" : "Catatan (opsional)"}
                </label>
                <textarea
                    ref={catatanRef}
                    id={idCatatan}
                    value={catatan}
                    onChange={ubahCatatan}
                    aria-invalid={errors.catatan ? true : undefined}
                    aria-describedby={errors.catatan ? idError : undefined}
                />
                {errors.catatan && (
                    <p id={idError} role="alert" className={styles.error}>
                        {errors.catatan}
                    </p>
                )}
            </div>

            <Button type="submit" ukuran="sm">
                Simpan review
            </Button>
            <Button variant="secondary" ukuran="sm" onClick={onBatal}>
                Batal
            </Button>
        </form>
    );
}