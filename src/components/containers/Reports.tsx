import React from 'react'
import TabsGroup from '../TabsGroup'

const ReportsPage = () => {
    return (
        <div>
            <TabsGroup />
            <div className='w-full'>
                <table className='w-full block rounded-[10px] border border-[#8A8EBB] overflow-hidden'>
                    <thead className='w-full block'>
                        <tr className='grid grid-cols-12 pt-4 px-5 bg-[#F8F8FD] border-b border-[#8A8EBB]'>
                            <th className='col-span-1'>№</th>
                            <th className='col-span-2'>Он сар</th>
                            <th className='col-span-5'>Ангилал</th>
                            <th className='col-span-2'>Бүтээлийн тоо</th>
                            <th className='col-span-2'>Зохиогчийн тоо</th>
                        </tr>
                    </thead>
                    <tbody className='w-full flex flex-col divide-y divide-[#8A8EBB]'>
                        <tr className='grid grid-cols-12 text-center py-4 px-5'>
                            <td className='col-span-1'>1</td>
                            <td className='col-span-2'>2024-05-05</td>
                            <td className='col-span-5'>-</td>
                            <td className='col-span-2'>-</td>
                            <td className='col-span-2'>-</td>
                        </tr>
                        <tr className='grid grid-cols-12 text-center py-4 px-5'>
                            <td className='col-span-1'>1</td>
                            <td className='col-span-2'>2024-05-05</td>
                            <td className='col-span-5'>-</td>
                            <td className='col-span-2'>-</td>
                            <td className='col-span-2'>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportsPage