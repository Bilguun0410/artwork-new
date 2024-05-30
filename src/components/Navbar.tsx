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
                        <Button asChild type='button' disabled={pathname === item.path} className={cn(pathname === item.path ? 'bg-[#2b399e]' : 'bg-white opacity-50 hover:opacity-100 text-slate-700', 'rounded-[32px] hover:scale-[1.05] transition-all ease-linear duration-300 shadow-[rgba(0,0,0,0.16)_0px_3px_6px,rgba(0,0,0,0.23)_0px_3px_6px] hover:shadow-[rgba(0,0,0,0.25)_0px_54px_55px,rgba(0,0,0,0.12)_0px_-12px_30px,rgba(0,0,0,0.12)_0px_4px_6px,rgba(0,0,0,0.17)_0px_12px_13px,rgba(0,0,0,0.09)_0px_-3px_5px] hover:bg-gradient-to-tl hover:bg-opacity-100 from-emerald-700 to-[#0C21C1]/100 hover:text-white py-8')}><Link href={item.path}>{item.label}</Link></Button>
                    </motion.div>
                ))
            }
        </div>
    )
}

export default Navbar