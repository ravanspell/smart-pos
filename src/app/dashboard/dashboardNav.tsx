'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/atoms/ToolTip';

export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
}

interface DashboardNavProps {
    items: NavItem[];
    setOpen?: Dispatch<SetStateAction<boolean>>;
    isMobileNav?: boolean;
    isMinimized: boolean;
}

export function DashboardNav({
    items,
    setOpen,
    isMobileNav = false,
    isMinimized,
}: DashboardNavProps) {
    const path = usePathname();

    if (!items?.length) {
        return null;
    }

    console.log('isActive', isMobileNav, isMinimized);

    return (
        <nav className="grid items-start gap-2">
            <TooltipProvider>
                {items.map((item, index) => {
                    const Icon = Icons[item.icon || 'arrowRight'];
                    return (
                        item.href && (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.disabled ? '/' : item.href}
                                        className={cn(
                                            'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                            path === item.href ? 'bg-accent' : 'transparent',
                                            item.disabled && 'cursor-not-allowed opacity-80'
                                        )}
                                        onClick={() => {
                                            if (setOpen) setOpen(false);
                                        }}
                                    >
                                        <Icon className={`ml-3 size-5 flex-none`} />

                                        {isMobileNav || (!isMinimized && !isMobileNav) ? (
                                            <span className="mr-2 truncate">{item.title}</span>
                                        ) : (
                                            ''
                                        )}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                    align="center"
                                    side="right"
                                    sideOffset={8}
                                    className={!isMinimized ? 'hidden' : 'inline-block'}
                                >
                                    {item.title}
                                </TooltipContent>
                            </Tooltip>
                        )
                    );
                })}
            </TooltipProvider>
        </nav>
    );
}