import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DatePicker } from './custom/date-picker';
import { Textarea } from './ui/textarea';
import dayjs from 'dayjs';
import CategorySelect from './custom/CategorySelect';
import { toast } from 'react-toastify';
import { useAddArtist } from '@/lib/hooks/useAddArtist';
import { useUpdateArtist } from '@/lib/hooks/useUpdateArtist';
import { Loader } from 'lucide-react';

const EditWindowArtist = ({ children, data, method }: { children: any, data?: any, method?: 'put' | 'post' }) => {
    const pathname = usePathname();
    const { updateArtist, loading } = useUpdateArtist();
    const { addArtist, loading: addLoading } = useAddArtist()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState<any>(data?.genre);
    const [formData, setFormData] = useState({
        artistId: data?.artistId || '',
        pid: data?.pid || '',
        lastName: data?.lastName || '',
        firstName: data?.firstName || '',
        gender: data?.gender || '',
        dateOfBirth: data?.dateOfBirth ? dayjs(data.dateOfBirth).format('YYYY-MM-DD') : '',
        dateOfDeath: data?.dateOfDeath ? dayjs(data.dateOdateOfDeathfBirth).format('YYYY-MM-DD') : '',
        phone: data?.phone || '',
        email: data?.email || '',
        nationality: data?.nationality || '',
        registeredDate: data?.registeredDate ? dayjs(data.registeredDate).format('YYYY-MM-DD') : '',
        registeredUserName: data?.registeredUserName || '',
        genre: data?.genre || '',
        bio: data?.bio || ''
    });
    console.log(formData, 'lfa')

    useEffect(() => {
        setFormData({
            artistId: data?.artistId || '',
            pid: data?.pid || '',
            lastName: data?.lastName || '',
            firstName: data?.firstName || '',
            gender: data?.gender || '',
            dateOfBirth: data?.dateOfBirth ? dayjs(data.dateOfBirth).format('YYYY-MM-DD') : '',
            dateOfDeath: data?.dateOfDeath ? dayjs(data.dateOdateOfDeathfBirth).format('YYYY-MM-DD') : '',
            phone: data?.phone || '',
            email: data?.email || '',
            nationality: data?.nationality || '',
            registeredDate: data?.registeredDate ? dayjs(data.registeredDate).format('YYYY-MM-DD') : '',
            registeredUserName: data?.registeredUserName || '',
            genre: data?.genre || '',
            bio: data?.bio || ''
        });
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleCalendarChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const handleGenreChange = (value) => {
        setSelectedGenre(value);
        setFormData(prevState => ({
            ...prevState,
            genre: value,
        }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if(method === 'put'){
            updateArtist(data._id, {
                artistId: formData?.artistId,
                pid: formData?.pid,
                lastName: formData?.lastName,
                firstName: formData?.firstName,
                gender: formData?.gender,
                dateOfBirth: formData?.dateOfBirth,
                dateOfDeath: formData?.dateOfDeath,
                phone: formData?.phone,
                email: formData?.email,
                nationality: formData?.nationality,
                registeredDate: formData?.registeredDate,
                registeredUserName: formData?.registeredUserName,
                genre: formData?.genre,
                bio: formData?.bio
                }).then(() => {
                    toast.success('Амжилттай шинэчлэгдлээ!');
                    setIsDialogOpen(!isDialogOpen)
            });
        } else
        addArtist({
            artistId: formData?.artistId,
            pid: formData?.pid,
            lastName: formData?.lastName,
            firstName: formData?.firstName,
            gender: formData?.gender,
            dateOfBirth: formData?.dateOfBirth,
            dateOfDeath: formData?.dateOfDeath,
            phone: formData?.phone,
            email: formData?.email,
            nationality: formData?.nationality,
            registeredDate: formData?.registeredDate,
            registeredUserName: formData?.registeredUserName,
            genre: formData?.genre,
            bio: formData?.bio
            }).then(() => {
                toast.success('Амжилттай нэмэгдлээ!');
                setIsDialogOpen(!isDialogOpen)
        })
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className='p-[100px]'>
                <form onSubmit={onSubmit} className='flex w-full relative text-xs'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Зохиогч № </Label>
                                <Input name="artistId" value={formData && formData.artistId} type='text' className='border border-[#665F5FE0] w-[100px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Зохиогч хувийн дугаар </Label>
                                <Input name="pid" value={formData.pid} type='text' className='border border-[#665F5FE0] w-[100px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Овог </Label>
                                <Input name="lastName" value={formData.lastName} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Нэр</Label>
                                <Input name="firstName" value={formData.firstName} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Хүйс</Label>
                                <Input name="gender" value={formData.gender} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center mt-14'>
                                <Label className='w-40 text-lg font-[200]'>Төрсөн огноо </Label>
                                <DatePicker value={formData.dateOfBirth} name={'dateOfBirth'} onChange={handleCalendarChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Нас барсан огноо </Label>
                                <DatePicker value={formData.dateOfDeath} name={'dateOfDeath'} onChange={handleCalendarChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Утасны дугаар</Label>
                                <Input name="phone" value={formData.phone} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Цахим шуудан</Label>
                                <Input name="email" value={formData.email} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Иргэншил</Label>
                                <Input name="nationality" value={formData.nationality} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-32 text-lg font-[200]'>Ангилал</Label>
                                <Select defaultValue={selectedGenre && selectedGenre} onValueChange={(value) => handleGenreChange(value)}>
                                    <SelectTrigger className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-center flex justify-center items-center text-sm h-5'>
                                        <SelectValue placeholder={'-'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <CategorySelect />
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 flex-none justify-start items-start'>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Товч намтар</Label>
                                <Textarea name="bio" value={formData.bio} className='border border-[#665F5FE0] w-[420px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                        </div>
                        <div className='absolute bottom-4 right-[30px]'>
                            <div className='flex items-center justify-between'>
                                <Label className='w-40 text-lg font-[200] whitespace-nowrap'>Бүртгэсэн ажилтан</Label>
                                <Input name="registeredUserName" value={formData.registeredUserName} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-52 text-lg font-[200]'>Бүтээсэн огноо</Label>
                                <DatePicker value={formData.registeredDate} name={'registeredDate'} onChange={handleCalendarChange} />
                            </div>
                            <div className='flex gap-[22px] mt-[30px] justify-end'>
                                <Button disabled={loading || addLoading} type='submit' className='w-[140px] bg-[#0C21C1] rounded-3xl'>{(loading || addLoading) && <Loader className='w-4 h-4 animate-spin' /> || 'Хадгалах'}</Button>
                                <DialogClose>
                                    <Button type='button' className='w-[140px] bg-[#0C21C1] rounded-3xl'>Буцах</Button>
                                </DialogClose>
                            </div>
                        </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditWindowArtist
