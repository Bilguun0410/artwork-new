import React, { useEffect, useState } from 'react'
import { SelectGroup, SelectItem } from '../ui/select'
import axios from 'axios';
import { Loader } from 'lucide-react';
import useGenres from '@/lib/hooks/useGenres';

const CategorySelect = () => {
    const { data, loading, error } = useGenres();
    console.log(data, 'kjh');
    return (
        <SelectGroup>
            {
                loading && (
                    <Loader className='w-4 h-4 animate-spin mx-auto my-4' />
                )
                ||
                data && data.map(genre => (
                    <SelectItem key={genre._id} value={genre.name}>
                        {genre.name}
                    </SelectItem>
                ))
            }
        </SelectGroup>
    )
}

export default CategorySelect
