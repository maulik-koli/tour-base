import { Typography } from "@ui/typography";

export const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className='flex flex-col gap-1'>
        <Typography variant="muted" className='text-xs uppercase tracking-wide'>
            {label}
        </Typography>
        <Typography variant="p" className='font-medium text-sm md:text-base wrap-break-word'>
            {value || "-"}
        </Typography>
    </div>
)