import React from 'react'
import TabsGroup from '../TabsGroup'
import dayjs from 'dayjs'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Loader, Trash2 } from 'lucide-react'
import EditWindowArtist from '../EditWindowArtist'
import { useAppContext } from '@/src/modules/AppContext'
import { useDeleteArtist } from '@/lib/hooks/useDeleteArtist'
import { useRouter } from 'next/router'

const CreatorsPage = ({data}) => {
    const router = useRouter();
    const { genre } = useAppContext()
    const { deleteArtist, loading } = useDeleteArtist();
    return (
        <div>
            <TabsGroup />
            <div className='rounded-[10px] border border-[#272F8980] shadow-md overflow-hidden w-full block'>
                <Table className='w-full block'>
                    <TableHeader className=' w-full block border-[#272F8980] bg-[#F3F4FCA3]'>
                        <TableRow className='w-full grid grid-cols-12 items-center px-4'>
                            <TableHead className="text-left col-span-2">Зохиогч №</TableHead>
                            <TableHead className=' col-span-1'>Ангилал</TableHead>
                            <TableHead className="text-left col-span-3">Бүртгэсэн огноо</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full block'>
                        {
                            data && (
                                genre ? data.filter(item => genre && (item.genre === genre)).map((item, idx) => (
                                    <TableRow key={idx} className='w-full grid grid-cols-12 items-center px-4'>
                                        <TableCell className="font-medium text-center col-span-2">{item.artistId}</TableCell>
                                        <TableCell className='text-center col-span-1'>{item.genre}</TableCell>
                                        <TableCell className="text-center col-span-3">{dayjs(item.registeredDate).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell className="text-center col-span-5"><EditWindowArtist method='put' data={item}><button type="button">Дэлгэрэнгүй</button></EditWindowArtist></TableCell>
                                        <TableCell className="text-right col-span-1"><button type="button"><Trash2 className='fill-[#EB5757] stroke-[#EB5757]' /></button></TableCell>
                                    </TableRow>
                                )) :
                                data.map((item, idx) => (
                                    <TableRow key={idx} className='w-full grid grid-cols-12 items-center px-4'>
                                        <TableCell className="font-medium text-center col-span-2">{item.artistId}</TableCell>
                                        <TableCell className='text-center col-span-1'>{item.genre}</TableCell>
                                        <TableCell className="text-center col-span-3">{dayjs(item.registeredDate).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell className="text-center col-span-5"><EditWindowArtist method='put' data={item}><button type="button">Дэлгэрэнгүй</button></EditWindowArtist></TableCell>
                                        <TableCell className="text-right col-span-1">
                                            <button disabled={loading} onClick={()=>deleteArtist(item && item._id).then(()=> router.reload())} type="button">
                                                {
                                                    loading &&
                                                        <Loader className='w-4 h-4 animate-spin stroke-[#EB5757]' />
                                                    ||
                                                        <Trash2 className='fill-[#EB5757] stroke-[#EB5757]' />
                                                }
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CreatorsPage