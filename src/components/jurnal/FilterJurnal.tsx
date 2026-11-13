import type { FilterStatus } from "../../types/jurnal";
import { adalahFilterStatus } from "../../utils/guard";

interface FilterJurnalProps {
    nilai: FilterStatus;
    onUbah: (nilai: FilterStatus) => void;
}

export function FilterJurnal({ nilai, onUbah }: FilterJurnalProps) {
    return (
        <label>
            Status review
            <select
                value={nilai}
                onChange={(e) => {
                    const dipilih = e.target.value;
                    if (adalahFilterStatus(dipilih)) {
                        onUbah(dipilih);
                    }
                }}
            >
                <option value="semua">Semua</option>
                <option value="belum">Belum direview</option>
                <option value="sudah">Sudah direview</option>
            </select>
        </label>
    );
}