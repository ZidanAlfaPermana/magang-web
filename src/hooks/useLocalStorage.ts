import { useEffect, useState } from "react";
import type {Dispatch, SetStateAction} from "react";

export function useLocalStorage<T>(
    kunci: string,
    nilaiAwal: T,
    valid: (data: unknown) => data is T
): [T, Dispatch<SetStateAction<T>>] {
    const [nilai, setNilai] = useState<T>(() => {
        try {
            const tersimpan = localStorage.getItem(kunci);
            if (tersimpan === null) return nilaiAwal;

            const data: unknown = JSON.parse(tersimpan);
            return valid(data) ? data : nilaiAwal;
        } catch {
            return nilaiAwal;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(kunci, JSON.stringify(nilai));
        } catch {
            return;
        }
    }, [kunci, nilai]);

    return [nilai, setNilai];
}