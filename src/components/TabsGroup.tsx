'use client'
import React, { Fragment } from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { ChevronDown, Search } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { SelectScrollable } from './custom/SelectScrollable'
import EditWindow from './EditWindow'

type Props = {}

const TabsGroup = (props: Props) => {
    const pathname = usePathname();
    const tabsData : any[] = [
        {
            id:0,
            component: () => {
                return <EditWindow>
                <Button className='rounded-[10px] py-6 px-14 bg-[#0C21C1] hover:bg-[#0c21c1]/75'>+ {pathname.includes('/creators')  ? 'Зохиогч' : 'Бүтээл'} нэмэх</Button></EditWindow>
            }
        },
        {
            id:1,
            component: () => {
                return(
                    <SelectScrollable />
                )
            }
        },
        {
            id:2,
            component: () => {
                return(
                    <Label htmlFor='search' className='p-0 m-0 relative'>
                        <Input placeholder='Хайх үгээ оруулна уу' id='search' className='rounded-3xl font-[200] py-6 px-14 shadow-[inset_0_0px_6px_0_rgba(0,0,0,0.15)] hover:bg-[#0c21c10d]/10 ' />
                        <button className='h-6 w-6 absolute top-3 right-3'>
                            <Search className='stroke-[#000]/50 stroke-1' />
                        </button>
                    </Label>
                )
            }
        },

    ]
    return (
        <div className='grid grid-cols-3 gap-28 mb-14'>
            {
                tabsData.map(tab => <Fragment key={tab.id}>{tab.component()}</Fragment>)
            }
        </div>
    )
}

export default TabsGroup