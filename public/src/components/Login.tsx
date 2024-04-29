'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Eye, EyeOff, LockKeyhole, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { EvervaultCard } from './custom/evervault-card'
import { AuroraBackground } from './custom/aurora-background'

type Props = {
}

const Login = ({}: Props) => {
    const [ type, setType ] = useState('password');
    const toggleEye = () => {
        if(type === 'password'){
            setType('text');
        }
        else {
            setType('password');
        }
    }
    return (
        <div className='grid grid-cols-2 p-5 w-full h-full'>
            <div className='col-span-1 h-full py-[77px] pl-[169px] pr-[75px]'>
                <div className='rounded-[40px] bg-white shadow-[0_15px_40px_0px_rgba(0,0,0,0.15)] flex flex-col gap-32 w-full h-full p-[52px] pb-[150px]'>
                    <h2 className='text-[30px] leading-[45px] font-[500]'>Нэвтрэх</h2>
                    <div className='flex flex-col w-full gap-12'>
                        <div className="grid w-full mx-auto items-center gap-1.5">
                            <label htmlFor="email">Нэвтрэх нэр</label>
                            <label htmlFor={'email'} className="group w-full border-b-2 border-input flex">
                                <span className="h-4 w-4 m-auto"><User className="w-full h-full fill-transparent stroke-1"/></span>
                                <Input type="email" id="email" placeholder="Ажилтаны нэвтрэх нэрээ оруулна уу." className='w-full' />
                            </label>
                        </div>
                        <div className="grid w-full mx-auto items-center gap-1.5">
                            <label htmlFor="password">Нууц үг</label>
                            <label htmlFor={'password'} className="group w-full border-b-2 border-input flex">
                                <span className="h-4 w-4 m-auto"><LockKeyhole className="w-full h-full fill-transparent stroke-1"/></span>
                                <Input type={type} id="password" autoComplete='current-password' placeholder="Өөрийн нууц үгээ оруулна уу." className='w-full' />
                                <span className="h-4 w-4 m-auto cursor-pointer" onClick={toggleEye}>
                                    {
                                        type === 'password' ? <EyeOff className="w-full h-full fill-transparent stroke-1"/>
                                                            : <Eye className="w-full h-full fill-transparent stroke-1"/>
                                    }
                                </span>
                            </label>
                            <div className='text-right w-full font-[300] text-xs text-[#4d4d4d] underline'>
                                <Link legacyBehavior href={"#"}>Админастратортой холбогдох</Link>
                            </div>
                        </div>
                        <div className="grid w-full mx-auto items-center gap-1.5">
                            <Button asChild type='button' className='bg-[#0C21C1] rounded-[32px] hover:bg-[#0C21C1]/75 py-8'><Link href={'/'}>Нэвтрэх</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
            <AuroraBackground className='h-full'>
                <div className='col-span-1 rounded-2xl bg-gradient-to-tr from-[#000842] to-[#000842]/80 h-full flex'>
                    <h1 className='text-white text-[40px] leading-[60px] font-[600] mx-24 mt-auto mb-[154px] h-auto'>Бүтээл бүртгэл, мэдээллийн програм</h1>
                </div>
            </AuroraBackground>
            {/* <EvervaultCard className='bg-gradient-to-tr from-[#000842] to-[#000842]/80 w-full h-full col-span-1 rounded-2xl overflow-hidden flex' text='Бүтээл бүртгэл, мэдээллийн програм'/> */}
        </div>
  )
}

export default Login