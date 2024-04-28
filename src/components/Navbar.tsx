'use client'

import { motion } from 'framer-motion'
import data from '@/src/utils/data'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/src/utils/utils'

type Props = {}

const Navbar = (props: Props) => {
    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-6">
            {
                data.menu.map(item => (
                    <motion.div initial={{opacity:0, x: -item.order * 112}} exit={{opacity: 0}} animate={{opacity: 1, x: 0}} className="grid w-full mx-auto items-center gap-1.5" key={item.order}>
                        <Button asChild type='button' disabled={pathname === item.path} className={cn(pathname === item.path ? 'bg-[#0C21C1]' : 'bg-white text-black', 'rounded-[32px] hover:bg-gradient-to-tl hover:bg-opacity-10 from-emerald-700 to-[#0C21C1]/100 hover:text-white py-8 shadow-sm')}><Link href={item.path}>{item.label}</Link></Button>
                    </motion.div>
                ))
            }
        </div>
    )
}

export default Navbar