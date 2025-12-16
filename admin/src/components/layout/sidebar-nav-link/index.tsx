"use client"
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";

import Icon from '@/components/icons';
import { Typography } from '@/components/ui/typography';
import { SideBarItem } from '../app-sidebar';
import { cn } from '@/lib/utils';

interface NavLinkProps {
    item: SideBarItem
    className?: string
}

const SidebarNavLink: React.FC<NavLinkProps> = ({item, className }) => {
    const pathName = usePathname();
    const isActive = pathName === item.url;

    return (
        <Link href={item.url} className={cn(
            "flex items-center gap-2 cursor-pointer",
            isActive && "bg-primary/10 text-primary",
            className,
            "hover:bg-primary/5"
        )}>
            <Icon name={item.icon} className="w-4 h-4"  />
            <Typography variant="small" className="font-normal">{item.title}</Typography>
        </Link>
    )
}

export default SidebarNavLink
