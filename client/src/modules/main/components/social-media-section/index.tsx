"use client"
import React from 'react'
import Link from 'next/link'

import Icon, { IconName } from '@/components/icons'
import { Typography } from '@/components/ui/typography'
import FallbackImage from '@/components/fallback-image'
import { SOCIAL_LINKS } from '@/constants/static-data'

const SOCIAL_PLATFORMS: {
    name: string
    icon: IconName
    handle: string
    followers: string
    description: string
    url: string
    gradient: string
}[] = [
    {
        name: 'Instagram',
        icon: 'instagram',
        handle: '@eklavyatourism',
        followers: '25K+',
        description: 'Follow our visual journey through breathtaking destinations',
        url: SOCIAL_LINKS.instagram,
        gradient: 'from-purple-500 via-pink-500 to-orange-400',
    },
    {
        name: 'Facebook',
        icon: 'facebook',
        handle: 'Eklavya Tourism',
        followers: '50K+',
        description: 'Join our travel community for exclusive deals & updates',
        url: SOCIAL_LINKS.facebook,
        gradient: 'from-blue-600 to-blue-400',
    },
    {
        name: 'YouTube',
        icon: 'youtube',
        handle: 'Eklavya Tourism',
        followers: '10K+',
        description: 'Watch travel vlogs, destination guides & trip highlights',
        url: SOCIAL_LINKS.youtube,
        gradient: 'from-red-600 to-red-400',
    },
]

const SOCIAL_ICONS: { icon: IconName, url: string }[] = [
    { icon: 'instagram', url: SOCIAL_LINKS.instagram },
    { icon: 'facebook', url: SOCIAL_LINKS.facebook },
    { icon: 'youtube', url: SOCIAL_LINKS.youtube },
]

const INSTAGRAM_POSTS = [
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
]

const SocialMediaSection: React.FC = () => {
    return (
        <section className='py-8 px-4 md:py-12 md:px-12 lg:py-20 lg:px-20 bg-background'>
            <div className='text-center max-w-2xl mx-auto mb-8 md:mb-12'>
                <Typography variant="h2">
                    Connect With Us
                </Typography>
                <Typography variant="lead" className='mt-3 md:mt-4 text-muted-foreground'>
                    Follow our adventures, get travel inspiration, and stay updated with exclusive offers on our social channels
                </Typography>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16'>
                {SOCIAL_PLATFORMS.map((platform) => (
                    <Link
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='group'
                    >
                        <div className='relative overflow-hidden rounded-2xl border border-border bg-card p-4 md:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>

                            <div className={`absolute inset-0 bg-linear-to-br ${platform.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                            
                            <div className='relative z-10'>
                                <div className='flex items-center gap-3 md:gap-4 mb-3 md:mb-4'>
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-linear-to-br ${platform.gradient} flex items-center justify-center shadow-lg`}>
                                        <Icon name={platform.icon} className='w-6 h-6 md:w-7 md:h-7 text-white' fill='white' />
                                    </div>
                                    <div>
                                        <Typography variant="large" className='font-bold'>
                                            {platform.name}
                                        </Typography>
                                        <Typography variant="p" className='text-muted-foreground'>
                                            {platform.handle}
                                        </Typography>
                                    </div>
                                </div>

                                <Typography variant="large" className='text-muted-foreground mb-3 md:mb-4 block font-normal'>
                                    {platform.description}
                                </Typography>

                                <div className='flex items-center justify-end'>
                                    <div className='flex items-center gap-1 text-muted-foreground group-hover:text-primary transition-colors'>
                                        <Typography variant="small">Follow</Typography>
                                        <Icon name='ArrowRight' className='w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className='bg-card rounded-2xl border border-border p-4 md:p-6 lg:p-8'>
                <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-4 md:mb-6'>
                    <div className='flex items-center gap-2 md:gap-3'>
                        <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center'>
                            <Icon name='instagram' className='w-4 h-4 md:w-5 md:h-5 text-white' fill='white' />
                        </div>
                        <div>
                            <Typography variant="lead" className='font-bold'>
                                @eklavyatourism
                            </Typography>
                            <Typography variant="p" className='text-muted-foreground'>
                                Latest from our Instagram
                            </Typography>
                        </div>
                    </div>
                    <Link
                        href="https://instagram.com/eklavyatourism"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-xs md:text-sm font-medium hover:opacity-90 transition-opacity'>
                        <span>Follow Us</span>
                        <Icon name='ExternalLink' className='w-3 h-3 md:w-4 md:h-4' />
                    </Link>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
                    {INSTAGRAM_POSTS.map((post, index) => (
                        <Link
                            key={index}
                            href="https://instagram.com/eklavyatourism"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='group relative aspect-square rounded-xl overflow-hidden'
                        >
                            <FallbackImage
                                src={post}
                                alt={`Instagram post ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className='object-cover transition-transform duration-300 group-hover:scale-110'
                            />
                            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center'>
                                <Icon name='instagram' className='w-6 h-6 md:w-8 md:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300' fill='white' />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className='mt-4 md:mt-6 text-center'>
                    <Typography variant="p" className='text-muted-foreground'>
                        Share your travel moments with us using
                    </Typography>
                    <Typography variant="lead" className='text-primary font-bold'>
                        #EklavyaTourism
                    </Typography>
                </div>
            </div>

            <div className='mt-8 md:mt-12 relative overflow-hidden rounded-2xl bg-linear-to-r from-primary to-primary/80 p-6 md:p-8 lg:p-12'>
                <div className='absolute inset-0 opacity-10'>
                    <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-size-[20px_20px]' />
                </div>
                <div className='relative z-10 text-center'>
                    <Typography variant="h2" className='text-white mb-2 md:mb-3'>
                        Never Miss a Travel Update!
                    </Typography>
                    <Typography variant="lead" className='font-normal text-white/80 mb-4 md:mb-6 max-w-xl mx-auto'>
                        Join our social community for exclusive deals, travel tips, destination guides, and behind-the-scenes content from our tours.
                    </Typography>
                    <div className='flex items-center justify-center gap-3 md:gap-4'>
                        {SOCIAL_ICONS.map((icon) => (
                            <Link
                                key={icon.icon}
                                href={icon.url}
                                target="_blank"
                                className='w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center'
                            >
                                <Icon name={icon.icon} className='w-5 h-5 md:w-6 md:h-6 text-white' fill='white' />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SocialMediaSection
