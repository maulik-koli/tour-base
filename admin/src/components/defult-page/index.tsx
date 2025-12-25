import { Typography } from '@ui/typography'

const DefaultPage = ({ page }: { page: string }) => {
    return (
        <div className="w-full flex items-center mt-50">
            <Typography variant="h1" className="w-full">{page}</Typography>
        </div>
    )
}

export default DefaultPage