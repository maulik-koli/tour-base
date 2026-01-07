import React from 'react'
import Link from 'next/link'
import Icon, { IconName } from '@/components/icons'
import FallbackImage from '@/components/fallback-image'
import { Typography } from '@ui/typography'
import { Separator } from '@ui/separator'
import { SOCIAL_LINKS } from '@/constants/static-data'

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
            <div className='px-20 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-2'>
                            <div className='relative w-30 h-15 rounded-lg flex items-center justify-center'>
                                <FallbackImage
                                    src="/logo.png"
                                    alt="Eklavya Tourism Logo"
                                    className='object-cover overflow-hidden rounded-sm'
                                />
                            </div>
                        </div>
                        <Typography variant="small" className='text-foreground'>
                            Creating unforgettable travel experiences since 2010. Your adventure starts here.
                        </Typography>
                        <div className='flex items-center gap-3 pt-2'>
                            {SOCIAL_LINKS_ICONS.map((link) => (
                                <Link 
                                    key={link.name}
                                    href={link.url} 
                                    target="_blank"
                                    className='w-9 h-9 rounded-md bg-secondary hover:bg-primary/30 transition-colors flex items-center justify-center'
                                >
                                    <Icon name={link.icon} className='w-4 h-4 text-secondary-foreground' fill='#1E3A8A' />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <Typography variant="large" className=' font-semibold'>
                            Quick Links
                        </Typography>
                        <ul className='space-y-2'>
                            {QUICK_LINKS.map((link) => (
                                <li key={link.title}>
                                    <Link href={link.href} className='text-foreground hover:text-primary transition-colors'>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='space-y-4'>
                        <Typography variant="large" className='font-semibold'>
                            Tour Categories
                        </Typography>
                        <ul className='space-y-2'>
                            {TOP_CATEGORIES.map((link) => (
                                <li key={link.title}>
                                    <Link href={link.href} className='text-foreground hover:text-primary transition-colors'>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='space-y-4'>
                        <Typography variant="large" className='font-semibold'>
                            Contact Info
                        </Typography>
                        <ul className='space-y-3'>
                            <li className='flex items-center gap-3'>
                                <Icon name='Phone' className='w-4 h-4 text-primary' />
                                <a href="tel:+918000057070" className='text-foreground hover:text-primary transition-colors'>
                                    +91 8000057070
                                </a>
                            </li>
                            <li className='flex items-center gap-3'>
                                <Icon name='Mail' className='w-4 h-4 text-primary' />
                                <a href="mailto:eklavyatourism@gmail.com" className='text-foreground hover:text-primary transition-colors'>
                                    eklavyatourism@gmail.com
                                </a>
                            </li>
                            <li className='flex items-start gap-3'>
                                 <Icon name='MapPin' className='w-4 h-4 text-primary' />
                                <Typography variant="small" className='text-foreground'>
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

            <div className='w-full px-20'>
                <Separator className='bg-border'  />
            </div>

            <div className='px-20 py-6'>
                <div className='flex flex-col md:flex-row items-center justify-center gap-2 text-center'>
                    <Typography variant="small" className='text-gray-500'>
                        © 2026 Eklavya Tourism. All rights reserved.
                    </Typography>
                </div>
            </div>
        </footer>
    )
}

export default Footer
