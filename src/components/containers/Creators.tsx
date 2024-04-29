import React from 'react'
import TabsGroup from '../TabsGroup'
import dayjs from 'dayjs'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Trash2 } from 'lucide-react'
import EditWindow from '../EditWindow'

const CreatorsPage = ({data}) => {
    return (
        <div>
            <TabsGroup />
            <div className='rounded-[10px] border border-[#272F8980] overflow-hidden'>
                <Table>
                    <TableCaption>Бүтээлийн жагсаалт.</TableCaption>
                    <TableHeader className='rounded-[10px] border-b border-[#272F8980]'>
                        <TableRow>
                            <TableHead className="w-[100px]">Зохиогч №</TableHead>
                            <TableHead>Ангилал</TableHead>
                            <TableHead className="text-right">Бүртгэсэн огноо</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data && data.map(item => (
                                <TableRow className='rounded-[10px] border-b border-[#272F8980]'>
                                    <TableCell className="font-medium">{item._id}</TableCell>
                                    <TableCell>{'category'}</TableCell>
                                    <TableCell className="text-right">{''}</TableCell>
                                    <TableCell className="text-right"><EditWindow data={item}><button type="button">Дэлгэрэнгүй</button></EditWindow></TableCell>
                                    <TableCell className="text-right"><button type="button"><Trash2 className='fill-[#EB5757] stroke-[#EB5757]' /></button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CreatorsPage