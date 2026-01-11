import React from 'react'
import Link from 'next/link'
import { SOCIAL_LINKS } from '@/constants/static-data'

import Icon, { IconName } from '@/components/icons'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'

const SOCIAL_LINKS_ICONS: { name: string, url: string, icon: IconName }[]= [
    { name: 'Facebook', url: SOCIAL_LINKS.facebook, icon: 'facebook' },
    { name: 'Instagram', url: SOCIAL_LINKS.instagram, icon: 'instagram' },
    { name: 'YouTube', url: SOCIAL_LINKS.youtube, icon: 'youtube' },
    { name: 'Twitter', url: SOCIAL_LINKS.twitter, icon: 'twitter' },
]

const QUICK_LINKS = [
    { title: 'All Tours', href: '/tours' },
    { title: 'Contact', href: '/contact-us' },
    { title: 'Terms & Conditions', href: '/terms-and-conditions' },
    { title: 'Refund Policy', href: '/refund-policy' },
]

const TOP_CATEGORIES = [
    { title: 'Beach', href: '/tours?category=beach' },
    { title: 'Mountain Retreats', href: '/tours?category=mountain' },
    { title: 'Haritage', href: '/tours?category=heritage' },
    { title: 'Religion & Spirituality', href: '/tours?category=religion-spirituality' },
    { title: 'Snow Tours', href: '/tours?category=snow' },
]


const Footer: React.FC = () => {
    return (
        <footer className='w-full bg-card border-t border-border'>
            <div className='px-4 md:px-12 lg:px-20 py-8 md:py-12'>
                <div className='flex flex-col lg:flex-row gap-16 md:gap-20 lg:gap-24'>
                    <div className='lg:w-80 lg:shrink-0'>
                        <div className='space-y-3 md:space-y-4'>
                            <div className='flex items-center gap-2'>
                                <div className='relative w-24 h-12 md:w-30 md:h-15 rounded-lg flex items-center justify-center'>
                                    <FallbackImage
                                        src="/logo.png"
                                        alt="Eklavya Tourism Logo"
                                        className='object-cover overflow-hidden rounded-sm'
                                        loading="eager"
                                    />
                                </div>
                            </div>
                            <Typography variant="p" className='text-foreground'>
                                Creating unforgettable travel experiences since 2010. Your adventure starts here.
                            </Typography>
                            <div className='flex items-center gap-2 md:gap-3 pt-2'>
                                {SOCIAL_LINKS_ICONS.map((link) => (
                                    <Link 
                                        key={link.name}
                                        href={link.url} 
                                        target="_blank"
                                        className='w-8 h-8 md:w-9 md:h-9 rounded-md bg-secondary hover:bg-primary/30 transition-colors flex items-center justify-center'
                                    >
                                        <Icon name={link.icon} className='w-3.5 h-3.5 md:w-4 md:h-4 text-secondary-foreground' fill='#1E3A8A' />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
                        <div className='space-y-3 md:space-y-4'>
                            <Typography variant="large" className='font-semibold'>
                                Quick Links
                            </Typography>
                            <ul className='space-y-1.5 md:space-y-2'>
                                {QUICK_LINKS.map((link) => (
                                    <li key={link.title}>
                                        <Link href={link.href} className='text-foreground hover:text-primary transition-colors text-sm md:text-lg'>
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='space-y-3 md:space-y-4'>
                            <Typography variant="large" className='font-semibold'>
                                Tour Categories
                            </Typography>
                            <ul className='space-y-1.5 md:space-y-2'>
                                {TOP_CATEGORIES.map((link) => (
                                    <li key={link.title}>
                                        <Link href={link.href} className='text-foreground hover:text-primary transition-colors text-sm md:text-lg'>
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='space-y-3 md:space-y-4 col-span-2 lg:col-span-1'>
                            <Typography variant="large" className='font-semibold'>
                                Contact Info
                            </Typography>
                            <ul className='space-y-2 md:space-y-3'>
                                <li className='flex items-center gap-2 md:gap-3'>
                                    <Icon name='Phone' className='w-3.5 h-3.5 md:w-4 md:h-4 text-primary shrink-0' />
                                    <a href="tel:+918000057070" className='text-foreground hover:text-primary transition-colors text-sm md:text-lg'>
                                        +91 8000057070
                                    </a>
                                </li>
                                <li className='flex items-center gap-2 md:gap-3'>
                                    <Icon name='Mail' className='w-3.5 h-3.5 md:w-4 md:h-4 text-primary shrink-0' />
                                    <a href="mailto:eklavyatourism@gmail.com" className='text-foreground hover:text-primary transition-colors text-sm md:text-lg'>
                                        eklavyatourism@gmail.com
                                    </a>
                                </li>
                                <li className='flex items-start gap-2 md:gap-3'>
                                    <Icon name='MapPin' className='w-3.5 h-3.5 md:w-4 md:h-4 text-primary shrink-0 mt-0.5' />
                                    <Typography variant="p" className='text-foreground'>
                                        EKLAVYA TOURISM<br />
                                        Hanuman Madhi Chowk,<br />
                                        Raiya Road, 150 feet Ring Road,<br />
                                        Rajkot - 360007
                                    </Typography>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full px-4 md:px-12 lg:px-20'>
                <Separator className='bg-border'  />
            </div>

            <div className='px-4 md:px-12 lg:px-20 py-4 md:py-6'>
                <div className='flex flex-col md:flex-row items-center justify-center gap-2 text-center'>
                    <Typography variant="p" className='text-muted-foreground text-sm md:text-base'>
                        © 2026 Eklavya Tourism. All rights reserved.
                    </Typography>
                </div>
            </div>
        </footer>
    )
}

export default Footer
