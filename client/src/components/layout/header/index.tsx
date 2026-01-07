"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Typography } from '@/components/ui/typography'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import FallbackImage from '@/components/fallback-image'

const HEADER_DATA = [
    { title: 'Home', href: '/' },
    { title: 'Tours', href: '/tours' },
    { title: 'Your Booking', href: '/your-booking' },
    { title: 'Contact', href: '/contact-us' },
]


const Header: React.FC = () => {
    const router = useRouter();
    const path = usePathname();
    const isHome = path === '/';

    const [scrolled, setScrolled] = useState<boolean>(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const isSolid = !isHome || scrolled

    return (
        <header 
            className={cn(
                'sticky top-0 z-50 h-16 px-20 flex items-center justify-center transition-all duration-300',
                isSolid
                    ? "bg-card/80 backdrop-blur border-b border-border text-foreground"
                    : "bg-transparent border-transparent text-primary-foreground"
            )}
        >
            <div className='w-full flex justify-between items-center'>
                <div
                    className='flex items-center justify-center cursor-pointer'
                    onClick={() => router.replace('/')}
                >
                    <div className={cn(
                        'relative w-30 h-15 flex items-center justify-center rounded-sm',
                        isSolid ? "opacity-80" : "opacity-100"
                    )}>
                        <FallbackImage
                            src="/logo.png"
                            alt="Eklavya Tourism Logo"
                            className='object-cover overflow-hidden rounded-sm'
                        />
                    </div>
                </div>
                <nav>
                    <ul className='flex gap-10 list-none items-center'>
                        {HEADER_DATA.map((item) => {
                            const isActive = path === item.href
                            
                            return (
                                <li key={item.href}>
                                    <Link 
                                        href={item.href}
                                        className={cn(
                                            "transition-colors text-foreground hover:text-primary",
                                            isActive && "text-primary"
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
