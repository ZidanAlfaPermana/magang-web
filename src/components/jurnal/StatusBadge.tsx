// src/components/jurnal/StatusBadge.tsx
import styles from "./StatusBadge.module.css";
import { cx } from "../../utils/cx";
import type { StatusReview } from "../../types/jurnal";

export function StatusBadge({ status }: { status: StatusReview }) {
    return (
        <span className={cx(styles.badge, styles[status])}>
      {status === "sudah" ? "Sudah direview" : "Belum direview"}
    </span>
    );
}