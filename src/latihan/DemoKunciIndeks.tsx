// src/latihan/DemoKunciIndeks.tsx
import { useState } from "react";

export function DemoKunciIndeks() {
    const [item, setItem] = useState(["Satu", "Dua", "Tiga"]);

    return (
        <>
            <ul>
                {item.map((nama, indeks) => (
                    <li key={indeks}>                     {/* BUG: kunci = indeks */}
                        {nama} <input placeholder="catatan" />
                    </li>
                ))}
            </ul>
            <button onClick={() => setItem(item.slice(1))}>Hapus yang pertama</button>
        </>
    );
}