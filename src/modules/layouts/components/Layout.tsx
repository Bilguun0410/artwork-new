import React from 'react'
import { motion } from 'framer-motion'
import { ProfileCurtain } from '@/src/components/ProfileCurtain'
import { Loader, LogOut, Menu, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Navbar from '@/src/components/Navbar'
import { Button } from '@/src/components/ui/button'
import { cn } from '@/src/utils/utils'
import AppProvider from '../../AppContext'
import useLogout from '@/lib/hooks/useLogout'
import { toast } from 'react-toastify'

const Layout = ({children} : any) => {
    const router = useRouter();
    const { logout, loading } = useLogout() 
    const handleLogout = () => {
        logout().then(()=>{
            toast.success('Амжилттай гарлаа!');
            router.replace('/auth')
        })
    }
    return (
        <AppProvider>
            <motion.div initial={{scale: 1.1}} animate={{scale: 1}} className='w-screen h-screen grid grid-flow-row auto-rows-max'>
                <motion.div initial={{opacity:0, y: -200}} exit={{opacity: 0}} animate={{opacity: 1, y: 0, animationName: 'accordion-down'}} className="w-full bg-[#0C21C10D] h-[76px] rounded-br-2xl rounded-bl-2xl shadow-sm shadow-black/10 flex items-center justify-between px-5">
                    <div className="w-[30px] h-[30px]"><Menu /></div>
                    <div className="w-[30px] h-[30px]"><ProfileCurtain><User /></ProfileCurtain></div>
                </motion.div>
                <div className="grid grid-cols-12">
                    <div className="col-span-3 2xl:col-span-2 flex justify-between h-[calc(100%-76px)] flex-col bg-[#0C21C10D] shadow-sm px-6 py-4">
                        <Navbar />
                        <motion.div initial={{opacity:0, y: 100}} exit={{opacity: 0}} animate={{opacity: 1, y: 0}} className="grid w-full mx-auto items-center gap-1.5" >
                            <Button disabled={loading} asChild type='button' onClick={handleLogout} className={cn('bg-[#0C21C1]/10 rounded-[32px] cursor-pointer hover:bg-black hover:bg-opacity-50 hover:text-white py-8 shadow-sm text-[#333333] flex items-center gap-3 min-w-[120px] text-center')}><span>{'Гарах'}{loading && <Loader className='w-5 h-5 animate-spin' /> || <LogOut />}</span></Button>
                        </motion.div>
                    </div>
                    <div className="col-span-9 2xl:col-span-10">
                        <main className="h-screen overflow-y-scroll overscroll-contain box-border flex-col items-center justify-between p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </motion.div>
        </AppProvider>
    )
}

export default Layout