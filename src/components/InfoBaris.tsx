interface InfoBarisProps {
    label: string;
    nilai: string | number;
}

export default function InfoBaris({ label, nilai }: InfoBarisProps) {
    return (
        <p>
            <strong>{label}:</strong> {nilai}
    </p>
);
}