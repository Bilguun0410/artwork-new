import Link from 'next/link'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Eye, EyeOff, Loader, LockKeyhole, User } from 'lucide-react'
import { Button } from './ui/button'
import { toast } from 'react-toastify'
import useRegister from '@/lib/hooks/useRegister'

const Register = ({setRender}) => {
    const { username, setUsername, password, setPassword, register, loading } = useRegister();
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
        
        <div className='col-span-1 h-full py-[77px] pl-[169px] pr-[75px]'>
        <div className='rounded-[40px] bg-white shadow-[0_15px_40px_0px_rgba(0,0,0,0.15)] flex flex-col gap-32 w-full h-full p-[52px] pb-[150px]'>
            <h2 className='text-[30px] leading-[45px] font-[500]'>Бүртгүүлэх</h2>
            <div className='flex flex-col w-full gap-12'>
                <div className="grid w-full mx-auto items-center gap-1.5">
                    <label htmlFor="email">Нэвтрэх нэр</label>
                    <label htmlFor={'email'} className="group w-full border-b-2 border-input flex">
                        <span className="h-4 w-4 m-auto"><User className="w-full h-full fill-transparent stroke-1"/></span>
                        <Input type="email" value={username} onChange={(event) => setUsername(event.currentTarget.value)} id="email" placeholder="Ажилтаны нэвтрэх нэрээ оруулна уу." className='w-full' />
                    </label>
                </div>
                <div className="grid w-full mx-auto items-center gap-1.5">
                    <label htmlFor="password">Нууц үг</label>
                    <label htmlFor={'password'} className="group w-full border-b-2 border-input flex">
                        <span className="h-4 w-4 m-auto"><LockKeyhole className="w-full h-full fill-transparent stroke-1"/></span>
                        <Input type={type} id="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} autoComplete='current-password' placeholder="Өөрийн нууц үгээ оруулна уу." className='w-full' />
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
                    <Button onClick={()=>register().then(() => toast.success('Амжилттай бүртгүүллээ!'))} type='button' className='bg-[#0C21C1] rounded-[32px] hover:bg-[#0C21C1]/75 py-8'>
                        {loading && <Loader className='2-5 h-5 animate-spin' /> || 'Бүртгүүлэх'}
                    </Button>
                    <div className='text-xs w-full flex items-center justify-center'>
                        <button type='button' onClick={()=> setRender('login')} className='underline text-center'>Нэвтрэх</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Register
