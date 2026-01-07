import React from 'react'
import { Typography } from '@/components/ui/typography'
import Icon, { IconName } from '@/components/icons';
import SectionHeader from '../section-header';

type WhyChooseUsType = {
    title: string;
    description: string;
    icon: IconName;
}

const WHY_CHOOSE_US: WhyChooseUsType[] = [
    {
        title: "Transparent Pricing",
        description: "Clear pricing with no hidden charges. What you see is what you pay",
        icon: "BadgeIndianRupee"
    },
    {
        title: "Expertly Planned Tours",
        description: "Carefully designed itineraries covering must-see places without unnecessary rush",
        icon: "BusFront"
    },
    {
        title: "Comfortable Stays & Travel",
        description: "Handpicked hotels and smooth travel arrangements for a relaxed experience",
        icon: "Hotel"
    },
    {
        title: "Reliable Support",
        description: "Dedicated assistance before, during, and after your journey",
        icon: "Headset"
    },
]


const WhyChooseUsSections: React.FC = () => {
    return (
        <section className='w-full p-4 md:p-12 lg:p-20 bg-card'>
            <SectionHeader
                title="Everything You Need for a Great Trip"
                subtitle="Carefully curated tours, flexible packages, and dedicated support at every step of your journey."
            />

            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12'>
                {WHY_CHOOSE_US.map((item, index) => (
                    <div key={index} className='h-full min-h-50 md:min-h-74 flex flex-col gap-4 md:gap-6 items-center w-full bg-card p-4 md:p-6 rounded-lg shadow text-center hover:shadow-md transition-shadow'>
                        <div className='w-14 h-14 md:w-16 md:h-16 min-w-14 min-h-14 md:min-w-16 md:min-h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center'>
                            <Icon name={item.icon} className='w-7 h-7 md:w-9 md:h-9' />
                        </div>
                        <Typography variant='h4' className='font-medium text-lg md:text-2xl'>{item.title}</Typography>
                        <Typography variant='p' className='text-sm md:text-base'>{item.description}</Typography>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WhyChooseUsSections
