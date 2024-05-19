import React from 'react'
import TabsGroup from '../TabsGroup'
import { Table, TableBody, TableCell, TableHead } from '../ui/table'

const ReportsPage = () => {
    return (
        <div>
            <TabsGroup />
            <div>
                <Table>
                    <TableHead className='grid grid-cols-12'>
                        <TableCell className='col-span-1'>№</TableCell>
                        <TableCell className='col-span-2'>Он сар</TableCell>
                        <TableCell className='col-span-5'>Ангилал</TableCell>
                        <TableCell className='col-span-2'>Бүтээлийн тоо</TableCell>
                        <TableCell className='col-span-2'>Зохиогчийн тоо</TableCell>
                    </TableHead>
                    <TableBody className='grid grid-cols-12'>
                        <TableCell className='col-span-1'>1</TableCell>
                        <TableCell className='col-span-2'>2024-05-05</TableCell>
                        <TableCell className='col-span-5'>-</TableCell>
                        <TableCell className='col-span-2'>-</TableCell>
                        <TableCell className='col-span-2'>-</TableCell>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ReportsPage