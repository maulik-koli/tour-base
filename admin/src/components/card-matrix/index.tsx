import React from 'react'
import Icon, { IconName } from '@/components/icons'
import { Typography } from '@ui/typography'
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@ui/card';

const COLOR_CLASSES = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    violet: 'bg-violet-100 text-violet-600',
    orange: 'bg-orange-100 text-orange-600',
} as const

type ColorName = keyof typeof COLOR_CLASSES


type CardMatrixType = {
    value: number;
    icon: IconName;
    label: string;
    colorName: ColorName;
}


const CARD_DATA: CardMatrixType[] = [
    {

        value: 120,
        icon: 'MapPinned',
        label: 'Total Tours',
        colorName: "blue"
    },
    {
        value: 200,
        icon: 'Package',
        label: 'Total Packages',
        colorName: "green"
    },
    {
        value: 1500,
        icon: 'Ticket',
        label: 'Total tickets booked in 30 days',
        colorName: "violet"
    },
    {
        value: 3500,    
        icon: 'TicketCheck',
        label: 'Total tickets booked',
        colorName: "orange"
    }
]


const CardMatrix: React.FC = () => {
    // here call the api

    return (
        <div className='w-full lg:col-span-8'>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8'>
                {CARD_DATA.map((card) => (
                    <DashboardCard 
                        key={card.label}
                        value={card.value}
                        icon={card.icon}
                        label={card.label}
                        colorName={card.colorName}
                    />
                ))}
            </div>
        </div>
    )
}

export default CardMatrix



const DashboardCard: React.FC<CardMatrixType> = function ({ value, icon, label, colorName }) {
    return (
        <Card>
            <CardContent>
                <div className='flex items-center justify-between gap-3 md:gap-4'>
                    <div className={cn(
                        'flex items-center justify-center rounded-lg h-9 w-9 md:h-10 md:w-10',
                        COLOR_CLASSES[colorName],
                    )}>
                        <Icon name={icon} className='w-4 h-4 md:w-5 md:h-5' />
                    </div>
                    <div className='flex flex-col gap-1.5 md:gap-2 items-end'>
                        <Typography variant="h4" className='font-semibold text-lg md:text-xl lg:text-2xl'>{value}</Typography>
                        <Typography variant="p" className='text-muted-foreground text-xs md:text-sm text-right'>{label}</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}