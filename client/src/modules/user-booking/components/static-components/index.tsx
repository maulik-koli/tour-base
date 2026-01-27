import Icon from "@/components/icons"
import { PHONE_NUMBER, PHONE_NUMBER_DISPLAY, WHATSAPP_MESSAGE_URL } from "@/constants/static-data"
import { Typography } from "@ui/typography"


export const HelpSection: React.FC = function() {
    return (
        <div className='mt-10 pt-8 border-t border-border'>
            <div className='text-center space-y-3'>
                <Typography variant="muted">
                    Need help? Contact our support team
                </Typography>
                <div className='flex items-center justify-center gap-4'>
                    <a 
                        href={`tel:${PHONE_NUMBER}`}
                        className='flex items-center gap-2 text-sm text-primary hover:underline'
                    >
                        <Icon name='Phone' className='w-4 h-4' />
                        {PHONE_NUMBER_DISPLAY}
                    </a>
                    <span className='text-border'>|</span>
                    <a 
                        href={WHATSAPP_MESSAGE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='flex items-center gap-2 text-sm text-primary hover:underline'
                    >
                        <Icon name='whatspp' className='w-4 h-4' fill='currentColor' />
                        WhatsApp
                    </a>
                </div>
            </div>
        </div>
    )
}


export const RequestCardHeader: React.FC<{ stepNumber: number; title: string }> = ({ stepNumber, title }) => {
    return (
        <div className='flex items-center gap-2'>
            <div className='w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium'>
                {stepNumber}
            </div>
            <Typography variant="large">
                {title}
            </Typography>
        </div>
    )
}