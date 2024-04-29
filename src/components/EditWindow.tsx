import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog'
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DatePicker } from './custom/date-picker';
import { Textarea } from './ui/textarea';
import dayjs from 'dayjs';

const EditWindow = ({children, data} : {children : any, data?: any}) => {
    const pathname = usePathname();
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className='p-[100px]'>
            <div className='flex w-full relative'>
                <div className='flex flex-col gap-1 flex-1'>
                    <div className='flex items-center'>
                        <Label className='w-40 text-lg font-[200]'>Бүтээлийн № </Label>
                        <Input value={data && data._id} type='text' className='border border-[#665F5FE0] w-[100px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-40 text-lg font-[200]'>Бүтээлийн БМС №</Label>
                        <Input type='text' className='border border-[#665F5FE0] w-[100px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-40 text-lg font-[200]'>Зохиогч № </Label>
                        <Input type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-40 text-lg font-[200]'>Бүтээсэн огноо</Label>
                        <DatePicker value={data && dayjs(data.date).format('YYYY-MM-DD')} />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-40 text-lg font-[200]'>Өмчлөгч</Label>
                        <Input value={data && data.copyright} type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-40 text-lg font-[200]'>Эзэмшигч</Label>
                        <Input type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-40 text-lg font-[200]'>Зураг</Label>
                        <Input type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-40 text-lg font-[200]'>Товч тайлбар</Label>
                        <Textarea value={data && data.description} className='border border-[#665F5FE0] w-[420px] rounded-[10px] text-[20px] h-5' />
                    </div>
                </div>
                <div className='flex flex-col gap-1 flex-none justify-start items-start'>
                    <div className='flex items-center'>
                        <Label className='w-32 text-lg font-[200]'>Ангилал</Label>
                        <Select>
                            <SelectTrigger className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5'>
                                <SelectValue>Category</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='category'>
                                        Category
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-32 text-lg font-[200]'>Хэмжээ</Label>
                        <Input type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-32 text-lg font-[200]'>Хуудасны тоо</Label>
                        <Input type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-32 text-lg font-[200]'>Нийтлэгч</Label>
                        <Input type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-32 text-lg font-[200]'>Жин</Label>
                        <Input type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-32 text-lg font-[200]'>ISBN</Label>
                        <Input type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5' />
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-32 text-lg font-[200]'>Судалгаа</Label>
                        <Input type='text' className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5' />
                    </div>
                </div>
                <div className='absolute bottom-4 right-[30px]'>
                    <div className='flex items-center'>
                        <Label className='w-52 text-lg font-[200]'>Бүртгэсэн ажилтан</Label>
                        <Select>
                            <SelectTrigger className='border border-[#665F5FE0] w-[150px] rounded-[10px] text-[20px] h-5'>
                                <SelectValue>Category</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='category'>
                                        Category
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex items-center'>
                        <Label className='w-52 text-lg font-[200]'>Бүтээсэн огноо</Label>
                        <DatePicker />
                    </div>
                    <div className='flex gap-[22px] mt-[30px] justify-end'>
                        <Button type='button' className='w-[140px] bg-[#0C21C1] rounded-3xl'>Хадгалах</Button>
                        <DialogClose>
                            <Button type='button' className='w-[140px] bg-[#0C21C1] rounded-3xl'>Буцах</Button>
                        </DialogClose>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default EditWindow
