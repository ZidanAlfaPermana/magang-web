import type { ChangeEventHandler } from "react";
import styles from "./Form.module.css";

interface KolomProps {
    nama: string;
    label: string;
    nilai: string;
    onUbah: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: string;
    jenis?: "text" | "email" | "password" | "textarea";
    autoComplete?: string;
}

export function Kolom({
                          nama,
                          label,
                          nilai,
                          onUbah,
                          error,
                          jenis = "text",
                          autoComplete,
                      }: KolomProps) {
    const idError = `${nama}-error`;
    const atribut = {
        id: nama,
        name: nama,
        value: nilai,
        onChange: onUbah,
        autoComplete,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? idError : undefined,
    };

    return (
        <div className={styles.kolom}>
            <label htmlFor={nama}>{label}</label>
            {jenis === "textarea" ? <textarea {...atribut} /> : <input type={jenis} {...atribut} />}
            {error && (
                <p id={idError} role="alert" className={styles.error}>
                    {error}
                </p>
            )}
        </div>
    );
}