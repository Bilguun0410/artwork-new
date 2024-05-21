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
import GenerateFields from './custom/GenerateFields';
import useGenres from '@/lib/hooks/useGenres';
import { useUpdateArtwork } from '@/lib/hooks/useUpdateArtwork';
import { IArtwork } from '@/lib/models/artworks';
import { toast } from 'react-toastify';
import { useAddArtwork } from '@/lib/hooks/useAddArtwork';
import { Loader } from 'lucide-react';

const EditWindow = ({ children, data, method }: { children: any, data?: any, method?: 'put' | 'post' }) => {
    const pathname = usePathname();
    const { data: genres } = useGenres();
    const { updateArtwork, loading } = useUpdateArtwork();
    const { addArtwork, loading: addLoading } = useAddArtwork();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [ genreForm, setGenreForm ] = useState<any | undefined>()
    const [selectedGenre, setSelectedGenre] = useState<any>(data?.genre);
    const [formData, setFormData] = useState({
        artId: data?.artId || '',
        bmsId: data?.bmsId || '',
        artistId: data?.artistId || '',
        dateCreated: data?.dateCreated ? dayjs(data.dateCreated).format('YYYY-MM-DD') : '',
        rightHolder: data?.rightHolder || '',
        owner: data?.owner || '',
        summary: data?.summary || '',
        genre: data?.genre || '',
        registeredDate: data?.registeredDate || '',
        registeredUserId: data?.registeredUserId || '',
        registeredUserName: data?.registeredUserName || '',
        isbn: data?.isbn || '',
        genreFields: data?.genreFields || {}
    });
    console.log(formData, 'lfa')

    useEffect(() => {
        setFormData({
            artId: data?.artId || '',
            bmsId: data?.bmsId || '',
            artistId: data?.artistId || '',
            dateCreated: data?.dateCreated ? dayjs(data.dateCreated).format('YYYY-MM-DD') : '',
            rightHolder: data?.rightHolder || '',
            owner: data?.owner || '',
            summary: data?.summary || '',
            genre: data?.genre || '',
            registeredDate: data?.registeredDate || '',
            registeredUserId: data?.registeredUserId || '',
            registeredUserName: data?.registeredUserName || '',
            isbn: data?.isbn || '',
            genreFields: data?.genreFields || {}
        });
        setGenreForm(data && data?.genreFields)
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
            genreFields: {}
        }));
    };
    console.log(formData, 'fd2')

    const onSubmit = async (event) => {
        event.preventDefault();
        if(method === 'put'){
            updateArtwork(data._id, {
                artId: formData?.artId || '',
                bmsId: formData.bmsId,
                artistId: formData.artistId,
                dateCreated: formData.dateCreated,
                rightHolder: formData.rightHolder,
                owner: formData.owner,
                attachment: {},
                summary: formData.summary,
                genre: formData.genre,
                registeredDate: formData.registeredDate,
                registeredUserId: formData.registeredUserId,
                registeredUserName: formData.registeredUserName,
                isbn: formData.isbn,
                genreFields: genreForm
                }).then(() => {
                    toast.success('Амжилттай шинэчлэгдлээ!');
                    setIsDialogOpen(!isDialogOpen)
            });
        } else
        addArtwork({
            artId: formData?.artId || '',
            bmsId: formData.bmsId,
            artistId: formData.artistId,
            dateCreated: formData.dateCreated,
            rightHolder: formData.rightHolder,
            owner: formData.owner,
            attachment: {},
            summary: formData.summary,
            genre: formData.genre,
            registeredDate: formData.registeredDate,
            registeredUserId: formData.registeredUserId,
            registeredUserName: formData.registeredUserName,
            isbn: formData.isbn,
            genreFields: genreForm
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
                <form onSubmit={onSubmit} className='flex w-full relative'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Бүтээлийн № </Label>
                                <Input name="artId" value={formData && formData.artId} type='text' className='border border-[#665F5FE0] w-[100px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Бүтээлийн БМС №</Label>
                                <Input name="bmsId" value={formData.bmsId} type='text' className='border border-[#665F5FE0] w-[100px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Зохиогч № </Label>
                                <Input name="artistId" value={formData.artistId} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Бүтээсэн огноо</Label>
                                <DatePicker value={formData.dateCreated} name={'dateCreated'} onChange={handleCalendarChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Өмчлөгч</Label>
                                <Input name="rightHolder" value={formData.rightHolder} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Эзэмшигч</Label>
                                <Input name="owner" value={formData.owner} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Зураг</Label>
                                <Input type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5' />
                            </div>
                            <div className='flex items-center'>
                                <Label className='w-40 text-lg font-[200]'>Товч тайлбар</Label>
                                <Textarea name="summary" value={formData.summary} className='border border-[#665F5FE0] w-[420px] rounded-[10px] text-sm h-5' onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 flex-none justify-start items-start'>
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
                            <GenerateFields genreForm={genreForm} setGenreForm={setGenreForm} selected={selectedGenre} />
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

export default EditWindow
