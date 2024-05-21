import React from 'react'
import TabsGroup from '../TabsGroup'
import dayjs from 'dayjs'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Loader, Trash2 } from 'lucide-react'
import EditWindow from '../EditWindow'
import { useDeleteArtwork } from '@/lib/hooks/useDeleteArtwork'
import { useRouter } from 'next/router'
import { useAppContext } from '@/src/modules/AppContext'

const ArtworksPage = ({data}) => {
    const { genre } = useAppContext()
    const router = useRouter();
    const { deleteArtwork, loading } = useDeleteArtwork();
    return (
        <div>
            <TabsGroup />
            <div className='rounded-[10px] border border-[#272F8980] shadow-md overflow-hidden'>
                <Table className='w-full block'>
                    <TableHeader className=' w-full block border-[#272F8980] bg-[#F3F4FCA3]'>
                        <TableRow className='w-full grid grid-cols-12 items-center px-4'>
                            <TableHead className="col-span-2">Бүтээл №</TableHead>
                            <TableHead className='col-span-2'>Зохиогч №</TableHead>
                            <TableHead className='col-span-2'>Ангилал</TableHead>
                            <TableHead className="text-left col-span-4 whitespace-nowrap">Бүртгэсэн огноо</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full block'>
                        {
                            data && 
                                (genre ?
                                    data.filter(item => (item.genre === genre)).map((item, idx) => (
                                        <TableRow key={idx} className='w-full grid grid-cols-12 items-center px-4'>
                                            <TableCell className="font-medium text-center col-span-2">{item.artId}</TableCell>
                                            <TableCell className='col-span-2 text-center'>{item.artistId}</TableCell>
                                            <TableCell className='col-span-2 text-center'>{item.genre && item.genre}</TableCell>
                                            <TableCell className="text-center col-span-4 whitespace-nowrap">{dayjs(item.registeredDate).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell className="text-right"><EditWindow method='put' data={item}><button type="button">Дэлгэрэнгүй</button></EditWindow></TableCell>
                                            <TableCell className="text-right">
                                                <button disabled={loading} onClick={()=>deleteArtwork(item && item._id).then(()=> router.reload())} type="button">
                                                    {
                                                        loading &&
                                                            <Loader className='w-4 h-4 animate-spin stroke-[#EB5757]' />
                                                        ||
                                                            <Trash2 className='fill-[#EB5757] stroke-[#EB5757]' />
                                                    }
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                ) : data.map((item, idx) => (
                                    <TableRow key={idx} className='w-full grid grid-cols-12 items-center px-4'>
                                        <TableCell className="font-medium text-center col-span-2">{item.artId}</TableCell>
                                        <TableCell className='col-span-2 text-center'>{item.artistId}</TableCell>
                                        <TableCell className='col-span-2 text-center'>{item.genre && item.genre}</TableCell>
                                        <TableCell className="text-center col-span-4 whitespace-nowrap">{dayjs(item.registeredDate).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell className="text-right"><EditWindow method='put' data={item}><button type="button">Дэлгэрэнгүй</button></EditWindow></TableCell>
                                        <TableCell className="text-right">
                                            <button disabled={loading} onClick={()=>deleteArtwork(item && item._id).then(()=> router.reload())} type="button">
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

export default ArtworksPage