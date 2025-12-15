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
        <section className='w-full p-20 bg-card'>
            <SectionHeader
                title="Everything You Need for a Great Trip"
                subtitle="Carefully curated tours, flexible packages, and dedicated support at every step of your journey."
            />

            <div className='w-full flex gap-12 justify-between items-stretch'>
                {WHY_CHOOSE_US.map((item, index) => (
                    <div key={index} className='h-full min-h-65 flex flex-col gap-6 items-center w-full bg-card p-6 rounded-lg shadow text-center hover:shadow-md'>
                        <div className='w-16 h-16 min-w-16 min-h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center'>
                            <Icon name={item.icon}  width={36} height={36} />
                        </div>
                        <Typography variant='h4' className='font-medium'>{item.title}</Typography>
                        <Typography variant='p'>{item.description}</Typography>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WhyChooseUsSections
