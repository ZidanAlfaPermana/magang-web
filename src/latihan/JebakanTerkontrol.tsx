import { useState } from "react";

export function TanpaOnChange() {
    return <input value="tetap" readOnly aria-label="Kolom read-only" />;
}

export function StateUndefined() {
    const [nama, setNama] = useState("");

    return (
        <input
            aria-label="Kolom dari string kosong"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
        />
    );
}