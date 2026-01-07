import React from 'react'
import Link from 'next/link'
import Icon from '@/components/icons'
import { Typography } from '@ui/typography'

const AGE_PRICING_POLICY = [
    "Children under 6 years travel free but must be added as members",
    "Children aged 6-11 years are charged children price of package",
    "Adults (12+ years) are charged full price"
]

const CANCELATION_POLICY = [
    "Cancellation within 10 days of travel: No refund",
    "Cancellation within 20 days of travel: 30% refund",
    "Cancellation within 25 days of travel: 50% refund",
    "Cancellation within 30 days of travel: Full refund",
]

const IMPORTANT_NOTES = [
    "Please read all tour details carefully before confirming your booking",
    "Booking confirmation and tour details will be sent to your WhatsApp number",
    "You will be notified about payment success or failure immediately",
    "If you choose partial payment, remaining amount must be paid 1 week before travel date",
]


const PaymentTerms: React.FC = () => {
    return (
        <>
            <div className='w-full p-4 md:p-6 bg-card flex flex-col gap-4 md:gap-6 border border-border rounded-lg'>
                <div className='flex items-center gap-2'>
                    <Icon name='FileText' className='w-5 h-5 md:w-6 md:h-6 text-blue-600'/>
                    <Typography variant="h4" className='font-medium'>Terms & Conditions</Typography>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 px-0 md:px-2'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                            <Typography variant="large" className='font-medium text-foreground'>
                                Age & Pricing Policy
                            </Typography>
                        </div>
                        <ul className='flex list-disc ml-6 text-left flex-col gap-2'>
                            {CANCELATION_POLICY.map((term) => (
                                <li key={term}>
                                    <Typography variant="p" className='text-sm'>
                                        {term}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-2'>
                            <Typography variant="large" className='font-medium text-foreground'>
                                Cancellation Policy
                            </Typography>
                        </div>
                        <ul className='flex list-disc ml-6 text-left flex-col gap-2'>
                            {AGE_PRICING_POLICY.map((term) => (
                                <li key={term}>
                                    <Typography variant="p" className='text-sm'>
                                        {term}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='w-full p-3 md:p-4 bg-primary/10 border border-primary rounded-lg flex items-start gap-2 md:gap-3'>
                    <Icon name='whatspp' className='w-5 h-5 md:w-6 md:h-6 mt-0.5 md:mt-1 shrink-0' fill='#64B161'/>
                    <div className='flex flex-col gap-1'>
                        <Typography variant="p" className='font-semibold'>
                            WhatsApp Notifications:
                            <span className='font-normal ml-1'>
                                Tour details, booking confirmation, and payment updates will be sent to your WhatsApp number. Please ensure one of your phone numbers is WhatsApp enabled.
                            </span>
                        </Typography>
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <Link href="/terms-and-conditions" target="_blank" className='flex items-center gap-2 group'>
                        <Icon name='SquareArrowOutUpRight' width={16} height={16} className='mt-0.5 group-hover:text-primary ' />
                        <Typography variant="p" className='font-medium group-hover:text-primary'>Read Full Terms & Conditions</Typography>
                    </Link>
                </div>
            </div>

            <div className='w-full rounded-md bg-accent/10 border border-accent p-3 md:p-4 text-center text-sm text-muted-foreground'>
                <div className='flex items-start sm:items-center gap-2'>
                    <Icon name="Info" className='w-4 h-4 md:w-5 md:h-5 text-accent mt-0.5 sm:mt-1 shrink-0' />
                    <Typography variant="p" className='text-accent font-medium'>
                        Important Notes:
                    </Typography>
                </div>
                <ul className='flex flex-col gap-2 list-disc mt-2 ml-6 md:ml-10 text-left text-accent-foreground text-xs md:text-sm'>
                    {IMPORTANT_NOTES.map((note) => (
                        <li key={note}>{note}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default PaymentTerms
