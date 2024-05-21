import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import useGenres from '@/lib/hooks/useGenres';
import { Loader } from 'lucide-react';

const GenerateFields = ({ selected, genreForm, setGenreForm }) => {
    const { data } = useGenres();
    const [genre, setGenre] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenreById = async () => {
            const { _id } = data && data.find(item => item.name === selected) || '';
            if (!_id) return; // Ensure selected is valid
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:4900/api/genres/${_id}`);
                setGenre(response.data);
            } catch (error) {
                console.error('Error fetching genre:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenreById();
    }, [selected, data]);

    useEffect(() => {
        if ((genre && genre.fields) && !genreForm) {
            const initialGenreForm = genre.fields.reduce((acc, field) => {
                acc[field] = '';
                return acc;
            }, {});
            setGenreForm(initialGenreForm);
        }
    }, [genre, setGenreForm, genreForm]);

    const handleGenreFieldChange = (event) => {
        const { name, value } = event.currentTarget;
        setGenreForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (loading) return <div className='w-full my-10 flex items-center justify-center'><Loader className='w-6 h-6 animate-spin' /></div>;
    if (error) return <div>Алдаа гарлаа</div>;
    if (!genre || !genre.fields) return <div>Ангилал сонгоно уу</div>;
    console.log(genreForm, 'gnr')

    return (
        <div>
            {genre.fields.map((field, idx) => (
                <div key={idx} className="flex items-center">
                    <Label className="w-32 text-lg font-[200]">{field}</Label>
                    <Input
                        name={field}
                        value={genreForm?.[field] || ''}
                        onChange={handleGenreFieldChange}
                        type="text"
                        className="border border-[#665F5FE0] w-[150px] rounded-[10px] text-sm h-5"
                    />
                </div>
            ))}
        </div>
    );
};

export default GenerateFields;
