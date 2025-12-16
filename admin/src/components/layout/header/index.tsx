"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getBreadCrumbs } from './util'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbSeparator 
} from '@/components/ui/breadcrumb'


const Header: React.FC = () => {
    const pathName = usePathname();
    const breadCrumbs = getBreadCrumbs(pathName);

    return (
        <div className='w-full flex gap-2 items-center bg-background'>
            <SidebarTrigger />

            <Separator orientation="vertical"  className='h-6!' />

            <Breadcrumb>
                <BreadcrumbList>
                    {Array.isArray(breadCrumbs) ? breadCrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem >
                                <BreadcrumbLink asChild>
                                    <Link href={crumb.href}>{crumb.segment}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            {index < breadCrumbs.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    )) : (
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={breadCrumbs.href}>{breadCrumbs.segment}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default Header
