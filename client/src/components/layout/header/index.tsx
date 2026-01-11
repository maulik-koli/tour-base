"use client"
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import Icon from '@/components/icons'
import FallbackImage from '@/components/fallback-image'
import { Button } from '@ui/button'

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
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [path])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen])

    const isSolid = !isHome || scrolled

    return (
        <>
            <header 
                className={cn(
                    'sticky top-0 z-50 h-16 px-4 md:px-20 flex items-center justify-center transition-all duration-300',
                    isSolid
                        ? "bg-card/80 backdrop-blur border-b border-border text-foreground"
                        : "bg-transparent border-transparent text-primary-foreground"
                )}
            >
                <div className='w-full flex justify-between md:justify-between items-center'>
                    <Button
                        type='button'
                        variant='ghost'
                        className={cn(
                            'md:hidden p-2 rounded-md  hover:bg-secondary/50 transition-colors',
                            !mobileMenuOpen && 'text-muted-foreground'
                        )}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <Icon name={mobileMenuOpen ? 'X' : 'Menu'} className='w-6 h-6' />
                    </Button>

                    <div
                        className='flex items-center justify-center cursor-pointer absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0'
                        onClick={() => router.replace('/')}
                    >
                        <div className={cn(
                            'relative flex items-center justify-center rounded-sm',
                            'w-20 h-10 md:w-30 md:h-15',
                            isSolid ? "opacity-80" : "opacity-100"
                        )}>
                            <FallbackImage
                                src="/logo.png"
                                alt="Eklavya Tourism Logo"
                                className='object-cover overflow-hidden rounded-sm'
                                loading="eager"
                            />
                        </div>
                    </div>

                    <nav className='hidden md:block'>
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

                    <div className='md:hidden w-10' />
                </div>
            </header>

            <div 
                className={cn(
                    'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden',
                    mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
                onClick={() => setMobileMenuOpen(false)}
            />

            <div 
                className={cn(
                    'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border shadow-lg transition-transform duration-300 ease-in-out md:hidden',
                    mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <nav className='p-4'>
                    <ul className='flex flex-col gap-2 list-none'>
                        {HEADER_DATA.map((item) => {
                            const isActive = path === item.href
                            
                            return (
                                <li key={item.href}>
                                    <Link 
                                        href={item.href}
                                        className={cn(
                                            "block py-3 px-4 rounded-md transition-colors text-foreground hover:text-primary hover:bg-secondary/50",
                                            isActive && "text-primary bg-secondary/50"
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Header
